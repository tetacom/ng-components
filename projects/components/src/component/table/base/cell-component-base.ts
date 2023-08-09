import {
  ChangeDetectorRef,
  Component,
  HostBinding, inject, Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {TableService} from '../service/table.service';
import {takeWhile} from 'rxjs/operators';
import {ICellCoordinates} from '../contract/i-cell-coordinates';
import {TableColumn} from '../contract/table-column';
import {IIdName} from '../../../common/contract/i-id-name';
import {ICellValue} from '../contract/i-cell-value';
import {IDictionary} from '../../../common/contract/i-dictionary';
import {ControlContainer, FormGroup, NgForm} from "@angular/forms";
import {FormsUtil} from "../../../util/forms-util";

@Component({
  template: '',
})
export abstract class CellComponentBase<T> implements OnInit, OnDestroy {
  protected _column: TableColumn;
  set column(column: TableColumn) {
    this._column = column;
  }

  get column() {
    return this._column;
  }

  protected _row: T;
  set row(row: T) {
    this._row = row;
  }

  get row() {
    return this._row
  }

  filterOptions: IIdName<any>[] = [];
  dict: IDictionary<IIdName<any>[]> = {};


  @HostBinding('class.cell-component') private readonly cellClass = true;

  private _formGroup = inject(ControlContainer, {
    optional: true
  });

  get formGroup(): FormGroup {
    if (this._formGroup instanceof FormGroup) {
      return this._formGroup;
    }
    if (this._formGroup instanceof NgForm) {
      return this._formGroup.form;
    }
    return null;
  }

  @HostBinding('class.cell-invalid') get cellInvalid() {
    const control = this.formGroup?.get(this.column?.name);
    if (control) {
      return control.invalid;
    }
    return false;
  }

  protected _edit: boolean;

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
    this.formGroup.registerControl(this.column.name, FormsUtil.initControlFromColumn(this.column, this.row));

    this.formGroup?.controls[this.column.name]?.valueChanges
      .pipe(
        takeWhile(() => this._alive)
      )
      .subscribe((value) => {
        console.log('value', value)
        // this.controlValueChange.emit({
        //   id: _,
        //   name: this.column.name,
        // });
      });
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
    console.log(this.formGroup.controls)
    this.formGroup.updateValueAndValidity();
    console.error('valid', this.formGroup, this.formGroup.valid);
    this.stopEdit();
    this.cdr.markForCheck();
  }

  abstract startEdit(
    initiator: ICellCoordinates,
    type: 'cell' | 'row'
  ): void;

  abstract stopEdit(): void;
}
