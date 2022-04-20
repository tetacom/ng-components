import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {HeadCellComponentBase} from '../../base/head-cell-component-base';
import {TableColumn} from '../../contract/table-column';
import {TableRow} from '../../contract/table-row';

@Component({
  selector: 'teta-default-head-cell',
  templateUrl: './default-head-cell.component.html',
  styleUrls: ['./default-head-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultHeadCellComponent<T>
  extends HeadCellComponentBase<T>
  implements OnInit {
  private _column: TableColumn;
  private _data: TableRow<T>[];

  @Input()
  set column(val: TableColumn) {
    this._column = val;
    this._cdr.detectChanges();
  }

  get column(): TableColumn {
    return this._column;
  }

  @Input()
  set data(data: TableRow<T>[]) {
    this._data = data;
    this._cdr.detectChanges();
  }

  get data(): TableRow<T>[] {
    return this._data;
  }

  constructor(private _cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }
}
