import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { FormsUtil } from '../../../util/forms-util';
import { CellComponentBase } from '../base/cell-component-base';
import { getCellComponent } from '../contract/cell-components-map';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';

@Component({
  selector: 'teta-cell-host',
  template: '',
  styleUrls: ['./cell-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [FormsUtil.formProvider],
})
export class CellHostComponent<T> implements OnInit, OnChanges {
  @Input() column: TableColumn;
  @Input() row: TableRow<T>;
  @Input() filterOptions: IIdName<any>[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  private _init = false;
  private _componentRef: ComponentRef<CellComponentBase<T>>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    if (
      !Object.prototype.isPrototypeOf.call(
        CellComponentBase,
        this.column.cellComponent
      )
    ) {
      this.column.cellComponent = getCellComponent(this.column);
    }
    this._componentRef = this.viewContainerRef.createComponent(
      this.column.cellComponent
    );
    this._componentRef.instance.column = this.column;
    this._componentRef.instance.row = this.row;
    this._componentRef.instance.filterOptions = this.filterOptions;
    this._componentRef.instance.dict = this.dict;
    this._init = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._init) {
      if (Object.prototype.hasOwnProperty.call(changes, 'row')) {
        this._componentRef.instance.row = this.row;
      }
      if (Object.prototype.hasOwnProperty.call(changes, 'column')) {
        this._componentRef.instance.column = this.column;
      }
      if (Object.prototype.hasOwnProperty.call(changes, 'filterOptions')) {
        this._componentRef.instance.filterOptions = this.filterOptions;
      }
      if (Object.prototype.hasOwnProperty.call(changes, 'dict')) {
        this._componentRef.instance.dict = this.dict;
      }
      this._componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }
}
