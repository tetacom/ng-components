import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {TableService} from '../service/table.service';
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

  get index() {
    return this.svc.getRowIndex(this.row);
  }

  _edit: boolean;
  column: TableColumn;
  filterOptions: IIdName<any>[] = [];
  dict: IDictionary<IIdName<any>[]> = {};
  row: T;

  protected _alive = true;

  protected constructor(
    protected svc: TableService<T>,
    protected cdr: ChangeDetectorRef
  ) {
  }

  valueChanged(): void {
    this.svc.changeValue({
      column: this.column.name,
      row: this.index,
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
      .subscribe((cell: ICellCoordinates) => {
        if (this.index === cell?.row && !this._edit) {
          this.start(cell, 'row');
        }
        if (this.index !== cell?.row && this._edit) {
          this.stop();
        }
      });

    this.svc.editCellStart
      .pipe(
        takeWhile((_) => this._alive)
      )
      .subscribe((cell: ICellCoordinates) => {
        if (this.index === cell?.row && this.column.name === cell?.column && !this._edit) {
          this.start(cell, 'cell');
        }
        if ((this.index !== cell?.row || this.column.name !== cell?.column) && this._edit) {
          this.stop();
        }
      });

    this.svc.valueSet
      .pipe(takeWhile((_) => this._alive))
      .subscribe((cellValue: ICellValue) => {
        if (this.index === cellValue.row && this.column.name === cellValue.column) {
          this.row[this.column.name] = cellValue.value;
          this.cdr.detectChanges();
        }
      });

    this.svc.valueChanged
      .pipe(takeWhile((_) => this._alive))
      .subscribe((cellValue: ICellCoordinates) => {
        if (this.index === cellValue.row) {
          this.cdr.detectChanges();
        }
      });
  }

  private start(initiator: ICellCoordinates, type: 'cell' | 'row') {
    this._edit = true;
    this.cdr.detectChanges();
    this.startEdit(initiator, type);
  }

  private stop() {
    this._edit = false;
    this.stopEdit();
    this.cdr.markForCheck();
  }

  abstract startEdit(
    initiator: ICellCoordinates,
    type: 'cell' | 'row'
  ): void;

  abstract stopEdit(): void;
}
