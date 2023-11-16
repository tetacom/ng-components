import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { IDictionary } from '../../../../common/contract/i-dictionary';
import { IIdName } from '../../../../common/contract/i-id-name';
import { Align } from '../../../../common/enum/align.enum';
import { boolOrFuncCallback } from '../../../../util/bool-or-func';
import { FormsUtil } from '../../../../util/forms-util';
import { FilterType } from '../../../filter/enum/filter-type.enum';
import { TableColumn } from '../../../table/contract/table-column';
import { PropertyGridItemDescriptionDirective } from '../property-grid-item-description.directive';

@Component({
  selector: 'teta-property-grid-item',
  templateUrl: './property-grid-item.component.html',
  styleUrls: ['./property-grid-item.component.scss'],
  viewProviders: [FormsUtil.formProvider],
})
export class PropertyGridItemComponent<T> implements OnDestroy, OnChanges {
  @Input() column: TableColumn;
  @Input() hideNonEditable: boolean;
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() decimalPart: number;
  @Input() item: T;
  @Input() itemTemplates: QueryList<PropertyGridItemDescriptionDirective>;

  get template() {
    return this.itemTemplates.find(item => item.name === this.column.name);
  }

  get formGroup(): FormGroup {
    if (this._formGroup instanceof FormGroup) {
      return this._formGroup;
    }
    if (this._formGroup instanceof NgForm) {
      return this._formGroup.form;
    }
    return null;
  }

  get editable() {
    return boolOrFuncCallback(this.column.editable)({
      column: this.column,
      row: this.formGroup?.getRawValue(),
    });
  }

  @Input() horizontal: boolean;
  @Output() controlValueChange = new EventEmitter<IIdName<any>>();
  align = Align;
  filterTypeEnum = FilterType;

  private _formSub: Subscription;

  get caption(): string {
    if (this.column.filterType === FilterType.boolean) {
      return '';
    }
    return `${this.column.caption}${
      this.column.unit ? `, ${this.column.unit}` : ''
    }`;
  }

  private _alive = true;

  constructor(
    private _transloco: TranslocoService,
    @Optional() private _formGroup: ControlContainer
  ) {}

  getDict() {
    const dict = this.dict ? this.dict[this.column.name] : [];
    if (this.column.parentName?.length > 0) {
      return dict?.filter(
        (dictItem: IIdName<any>) =>
          dictItem.parentId ===
          this.formGroup?.getRawValue()[this.column.parentName]
      );
    }
    return dict;
  }

  controlIsInvalid(controlName: string) {
    return FormsUtil.controlIsInvalid(this.formGroup, controlName);
  }

  getError(column: TableColumn): string {
    const control = this.formGroup?.get(column.name);
    if (control?.hasError('required')) {
      return this._transloco.translate('errors.field_is_required');
    }
    if (control?.hasError('min')) {
      return this._transloco.translate('errors.min_value', {
        value: column.minValue,
      });
    }
    if (control?.hasError('max')) {
      return this._transloco.translate('errors.max_value', {
        value: column.maxValue,
      });
    }
    if (control?.hasError('maxlength')) {
      return this._transloco.translate('errors.max_length', {
        value: column.maxLength,
      });
    }
  }

  ngOnDestroy() {
    this._alive = false;
    this._formSub?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.column && this.item) {
      this.formGroup.registerControl(
        this.column.name,
        FormsUtil.initControlFromColumn(this.column, this.item)
      );
      this._formSub?.unsubscribe();
      this._formSub = this.formGroup?.controls[this.column.name]?.valueChanges
        .pipe(takeWhile(() => this._alive))
        .subscribe(_ => {
          this.controlValueChange.emit({
            id: _,
            name: this.column.name,
          });
        });
    }
  }
}
