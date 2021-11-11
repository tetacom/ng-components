import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TableColumn } from '../../table/contract/table-column';
import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'teta-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss'],
})
export class PropertyGridComponent<T> implements OnInit, OnDestroy {
  @HostBinding('class.form-container') formClass = true;

  @Input() hideNonEditable: boolean;
  @Input() columns: TableColumn[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() formGroup: FormGroup;
  @Input() horizontal: boolean;

  @Output() controlValueChange = new EventEmitter<IIdName<any>>();

  private _alive = true;

  constructor() {}

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

  ngOnInit(): void {}

  ngOnDestroy() {
    this._alive = false;
  }

  private getDictValue(value: any, name: string) {
    return this.dict[name]?.find((_) => _.id === value);
  }
}
