import {
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
} from '@angular/core';
import { ControlContainer, FormGroup, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { boolOrFuncCallback } from '../../../util/bool-or-func';
import { FormsUtil } from '../../../util/forms-util';
import { TableColumn } from '../../table/contract/table-column';
import { PropertyGridItemDescriptionDirective } from './property-grid-item-description.directive';
import { PropertyGridGroupComponent } from './property-grid-group/property-grid-group.component';
import { PropertyGridItemComponent } from './property-grid-item/property-grid-item.component';

@Component({
  selector: 'teta-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss'],
  viewProviders: [FormsUtil.formProvider],
  standalone: true,
  imports: [PropertyGridItemComponent, FormsModule, ReactiveFormsModule, PropertyGridGroupComponent],
})
export class PropertyGridComponent<T> implements OnDestroy {
  @HostBinding('class.form-container') formClass = true;
  @ContentChildren(PropertyGridItemDescriptionDirective)
  itemTemplates: QueryList<PropertyGridItemDescriptionDirective>;
  @Input() hideNonEditable: boolean;
  @Input() columns: TableColumn[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() set item(item: T) {
    this._item = item;
    if (this.formGroup) {
      this.formGroup.patchValue(item, {
        emitEvent: false,
      });
    }
  }
  get item() {
    return this._item;
  }
  @Input() horizontal: boolean;
  @Input() decimalPart: number;

  @Output() controlValueChange = new EventEmitter<IIdName<any>>();

  private _alive = true;
  private _item: T;

  get formGroup(): FormGroup {
    if (this._formGroup instanceof FormGroup) {
      return this._formGroup;
    }
    if (this._formGroup instanceof NgForm) {
      return this._formGroup.form;
    }
    return null;
  }

  constructor(@Optional() private _formGroup: ControlContainer) {}

  getEditable(column: TableColumn) {
    return boolOrFuncCallback(column.editable)({
      column: column,
      row: this.formGroup?.getRawValue(),
    });
  }

  onControlValueChange(event: IIdName<any>) {
    const affected = this.columns.filter((_) => _.parentName === event.name);
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

  ngOnDestroy() {
    this._alive = false;
  }

  trackColumns(index: number, column: TableColumn): any {
    return column.name;
  }

  private getDictValue(value: any, name: string) {
    return this.dict[name]?.find((_) => _.id === value);
  }
}
