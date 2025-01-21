import { ChangeDetectorRef, Component, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, NgForm } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { boolOrFuncCallback } from '../../../util/bool-or-func';
import { FormsUtil } from '../../../util/forms-util';
import { ICellCoordinates } from '../contract/i-cell-coordinates';
import { ICellValue } from '../contract/i-cell-value';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';
import { TableService } from '../service/table.service';

@Component({
    template: '',
    standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class CellComponentBase<T> implements OnInit, OnDestroy {
  @HostBinding('class.cell-component') private readonly cellClass = true;

  @HostBinding('class.cell-invalid') get cellInvalid() {
    const control = this.formGroup?.get(this.column?.name);
    if (control) {
      return control.invalid;
    }
    return false;
  }

  private _formGroup = inject(ControlContainer, {
    optional: true,
  });

  get control(): FormControl {
    return this.formGroup?.get(this.column?.name) as FormControl;
  }

  protected _column: TableColumn;

  set column(column: TableColumn) {
    this._column = column;
    this.setupControl();
  }

  get column() {
    return this._column;
  }

  protected _row: TableRow<T>;
  set row(row: TableRow<T>) {
    this._row = row;
    this.setupControl();
  }

  get row() {
    return this._row;
  }

  filterOptions: IIdName<any>[] = [];
  dict: IDictionary<IIdName<any>[]> = {};

  get formGroup(): FormGroup {
    if (this._formGroup instanceof FormGroup) {
      return this._formGroup;
    }
    if (this._formGroup instanceof NgForm) {
      return this._formGroup.form;
    }
    return null;
  }

  protected _edit: boolean;

  get edit() {
    return this._edit && this.editable;
  }

  get editable() {
    return boolOrFuncCallback(this.column.editable)({
      column: this.column,
      row: this.row.data,
    });
  }

  get index() {
    return this.svc.getRowIndex(this.row.data);
  }

  protected _alive = true;

  protected constructor(
    protected svc: TableService<T>,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngOnInit(): void {
    this.init();

    this.formGroup?.controls[this.column.name]?.valueChanges.pipe(takeWhile(() => this._alive)).subscribe((value) => {
      this.formGroup.updateValueAndValidity();
      this.row.valid = this.formGroup?.valid;
      this.row.data[this.column.name] = this.control.value;
      this.svc.changeValue({
        column: this.column.name,
        row: this.index,
      });
    });
  }

  private init(): void {
    this.svc.editRowStart.pipe(takeWhile((_) => this._alive)).subscribe((cell: ICellCoordinates) => {
      if (this.index === cell?.row && !this._edit) {
        this.start(cell, 'row');
      }
      if (this.index !== cell?.row && this._edit) {
        this.stop();
      }
    });

    this.svc.editCellStart.pipe(takeWhile((_) => this._alive)).subscribe((cell: ICellCoordinates) => {
      if (this.index === cell?.row && this.column.name === cell?.column && !this._edit) {
        this.start(cell, 'cell');
      }
      if ((this.index !== cell?.row || this.column.name !== cell?.column) && this._edit) {
        this.stop();
      }
    });

    this.svc.valueSet.pipe(takeWhile((_) => this._alive)).subscribe((cellValue: ICellValue) => {
      if (this.index === cellValue.row && this.column.name === cellValue.column) {
        this.row.data[this.column.name] = cellValue.value;
        this.setupControl();
        this.formGroup.updateValueAndValidity();
        this.row.valid = this.formGroup.valid;
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      }
    });
  }

  abstract startEdit(initiator: ICellCoordinates, type: 'cell' | 'row'): void;

  abstract stopEdit(): void;

  private setupControl() {
    if (!this.column) {
      return;
    }
    if (!this.control) {
      this.formGroup.registerControl(this.column.name, FormsUtil.initControlFromColumn(this.column, this.row?.data));
    } else {
      this.control.patchValue(this.row?.data[this.column.name], {
        emitEvent: false,
      });
    }
    if (this.column && this.row) {
      if (this.editable) {
        this.control.enable({ emitEvent: false });
      } else {
        this.control.disable({ emitEvent: false });
      }
    }
  }

  private start(initiator: ICellCoordinates, type: 'cell' | 'row') {
    this._edit = true;
    this.cdr.detectChanges();
    this.startEdit(initiator, type);
  }

  private stop() {
    this._edit = false;
    this.formGroup.updateValueAndValidity();
    this.row.valid = this.formGroup?.valid;
    this.stopEdit();
    this.cdr.markForCheck();
  }
}
