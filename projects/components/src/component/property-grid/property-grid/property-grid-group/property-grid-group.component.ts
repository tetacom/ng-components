import {Component, input, output, QueryList} from '@angular/core';
import {IDictionary} from '../../../../common/contract/i-dictionary';
import {IIdName} from '../../../../common/contract/i-id-name';
import {FormsUtil} from '../../../../util/forms-util';
import {TableColumn} from '../../../table/contract/table-column';
import {PropertyGridItemDescriptionDirective} from '../property-grid-item-description.directive';
import {PropertyGridItemComponent} from '../property-grid-item/property-grid-item.component';
import {ExpandItemComponent} from '../../../expand-card/expand-item/expand-item.component';

@Component({
  selector: 'teta-property-grid-group',
  templateUrl: './property-grid-group.component.html',
  styleUrls: ['./property-grid-group.component.scss'],
  viewProviders: [FormsUtil.formProvider],
  standalone: true,
  imports: [ExpandItemComponent, PropertyGridItemComponent],
})
export class PropertyGridGroupComponent<T> {
  column = input<TableColumn>();
  hideNonEditable = input<boolean>();
  dict = input<IDictionary<IIdName<any>[]>>();
  item = input<T>();
  horizontal = input<boolean>();
  controlValueChange = output<IIdName<any>>();
  decimalPart = input<number>();
  itemTemplates = input<QueryList<PropertyGridItemDescriptionDirective>>();
}
