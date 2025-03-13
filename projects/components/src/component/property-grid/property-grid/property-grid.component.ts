import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  HostBinding,
  input,
  Optional,
  output,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { boolOrFuncCallback } from '../../../util/bool-or-func';
import { FormsUtil } from '../../../util/forms-util';
import { TableColumn } from '../../table/contract/table-column';
import { PropertyGridItemDescriptionDirective } from './property-grid-item-description.directive';
import { PropertyGridGroupComponent } from './property-grid-group/property-grid-group.component';
import { PropertyGridItemComponent } from './property-grid-item/property-grid-item.component';
import { ArrayUtil } from '../../../common/util/array-util';
import { HintDirective } from '../../../directive/hint/hint.directive';
import { Align } from '../../../common/enum/align.enum';

@Component({
  selector: 'teta-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss'],
  viewProviders: [FormsUtil.formProvider],
  imports: [PropertyGridItemComponent, FormsModule, ReactiveFormsModule, PropertyGridGroupComponent, HintDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyGridComponent<T> {
  @HostBinding('class.form-container') formClass = true;
  itemTemplates = contentChildren(PropertyGridItemDescriptionDirective);
  hideNonEditable = input<boolean>();
  columns = input<TableColumn[]>();
  dict = input<IDictionary<IIdName<any>[]>>();
  item = input<T>();

  horizontal = input<boolean>();
  decimalPart = input<number>();

  controlValueChange = output<IIdName<any>>();

  get formGroup(): FormGroup {
    if (this._formGroup instanceof FormGroup) {
      return this._formGroup;
    }
    if (this._formGroup instanceof NgForm) {
      return this._formGroup.form;
    }
    return null;
  }

  constructor(@Optional() private _formGroup: ControlContainer) {
    effect(() => {
      if (this.item() && this.columns()?.length && this.formGroup) {
        for (const key in this.item()) {
          if (Object.prototype.hasOwnProperty.call(this.item(), key)) {
            if (!this.formGroup.get(key)) {
              const currentColumn = ArrayUtil.findRecursive(this.columns(), (item) => item.name === key, 'columns');

              if (currentColumn) {
                this.formGroup.setControl(key, FormsUtil.initControlFromColumn(currentColumn, this.item()), {
                  emitEvent: false,
                });
              } else {
                this.formGroup.setControl(key, new UntypedFormControl(this.item()[key]), {
                  emitEvent: false,
                });
              }
            } else {
              this.formGroup.patchValue(this.item(), {
                emitEvent: false,
              });
            }
          }
        }
      }
    });
  }

  getEditable(column: TableColumn) {
    return boolOrFuncCallback(column.editable)({
      column: column,
      row: this.formGroup?.getRawValue(),
    });
  }

  getHint(column: TableColumn) {
    if (column.hint === column.caption) {
      return '';
    }
    return `${column.hint || column.caption}${column.unit ? `, ${column.unit}` : ''}`;
  }

  onControlValueChange(event: IIdName<any>) {
    const affected = this.columns().filter((_) => _.parentName === event.name);
    if (affected?.length) {
      affected.forEach((item) => {
        const value = this.formGroup.getRawValue()[item.name];
        if (value) {
          const dictValue = this.getDictValue(value, item.name);
          if (dictValue && dictValue.parentId !== event.id) {
            const newObj = {};
            newObj[item.name] = null;
            this.formGroup.patchValue(newObj);
          }
        }
      });
    }
    this.controlValueChange.emit(event);
  }

  private getDictValue(value: any, name: string) {
    return this.dict()[name]?.find((_) => _.id === value);
  }

  protected readonly Align = Align;
}
