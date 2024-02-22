import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  QueryList,
} from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';

import { IDictionary } from '../../../../common/contract/i-dictionary';
import { IIdName } from '../../../../common/contract/i-id-name';
import { boolOrFuncCallback } from '../../../../util/bool-or-func';
import { FormsUtil } from '../../../../util/forms-util';
import { TableColumn } from '../../../table/contract/table-column';
import { PropertyGridItemDescriptionDirective } from '../property-grid-item-description.directive';
import { PropertyGridItemComponent } from '../property-grid-item/property-grid-item.component';
import { ExpandItemComponent } from '../../../expand-card/expand-item/expand-item.component';

@Component({
    selector: 'teta-property-grid-group',
    templateUrl: './property-grid-group.component.html',
    styleUrls: ['./property-grid-group.component.scss'],
    viewProviders: [FormsUtil.formProvider],
    standalone: true,
    imports: [ExpandItemComponent, PropertyGridItemComponent],
})
export class PropertyGridGroupComponent<T> {
  @Input() column: TableColumn;
  @Input() hideNonEditable: boolean;
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() item: T;
  @Input() horizontal: boolean;
  @Output() controlValueChange = new EventEmitter<IIdName<any>>();
  @Input() decimalPart: number;
  @Input() itemTemplates: QueryList<PropertyGridItemDescriptionDirective>;

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

  constructor(@Optional() private _formGroup: ControlContainer) {}

  trackColumns(index: number, column: TableColumn): any {
    return column.name;
  }
}
