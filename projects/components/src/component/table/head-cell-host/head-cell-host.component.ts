import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {HeadCellComponentBase} from '../base/head-cell-component-base';
import {TableColumn} from '../contract/table-column';
import {DefaultHeadCellComponent} from '../default/default-head-cell/default-head-cell.component';

@Component({
  selector: 'teta-head-cell-host',
  template: '',
  styleUrls: ['./head-cell-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadCellHostComponent<T> implements OnInit {
  private _column: TableColumn;
  private _data: T[];

  private componentRef: ComponentRef<HeadCellComponentBase<T>>;
  private init: boolean;

  @Input()
  set column(column: TableColumn) {
    this._column = column;
    if (this.init) {
      this.componentRef.instance.column = this._column;
    }
  }

  get column(): TableColumn {
    return this._column;
  }

  @Input()
  set data(data: T[]) {
    this._data = data;
    if (this.init) {
      this.componentRef.instance.data = this._data;
    }
  }

  get data(): T[] {
    return this._data;
  }

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    if (!HeadCellComponentBase.isPrototypeOf(this.column.headCellComponent)) {
      this.column.headCellComponent = DefaultHeadCellComponent;
    }
    this.componentRef =
      this.viewContainerRef.createComponent<HeadCellComponentBase<T>>(this.column.headCellComponent);
    this.componentRef.instance.column = this.column;
    this.componentRef.instance.data = this.data;
    this.init = true;
  }
}
