import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {TableColumn} from '../contract/table-column';
import {TableUtil} from '../util/table-util';
import {TableService} from '../service/table.service';
import {takeWhile} from 'rxjs/operators';
import {ArrayUtil} from '../../../common/util/array-util';

@Component({
  selector: 'teta-table-head-group',
  templateUrl: './table-head-group.component.html',
  styleUrls: ['./table-head-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadGroupComponent<T> implements OnInit, OnDestroy {
  @Input() showHeadCellMenu: boolean;
  @Input() data: T[];

  @Input()
  set column(column: TableColumn) {
    this._column = column;
  }

  get column(): TableColumn {
    return this._column;
  }

  @HostBinding('style.flex-grow') get flexGrow() {
    if (this.column?.columns?.length > 0) {
      const flat = ArrayUtil.flatten(this.column?.columns, 'columns', true)
        .filter((_) => this._hiddenColumns.indexOf(_.name) < 0);
      return flat?.reduce((prev, curr) => prev + curr.flex, 0);
    }
    return this.column.flex;
  }

  @HostBinding('style.min-width.px')
  @HostBinding('style.flex-basis.px')
  get flexBasis() {
    if (this.column?.columns?.length > 0) {
      const flat = ArrayUtil.flatten(this.column?.columns, 'columns', true)
        .filter((_) => this._hiddenColumns.indexOf(_.name) < 0);
      return flat?.reduce((prev, curr) => prev + curr.width, 0);
    }
    return this.column.width;
  }

  private _alive = true;
  private _column: TableColumn;
  private _hiddenColumns: string[];

  private get _leaves() {
    return TableUtil.getColumnLeaves(this._column)?.filter(
      (_) => this._hiddenColumns.indexOf(_.name) < 0
    );
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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
