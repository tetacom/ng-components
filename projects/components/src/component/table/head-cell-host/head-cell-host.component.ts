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
export class HeadCellHostComponent implements OnInit {
  private _column: TableColumn;
  private componentRef: ComponentRef<HeadCellComponentBase>;
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

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    if (!HeadCellComponentBase.isPrototypeOf(this.column.headCellComponent)) {
      this.column.headCellComponent = DefaultHeadCellComponent;
    }
    this.componentRef =
      this.viewContainerRef.createComponent<HeadCellComponentBase>(this.column.headCellComponent);
    this.componentRef.instance.column = this.column;
    this.init = true;
  }
}
