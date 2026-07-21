import { ChangeDetectorRef, Component, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, NgForm } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { takeWhile } from 'rxjs/operators';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { Align } from '../../../common/enum/align.enum';
import { HintDirective } from '../../../directive/hint/hint.directive';
import { boolOrFuncCallback } from '../../../util/bool-or-func';
import { FormsUtil } from '../../../util/forms-util';
import { ICellCoordinates } from '../contract/i-cell-coordinates';
import { ICellValue } from '../contract/i-cell-value';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';
import { TableService } from '../service/table.service';

@Component({
  template: '',
  standalone: false,
})
export abstract class CellComponentBase<T> implements OnInit, OnDestroy {
  protected svc = inject<TableService<T>>(TableService);
  protected cdr = inject(ChangeDetectorRef);
  private transloco = inject(TranslocoService, { optional: true });
  private hint = inject(HintDirective, { optional: true });
  private _formGroup = inject(ControlContainer, {
    optional: true,
  });

  @HostBinding('class.cell-component') readonly cellClass = true;

  @HostBinding('class.cell-invalid') get cellInvalid() {
    const control = this.formGroup?.get(this.column?.name);
    if (control) {
      return control.invalid;
    }
    return false;
  }

  get control(): FormControl {
    return this.formGroup?.get(this.column?.name) as FormControl;
  }

  get validationHint(): string | null {
    return this.getValidationHint();
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

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngOnInit(): void {
    this.setupValidationHint();
    this.init();

    this.formGroup?.controls[this.column.name]?.valueChanges.pipe(takeWhile(() => this._alive)).subscribe((value) => {
      this.formGroup.updateValueAndValidity();
      this.row.valid = this.formGroup?.valid;
      this.row.data[this.column.name] = this.control.value;
      this.updateValidationHint();
      this.svc.changeValue({
        column: this.column.name,
        row: this.index,
      });
    });

    this.control?.statusChanges.pipe(takeWhile(() => this._alive)).subscribe(() => {
      this.updateValidationHint();
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

        for (const controlsKey in this.formGroup.controls) {
          this.formGroup.controls[controlsKey].updateValueAndValidity({
            emitEvent: false,
            onlySelf: true,
          });
        }

        this.formGroup.updateValueAndValidity();
        this.row.valid = this.formGroup.valid;
        this.updateValidationHint();
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
    this.updateValidationHint();
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
    this.updateValidationHint();
    this.stopEdit();
    this.cdr.markForCheck();
  }

  private setupValidationHint(): void {
    if (!this.hint) {
      return;
    }
    this.hint.appendToBody = true;
    this.hint.align = Align.auto;
    this.hint.className = 'hint_error';
    this.updateValidationHint();
  }

  private updateValidationHint(): void {
    if (this.hint) {
      this.hint.tetaHint = this.getValidationHint();
    }
  }

  private getValidationHint(): string | null {
    const control = this.control;
    if (!control?.invalid || !control.errors) {
      return null;
    }
    if (control.hasError('required')) {
      return this.translate('errors.field_is_required', 'Field is required');
    }
    if (control.hasError('min')) {
      const value = this.column?.minValue ?? control.getError('min')?.min;
      return this.translate('errors.min_value', `Minimum value: ${value}`, {
        value,
      });
    }
    if (control.hasError('max')) {
      const value = this.column?.maxValue ?? control.getError('max')?.max;
      return this.translate('errors.max_value', `Maximum value: ${value}`, {
        value,
      });
    }
    if (control.hasError('maxlength')) {
      const value = this.column?.maxLength ?? control.getError('maxlength')?.requiredLength;
      return this.translate('errors.max_length', `Maximum length: ${value}`, {
        value,
      });
    }

    const error = Object.values(control.errors)[0];
    if (typeof error === 'string') {
      return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
      return `${error.message}`;
    }
    return null;
  }

  private translate(key: string, fallback: string, params?: Record<string, unknown>): string {
    const result = this.transloco?.translate(key, params);
    return result && result !== key ? result : fallback;
  }
}
