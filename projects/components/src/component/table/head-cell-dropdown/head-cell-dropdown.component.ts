import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding, HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {TableService} from '../service/table.service';
import {TableColumn} from '../contract/table-column';
import {FilterState} from '../../filter/contarct/filter-state';
import {StateUtil} from '../util/state-util';
import {ITreeData} from '../../../common/contract/i-tree-data';
import {IDictionary} from '../../../common/contract/i-dictionary';
import {IIdName} from '../../../common/contract/i-id-name';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {ArrayUtil} from '../../../common/util/array-util';
import {SortParam} from '../../filter/contarct/sort-param';

@Component({
  selector: 'teta-head-cell-dropdown',
  templateUrl: './head-cell-dropdown.component.html',
  styleUrls: ['./head-cell-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadCellDropdownComponent<T> implements OnInit, OnDestroy {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() dropDownOpen: boolean;
  @Output() dropDownOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() autosize: EventEmitter<void> = new EventEmitter<void>();
  @Output() autosizeAll: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.shadow-2') private readonly shadow = true;
  @HostBinding('class.bg-background-50') private readonly bg = true;

  dict: Observable<IDictionary<IIdName<any>[]>>;
  hiddenColumns: string[];

  @HostListener('keydown.enter') enter() {
    this.applyFilter();
  }

  get sortParam(): SortParam {
    return StateUtil.getSortState(this.state, this.column);
  }

  get filtered() {
    return StateUtil.isColumnFiltered(this.state, this.column);
  }

  get openItems() {
    if (this._openItems == null) {
      this._openItems = this.columns.map((_) => _);
    }
    return this._openItems;
  }

  set openItems(openItems: ITreeData[]) {
    this._openItems = openItems;
  }

  get childMode() {
    return this.columns.find((_: any) => _.columns?.length > 0);
  }

  private _openItems: ITreeData[];
  private _alive = true;

  constructor(private _svc: TableService<T>, private _cdr: ChangeDetectorRef) {
    this.dict = this._svc.dict;
    this._svc.hiddenColumns
      .pipe(
        takeWhile((_) => this._alive),
        map((_) => [..._])
      )
      .subscribe((_) => {
        this.hiddenColumns = _;
      });
  }

  clearFilter() {
    this._svc.clearFilter(this.column);
    this.dropDownOpenChange.emit(false);
    this._cdr.markForCheck();
  }

  applyFilter() {
    this._svc.setState(new FilterState(this.state));
    this.dropDownOpenChange.emit(false);
    this._cdr.markForCheck();
  }

  pinColumn() {
    this._svc.pinColumn(this.column);
  }

  clearSort(): void {
    this._svc.clearSort(this.column);
  }

  clearAllSort(): void {
    this._svc.clearAllSort();
  }

  hasFilteredColumns() {
    return StateUtil.hasFilteredColumns(this.state);
  }

  hasSortedColumns() {
    return StateUtil.hasSortedColumns(this.state);
  }

  restoreDefaultColumns() {
    this._svc.restoreDefaultColumns();
  }

  clearAllFilters() {
    this._svc.clearAllFilters();
    this.dropDownOpen = false;
    this._cdr.markForCheck();
  }

  columnIsHidden(column: TableColumn) {
    return this.hiddenColumns.indexOf(column.name) >= 0;
  }

  allColumnsVisible() {
    if (this.hiddenColumns?.length <= 0) {
      return true;
    }
    const columns = ArrayUtil.flatten(this.columns, 'columns');
    const notHidden = columns.find(
      (_) => this.hiddenColumns.indexOf(_.name) < 0
    );
    if (!notHidden) {
      return false;
    }
    return null;
  }

  setAllColumns(value: boolean) {
    if (value) {
      this.hiddenColumns = [];
    } else {
      this.hiddenColumns = ArrayUtil.flatten(this.columns, 'columns').map(
        (_) => _.name
      );
    }
  }

  setColumnsVisibility() {
    this._svc.setHiddenColumns(this.hiddenColumns);
  }

  compareItems = (item: TableColumn) => item.name;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  setColumnVisibility(item: TableColumn, visible: boolean) {
    this.setChildrenVisibility(item, visible, this.hiddenColumns);
    this.setParentsVisibility(item, visible, this.hiddenColumns);
  }

  setChildrenVisibility = (
    column: TableColumn,
    visible: boolean,
    hiddenColumns: string[]
  ) => {
    if (visible) {
      this.showColumn(column, hiddenColumns);
    } else {
      this.hideColumn(column, hiddenColumns);
    }
    if (column.columns) {
      column.columns.forEach((x) => {
        this.setChildrenVisibility(x, visible, hiddenColumns);
      });
    }
  };

  setParentsVisibility = (
    column: TableColumn,
    visible: boolean,
    hiddenColumns: string[]
  ) => {
    if (!visible) {
      this.hideParents(column, hiddenColumns);
    } else {
      this.showParents(column, hiddenColumns);
    }
  };

  showParents(column: TableColumn, hiddenColumns: string[]) {
    const parent = this.findParentColumn(column, this.columns as TableColumn[]);
    if (parent && this.columnIsHidden(parent)) {
      this.showColumn(parent, hiddenColumns);
      this.showParents(parent, hiddenColumns);
    }
  }

  hideParents(column: TableColumn, hiddenColumns: string[]) {
    const parent = this.findParentColumn(column, this.columns as TableColumn[]);
    if (
      parent &&
      !this.columnIsHidden(parent) &&
      parent.columns &&
      parent.columns.every((_) => this.columnIsHidden(_))
    ) {
      this.hideColumn(parent, hiddenColumns);
      this.hideParents(parent, hiddenColumns);
    }
  }

  hideColumn(column: TableColumn, hiddenColumns: string[]) {
    hiddenColumns.push(column.name);
  }

  showColumn(column: TableColumn, hiddenColumns: string[]) {
    hiddenColumns.splice(hiddenColumns.indexOf(column.name), 1);
  }

  private findParentColumn(
    column: TableColumn,
    columns: TableColumn[]
  ): TableColumn | null {
    return ArrayUtil.findRecursive(
      columns,
      (iterableNode) => iterableNode.columns?.indexOf(column) >= 0,
      'columns'
    );
  }
}
