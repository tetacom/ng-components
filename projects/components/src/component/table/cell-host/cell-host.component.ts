import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { CellComponentBase } from '../base/cell-component-base';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';
import { getCellComponent } from '../contract/cell-components-map';
import { IIdName } from '../../../common/contract/i-id-name';
import { IDictionary } from '../../../common/contract/i-dictionary';

@Component({
  selector: 'teta-cell-host',
  template: '',
  styleUrls: ['./cell-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellHostComponent<T> implements OnInit, OnDestroy, OnChanges {
  @Input() column: TableColumn;
  @Input() row: TableRow<T>;
  @Input() filterOptions: IIdName<any>[];
  @Input() dict: IDictionary<IIdName<any>[]>;
  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    if (!CellComponentBase.isPrototypeOf(this.column.cellComponent)) {
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

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this._init &&
      (changes.hasOwnProperty('row') ||
        changes.hasOwnProperty('column') ||
        changes.hasOwnProperty('filterOptions') ||
        changes.hasOwnProperty('dict'))
    ) {
      this._componentRef.instance.row = this.row;
      this._componentRef.instance.column = this.column;
      this._componentRef.instance.filterOptions = this.filterOptions;
      this._componentRef.instance.dict = this.dict;
      this._componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
  }
}
