import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TableColumn } from '../contract/table-column';
import { TableUtil } from '../util/table-util';
import { TableService } from '../service/table.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'teta-table-head-group',
  templateUrl: './table-head-group.component.html',
  styleUrls: ['./table-head-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadGroupComponent<T> implements OnInit, OnDestroy {
  @Input() showHeadCellMenu: boolean;

  @Input()
  set column(column: TableColumn) {
    this._column = column;
  }

  get column(): TableColumn {
    return this._column;
  }

  private _alive = true;
  private _column: TableColumn;
  private _hiddenColumns: string[];

  private get _leaves() {
    return TableUtil.getColumnLeaves(this._column)?.filter(
      (_) => this._hiddenColumns.indexOf(_.name) < 0
    );
  }

  @HostBinding('style.grid-column-end')
  get gridColumnEnd(): string {
    if (this._leaves?.length > 0) {
      return `span ${this._leaves.length}`;
    }
    return null;
  }

  get gridTemplateColumns(): string {
    return TableUtil.getGridTemplateColumns(this._leaves);
  }

  constructor(private _svc: TableService<T>, private _cdr: ChangeDetectorRef) {
    this._svc.hiddenColumns
      .pipe(takeWhile((_) => this._alive))
      .subscribe((_) => {
        this._hiddenColumns = _;
        this._cdr.markForCheck();
      });
  }

  columnIsHidden(column: TableColumn) {
    return this._svc.columnIsHidden(column);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }
}
