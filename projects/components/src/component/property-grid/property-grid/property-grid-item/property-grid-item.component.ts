import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TableColumn } from '../../../table/contract/table-column';
import { IDictionary } from '../../../../common/contract/i-dictionary';
import { IIdName } from '../../../../common/contract/i-id-name';
import { FilterType } from '../../../filter/enum/filter-type.enum';
import { FormGroup } from '@angular/forms';
import { FormsUtil } from '../../../../util/forms-util';
import { TranslocoService } from '@ngneat/transloco';
import { filter, takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {Align} from '../../../../common/enum/align.enum';

@Component({
  selector: 'teta-property-grid-item',
  templateUrl: './property-grid-item.component.html',
  styleUrls: ['./property-grid-item.component.scss'],
})
export class PropertyGridItemComponent<T> implements OnInit, OnDestroy {
  @Input() column: TableColumn;
  @Input() hideNonEditable: boolean;
  @Input() dict: IDictionary<IIdName<any>[]>;

  @Input()
  set formGroup(form: FormGroup) {
    this._formGroup = form;
    this._formSub?.unsubscribe();
    this._formSub = this._formGroup.controls[this.column.name].valueChanges
      .pipe(
        takeWhile(() => this._alive),
        filter(
          (_) =>
            this.column.filterType !== FilterType.string &&
            this.column.filterType !== FilterType.number
        )
      )
      .subscribe((_) => {
        this.controlValueChange.emit({
          id: _,
          name: this.column.name,
        });
      });
  }

  get formGroup() {
    return this._formGroup;
  }

  @Input() horizontal: boolean;
  @Output() controlValueChange = new EventEmitter<IIdName<any>>();
  align = Align;
  filterTypeEnum = FilterType;

  private _formGroup: FormGroup;
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

  constructor(private _transloco: TranslocoService) {}

  getDict() {
    const dict = this.dict[this.column.name];
    if (this.column.parentName?.length > 0) {
      return dict?.filter(
        (dictItem: IIdName<any>) =>
          dictItem.parentId ===
          this.formGroup.getRawValue()[this.column.parentName]
      );
    }
    return dict;
  }

  controlIsInvalid(controlName: string) {
    return FormsUtil.controlIsInvalid(this.formGroup, controlName);
  }

  getError(column: TableColumn): string {
    const control = this.formGroup.get(column.name);
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
  }

  valueChange() {
    this.controlValueChange.emit({
      id: this.formGroup.controls[this.column.name].value,
      name: this.column.name,
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._alive = false;
    this._formSub?.unsubscribe();
  }
}
