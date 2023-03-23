import {
  AfterViewInit,
  Component, ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit, Optional,
  Output, QueryList,
} from '@angular/core';
import {TableColumn} from '../../table/contract/table-column';
import {IDictionary} from '../../../common/contract/i-dictionary';
import {IIdName} from '../../../common/contract/i-id-name';
import {ControlContainer, FormGroup, NgForm} from '@angular/forms';
import {PropertyGridItemDescriptionDirective} from "./property-grid-item-description.directive";
import {FormsUtil} from "../../../util/forms-util";

@Component({
  selector: 'teta-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss'],
  viewProviders: [FormsUtil.formProvider],
})
export class PropertyGridComponent<T> implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('class.form-container') formClass = true;
  @ContentChildren(PropertyGridItemDescriptionDirective) itemTemplates: QueryList<PropertyGridItemDescriptionDirective>;
  @Input() hideNonEditable: boolean;
  @Input() columns: TableColumn[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() item: T;
  @Input() horizontal: boolean;
  @Input() decimalPart: number;

  @Output() controlValueChange = new EventEmitter<IIdName<any>>();

  private _alive = true;

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
    // console.log(this.formGroup)
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

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
  }
}
