import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnChanges,
  OnDestroy,
  output,
} from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
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
import { TextFieldComponent } from '../../../input/text-field/text-field.component';
import { ToggleComponent } from '../../../toggle/toggle/toggle.component';
import { DatePickerComponent } from '../../../date-picker/date-picker/date-picker.component';
import { SelectComponent } from '../../../select/select/select.component';
import { NgTemplateOutlet } from '@angular/common';
import { InputComponent } from '../../../input/input/input.component';
import { DisableControlDirective } from '../../../../directive/disable-control/disable-control.directive';

@Component({
    selector: 'teta-property-grid-item',
    templateUrl: './property-grid-item.component.html',
    styleUrls: ['./property-grid-item.component.scss'],
    viewProviders: [FormsUtil.formProvider],
    imports: [
        InputComponent,
        FormsModule,
        ReactiveFormsModule,
        NgTemplateOutlet,
        SelectComponent,
        DatePickerComponent,
        ToggleComponent,
        TextFieldComponent,
        DisableControlDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyGridItemComponent<T> implements OnDestroy, OnChanges {
  private transloco = inject(TranslocoService);
  private _formGroup = inject(ControlContainer);

  column = input<TableColumn>();
  hideNonEditable = input<boolean>();
  dict = input<IDictionary<IIdName<any>[]>>();
  decimalPart = input<number>();
  item = input<T>();
  itemTemplates = input<readonly PropertyGridItemDescriptionDirective[]>();
  template = computed(() => {
    return this.itemTemplates().find((item) => item.name === this.column().name);
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

  editable = computed(() => {
    return boolOrFuncCallback(this.column().editable)({
      column: this.column(),
      row: this.formGroup?.getRawValue(),
    });
  });

  horizontal = input<boolean>();
  controlValueChange = output<IIdName<any>>();
  align = Align;
  filterTypeEnum = FilterType;

  private _formSub: Subscription;

  caption = computed(() => {
    if (this.column().filterType === FilterType.boolean) {
      return '';
    }
    return `${this.column().caption}${this.column().unit ? `, ${this.column().unit}` : ''}`;
  });

  hint = computed(() => {
    if (this.column().filterType === FilterType.boolean) {
      return '';
    }
    return `${this.column().hint || this.column().caption}${this.column().unit ? `, ${this.column().unit}` : ''}`;
  })

  private _alive = true;

  getDict() {
    const dict = this.dict() ? this.dict()[this.column().name] : [];
    if (this.column().parentName?.length > 0) {
      return dict?.filter(
        (dictItem: IIdName<any>) => dictItem.parentId === this.formGroup?.getRawValue()[this.column().parentName],
      );
    }
    return dict;
  }

  controlIsInvalid(controlName: string) {
    return FormsUtil.controlIsInvalid(this.formGroup, controlName);
  }

  getError(column: TableColumn) {
    const control = this.formGroup?.get(column.name);
    if (control?.hasError('required')) {
      return this.transloco.translate('errors.field_is_required');
    }
    if (control?.hasError('min')) {
      return this.transloco.translate('errors.min_value', {
        value: column.minValue,
      });
    }
    if (control?.hasError('max')) {
      return this.transloco.translate('errors.max_value', {
        value: column.maxValue,
      });
    }
    if (control?.hasError('maxlength')) {
      return this.transloco.translate('errors.max_length', {
        value: column.maxLength,
      });
    }
    return null;
  }

  ngOnDestroy() {
    this._alive = false;
    this._formSub?.unsubscribe();
  }

  ngOnChanges() {
    if (this.column() && this.item()) {
      if (!this.formGroup.get(this.column().name)) {
        this.formGroup.setControl(this.column().name, FormsUtil.initControlFromColumn(this.column(), this.item()));
      }
      this._formSub?.unsubscribe();
      this._formSub = this.formGroup?.controls[this.column().name]?.valueChanges
        .pipe(takeWhile(() => this._alive))
        .subscribe((_) => {
          this.controlValueChange.emit({
            id: _,
            name: this.column().name,
          });
        });
    }
  }
}
