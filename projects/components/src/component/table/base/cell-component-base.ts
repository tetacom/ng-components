import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {TableService} from '../service/table.service';
import {TableRow} from '../contract/table-row';
import {takeWhile} from 'rxjs/operators';
import {ICellCoordinates} from '../contract/i-cell-coordinates';
import {TableColumn} from '../contract/table-column';
import {IIdName} from '../../../common/contract/i-id-name';
import {ICellValue} from '../contract/i-cell-value';
import {IDictionary} from '../../../common/contract/i-dictionary';

@Component({
  template: '',
})
export abstract class CellComponentBase<T> implements OnInit, OnDestroy {
  @HostBinding('class.cell-component')
  private readonly tableCellComponent = true;

  get edit() {
    return (this._edit && this.editable);
  }

  get editable() {
    return this.svc.boolOrFuncCallback(this.column.editable)({
      column: this.column,
      row: this.row,
    });
  }

  _edit: boolean;
  column: TableColumn;
  filterOptions: IIdName<any>[] = [];
  dict: IDictionary<IIdName<any>[]> = {};
  row: TableRow<T>;

  protected _alive = true;

  protected constructor(
    protected svc: TableService<T>,
    protected cdr: ChangeDetectorRef
  ) {
  }

  valueChanged(): void {
    this.svc.changeValue({
      column: this.column,
      row: this.row,
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.svc.editRowStart
      .pipe(
        takeWhile((_) => this._alive)
      )
      .subscribe((cell: ICellCoordinates<T>) => {
        if (
          this.row === cell?.row &&
          !this._edit
          // &&
          // this.svc.boolOrFuncCallback(this.svc.cellEditable)({
          //   column: this.column,
          //   row: this.row,
          // })
        ) {
          this.start(cell, 'row');
        }
        if (this.row !== cell?.row && this._edit) {
          this.stop();
        }
      });

    this.svc.editCellStart
      .pipe(
        takeWhile((_) => this._alive)
      )
      .subscribe((cell: ICellCoordinates<T>) => {
        if (
          this.row === cell?.row &&
          this.column.name === cell?.column?.name &&
          !this._edit
        ) {
          this.start(cell, 'cell');
        }
        if (
          (this.row !== cell?.row || this.column.name !== cell?.column?.name) &&
          this._edit
        ) {
          this.stop();
        }
      });

    this.svc.valueSet
      .pipe(takeWhile((_) => this._alive))
      .subscribe((cellValue: ICellValue<T>) => {
        if (
          this.row === cellValue.cell.row
          && this.column.name === cellValue.cell.column.name
        ) {
          this.row.data[this.column.name] = cellValue.value;
          this.cdr.detectChanges();
        }
      });

    this.svc.valueChanged
      .pipe(takeWhile((_) => this._alive))
      .subscribe((cellValue: ICellCoordinates<T>) => {
        if (
          this.row === cellValue.row
        ) {
          this.cdr.detectChanges();
        }
      });
  }

  private start(initiator: ICellCoordinates<T>, type: 'cell' | 'row') {
    this._edit = true;
    this.startEdit(initiator, type);
    this.cdr.markForCheck();
  }

  private stop() {
    this._edit = false;
    this.stopEdit();
    this.cdr.markForCheck();
  }

  abstract startEdit(
    initiator: ICellCoordinates<T>,
    type: 'cell' | 'row'
  ): void;

  abstract stopEdit(): void;
}
