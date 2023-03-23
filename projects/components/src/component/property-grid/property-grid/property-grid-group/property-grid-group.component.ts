import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, QueryList,
} from '@angular/core';
import {TableColumn} from '../../../table/contract/table-column';
import {IDictionary} from '../../../../common/contract/i-dictionary';
import {IIdName} from '../../../../common/contract/i-id-name';
import {PropertyGridItemDescriptionDirective} from "../property-grid-item-description.directive";

@Component({
  selector: 'teta-property-grid-group',
  templateUrl: './property-grid-group.component.html',
  styleUrls: ['./property-grid-group.component.scss'],
})
export class PropertyGridGroupComponent<T> implements OnInit {
  @Input() column: TableColumn;
  @Input() hideNonEditable: boolean;
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() item: T;
  @Input() horizontal: boolean;
  @Output() controlValueChange = new EventEmitter<IIdName<any>>();
  @Input() decimalPart: number;
  @Input() itemTemplates: QueryList<PropertyGridItemDescriptionDirective>;

  constructor() {
  }

  ngOnInit(): void {
  }

  trackColumns(index: number, column: TableColumn): any {
    return column.name;
  }
}
