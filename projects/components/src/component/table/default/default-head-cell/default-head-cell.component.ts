import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HeadCellComponentBase } from '../../base/head-cell-component-base';
import { TableColumn } from '../../contract/table-column';
import { HintDirective } from '../../../../directive/hint/hint.directive';

@Component({
  selector: 'teta-default-head-cell',
  templateUrl: './default-head-cell.component.html',
  styleUrls: ['./default-head-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HintDirective],
})
export class DefaultHeadCellComponent<T> extends HeadCellComponentBase<T>{
  private _column: TableColumn;
  private _columns: TableColumn[];
  private _data: T[];

  @Input()
  set column(val: TableColumn) {
    this._column = val;
    this._cdr.detectChanges();
  }

  get column(): TableColumn {
    return this._column;
  }

  @Input()
  set columns(val: TableColumn[]) {
    this._columns = val;
    this._cdr.detectChanges();
  }

  get columns(): TableColumn[] {
    return this._columns;
  }

  @Input()
  set data(data: T[]) {
    this._data = data;
    this._cdr.detectChanges();
  }

  get data(): T[] {
    return this._data;
  }

  constructor(private _cdr: ChangeDetectorRef) {
    super();
  }


  getHint(){
    const hintText = this.column.hint || this.column.caption;
    return `${hintText}, ${this.column.unit}`;
  }
}
