import { Injectable } from '@angular/core';
import { TableRow } from '../contract/table-row';
import { ICellCoordinates } from '../contract/i-cell-coordinates';
import { TableColumn } from '../contract/table-column';
import { FilterState } from '../../filter/contarct/filter-state';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ColumnResizeEvent } from '../contract/column-resize-event';
import { ColumnReorderEvent } from '../contract/column-reorder-event';
import { SortEvent } from '../contract/sort-event';
import { ArrayUtil } from '../../../common/util/array-util';
import { StateUtil } from '../util/state-util';
import { SelectType } from '../enum/select-type.enum';
import { EditType } from '../enum/edit-type.enum';
import { EditEvent } from '../enum/edit-event.enum';
import { ListFilterType } from '../../filter/enum/list-filter-type.enum';
import { ListFilter } from '../../filter/contarct/list-filter';
import { FilterType } from '../../filter/enum/filter-type.enum';
import { NumericFilterValue } from '../../filter/contarct/numeric-filter-value';
import { NumericFilter } from '../../filter/contarct/numeric-filter';
import { StringFilter } from '../../filter/contarct/string-filter';
import { DateFilterValue } from '../../filter/contarct/date-filter-value';
import { DateFilter } from '../../filter/contarct/date-filter';
import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { DateUtil } from '../../../util/date-util';
import * as hash from 'object-hash';
import { TableColumnStore } from '../contract/table-column-store';
import { ICellValue } from '../contract/i-cell-value';

@Injectable({
  providedIn: 'root',
})
export class TableService<T> {
  columns: Observable<TableColumn[]>;
  displayData: Observable<TableRow<T>[]>;
  dict: Observable<IDictionary<IIdName<any>[]>>;
  state: Observable<FilterState>;
  selectType: SelectType;
  editRowStart: Observable<ICellCoordinates<T>>;
  editRowStop: Observable<ICellCoordinates<T>>;
  editCellStart: Observable<ICellCoordinates<T>>;
  editCellStop: Observable<ICellCoordinates<T>>;
  valueChanged: Observable<ICellCoordinates<T>>;
  valueSet: Observable<ICellValue<T>>;
  stateChanged: Observable<FilterState>;
  filterClear: Observable<TableColumn>;
  groupToggle: Observable<TableRow<T>>;
  selectedRows: Observable<TableRow<T>[]>;
  activeRow: Observable<TableRow<T>>;
  hiddenColumns: Observable<string[]>;
  scrollIndex: Observable<number>;

  editType: EditType;
  editEvent: EditEvent;
  rowEditable: boolean | ((row: TableRow<T>) => boolean);
  cellEditable: boolean | ((row: ICellCoordinates<T>) => boolean);

  get dragSource() {
    return this._dragSource;
  }

  private initialColumns: TableColumn[] = [];
  private displayColumns: TableColumn[] = [];
  private _columns: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
    TableColumn[]
  >([]);
  private initialData: TableRow<T>[] = [];
  private _displayData: BehaviorSubject<TableRow<T>[]> = new BehaviorSubject<
    TableRow<T>[]
  >([]);
  private _dict: BehaviorSubject<IDictionary<IIdName<any>[]>> =
    new BehaviorSubject<IDictionary<IIdName<any>[]>>({});
  private _state: BehaviorSubject<FilterState> =
    new BehaviorSubject<FilterState>(new FilterState());
  private _cookieName: string;
  private _hiddenCookieName: string;
  private _columnsCookieName: string;
  private _editRowStart = new Subject<ICellCoordinates<T> | null>();
  private _editRowStop = new Subject<ICellCoordinates<T> | null>();
  private _editCellStart = new Subject<ICellCoordinates<T> | null>();
  private _editCellStop = new Subject<ICellCoordinates<T> | null>();
  private _valueChanged = new Subject<ICellCoordinates<T> | null>();
  private _valueSet = new Subject<ICellValue<T>>();
  private _stateChanged = new Subject<FilterState>();
  private _filterClear = new Subject<TableColumn>();
  private _dragSource: TableColumn;
  private _groupToggle = new Subject<TableRow<T>>();
  private _selectedRows = new BehaviorSubject<TableRow<T>[]>([]);
  private _activeRow = new BehaviorSubject<TableRow<T>>(null);
  private _hiddenColumns = new BehaviorSubject<string[]>([]);
  private _scrollIndex = new Subject<number>();

  private _currentEditRow: ICellCoordinates<T>;
  private _currentEditCell: ICellCoordinates<T>;

  constructor() {
    this.columns = this._columns.asObservable();
    this.displayData = this._displayData.asObservable();
    this.dict = this._dict.asObservable();
    this.state = this._state.asObservable();
    this.editRowStart = this._editRowStart.asObservable();
    this.editRowStop = this._editRowStop.asObservable();
    this.editCellStart = this._editCellStart.asObservable();
    this.editCellStop = this._editCellStop.asObservable();
    this.valueChanged = this._valueChanged.asObservable();
    this.valueSet = this._valueSet.asObservable();
    this.stateChanged = this._stateChanged.asObservable();
    this.filterClear = this._filterClear.asObservable();
    this.groupToggle = this._groupToggle.asObservable();
    this.selectedRows = this._selectedRows.asObservable();
    this.activeRow = this._activeRow.asObservable();
    this.hiddenColumns = this._hiddenColumns.asObservable();
    this.scrollIndex = this._scrollIndex.asObservable();
  }

  setData(data: T[]): void {
    this.initialData = data?.map((_) => new TableRow<T>(_));
    this._displayData.next(this.initialData);
  }

  setDict(dict: IDictionary<IIdName<any>[]>): void {
    this._dict.next(dict);
  }

  setColumns(columns: TableColumn[]): void {
    this.initialColumns = columns ? columns.map((_) => new TableColumn(_)) : [];
    const restored = this.restoreColumns();

    if (restored) {
      this.setDisplayColumns(restored);
    } else {
      this.setDisplayColumns(this.initialColumns);
    }
  }

  restoreDefaultColumns() {
    this.setDisplayColumns(this.initialColumns);
    this.clearColumnsState();
  }

  updateColumns(columns: TableColumn[]): void {
    this.setDisplayColumns(columns);
    this.saveColumnsState();
  }

  saveColumnsState() {
    if (this._cookieName) {
      localStorage.setItem(
        this._columnsCookieName,
        JSON.stringify({
          hash: hash.sha1(this.initialColumns),
          columns: this.displayColumns.map((_) => new TableColumnStore(_)),
        })
      );
    }
  }

  clearColumnsState() {
    localStorage.removeItem(this._columnsCookieName);
  }

  setDisplayColumns(columns: TableColumn[]): void {
    this.displayColumns = columns ? columns.map((_) => new TableColumn(_)) : [];
    this._columns.next(this.displayColumns);
  }

  restoreColumns() {
    const savedColumns = JSON.parse(
      localStorage.getItem(this._columnsCookieName)
    );
    if (savedColumns && savedColumns.hash === hash.sha1(this.initialColumns)) {
      return this.restoreColumnsState(savedColumns.columns);
    }
    return null;
  }

  restoreColumnsState(columns: TableColumnStore[]) {
    return columns.map((column: TableColumnStore) => {
      const found = ArrayUtil.findRecursive(
        this.initialColumns,
        (item) => item.name === column.name,
        'columns'
      );
      const resultColumn = new TableColumn(found);
      resultColumn.width = column.width;
      resultColumn.flex = column.flex;
      resultColumn.locked = column.locked;
      if (column.columns?.length > 0) {
        resultColumn.columns = this.restoreColumnsState(column.columns);
      }
      return resultColumn;
    });
  }

  setState(state: FilterState): void {
    state.save(this._cookieName);
    this._state.next(state);
  }

  setCookieName(name: string): void {
    this._cookieName = name;
    this._hiddenCookieName = `${this._cookieName}_hidden_columns`;
    this._columnsCookieName = `${this._cookieName}_columns`;
  }

  restoreState(): void {
    let state: FilterState;
    if (this._cookieName?.length > 0 && FilterState.restore(this._cookieName)) {
      let newState = Object.assign(
        this._state.value,
        FilterState.restore(this._cookieName)
      );
      newState = DateUtil.convertDateStringsToDates(newState);
      state = new FilterState(newState);
    } else {
      state = new FilterState();
    }
    this.setState(state);
  }

  saveHiddenColumns(hiddenColumns: string[]): void {
    localStorage.setItem(this._hiddenCookieName, JSON.stringify(hiddenColumns));
  }

  restoreHiddenColumns(): void {
    const hiddenColumns = localStorage.getItem(this._hiddenCookieName) || '[]';
    this._hiddenColumns.next(JSON.parse(hiddenColumns));
  }

  sort(sortEvent: SortEvent): void {
    if (sortEvent.column.sortable) {
      this.setState(StateUtil.sortColumn(sortEvent, this._state.value));
    }
  }

  clearSort(column: TableColumn): void {
    this.setState(StateUtil.clearSort(column, this._state.value));
  }

  clearAllSort(): void {
    this.setState(StateUtil.clearAllSort(this._state.value));
  }

  clearFilter(column: TableColumn) {
    const state = this._state.value;
    if (column !== null && column !== undefined && column.filterable) {
      switch (column.filterType) {
        case FilterType.date:
          state.addDateFilter(
            new DateFilter({
              name: column.name,
              field: column.filterField,
              value: new DateFilterValue(),
            })
          );
          break;
        case FilterType.string:
          state.addStringFilter(
            new StringFilter({
              name: column.name,
              field: column.filterField,
              value: '',
            })
          );
          break;
        case FilterType.number:
          state.addNumericFilter(
            new NumericFilter({
              name: column.name,
              field: column.filterField,
              value: new NumericFilterValue(),
            })
          );
          break;
        case FilterType.list:
          state.addListFilter(
            new ListFilter({
              name: column.name,
              field: column.filterField,
              value: [],
              type: ListFilterType.None,
            })
          );
          break;
      }
      this.setState(new FilterState(state));
    }
  }

  clearAllFilters() {
    const state = this._state.value;
    state.stringFilters = [];
    state.listFilters = [];
    state.numericFilters = [];
    state.dateFilters = [];
    this.setState(new FilterState(state));
  }

  pinColumn(column: TableColumn): void {
    this.displayColumns.forEach((col: TableColumn) => {
      if (col.name === column.name) {
        col.locked = !col.locked;
      }
    });
    this.updateColumns(this.displayColumns);
  }

  dragStart(column: TableColumn): void {
    this._dragSource = column;
  }

  lockPreviousColumns(column: TableColumn, element: HTMLElement) {
    const flat = ArrayUtil.flatten(this.displayColumns, 'columns', true).sort(
      (a, b) => Number(b.locked) - Number(a.locked)
    );
    const index = flat.indexOf(column);
    const previous = flat.slice(0, index).filter((_) => _.flex > 0);
    if (previous?.length > 0) {
      const tableElement = this.getTableElement(element);
      previous.forEach((item: TableColumn) => {
        const itemCol = tableElement.querySelector(
          `teta-head-cell[data-column=${item.name}]`
        ) as HTMLElement;
        if (itemCol) {
          item.flex = 0;
          item.width = itemCol.clientWidth;
        }
      });
    }
  }

  resizeColumn(event: ColumnResizeEvent) {
    if (event.column !== null && event.column !== undefined) {
      event.column.width = event.newWidth < 50 ? 50 : event.newWidth;
      event.column.flex = 0;
    }
    this._columns.next(this.displayColumns);
    this.saveColumnsState();
  }

  autosizeColumn(column: TableColumn, target: HTMLElement) {
    const tableElement = this.getTableElement(target);
    this.setColumnAutoWidth(column, tableElement as HTMLElement);
    this._columns.next(this.displayColumns);
    this.saveColumnsState();
  }

  autosizeAllColumns(target: HTMLElement) {
    const tableElement = this.getTableElement(target);
    const flat = ArrayUtil.flatten(this.displayColumns, 'columns', true);
    flat.forEach((col) =>
      this.setColumnAutoWidth(col, tableElement as HTMLElement)
    );
    this._columns.next(this.displayColumns);
    this.saveColumnsState();
  }

  reorderColumn(column: TableColumn, insertBefore: boolean): void {
    const event = new ColumnReorderEvent(this._dragSource, column);
    if (event.source !== event.target) {
      const sourceParent = this.findParent(event.source, this.displayColumns);
      const targetParent = this.findParent(event.target, this.displayColumns);

      if (sourceParent && targetParent) {
        const sourceIndex = sourceParent.indexOf(event.source);
        sourceParent.splice(sourceIndex, 1);
        let targetIndex = targetParent.indexOf(event.target);
        if (!insertBefore) {
          targetIndex = targetIndex + 1;
        }
        targetParent.splice(targetIndex, 0, event.source);
        event.source.locked = event.target.locked;

        this.updateColumns(this.displayColumns);
      }
    }
  }

  startEditRow(cellCoordinates: ICellCoordinates<T>): void {
    if (this._currentEditRow?.row !== cellCoordinates?.row) {
      if (this._currentEditRow != null) {
        this._editRowStop.next(this._currentEditRow);
      }
      if (cellCoordinates === null) {
        this._editRowStart.next(cellCoordinates);
        this._currentEditRow = cellCoordinates;
      } else {
        if (
          this.boolOrFuncCallback<TableRow<T>>(this.rowEditable)(
            cellCoordinates.row
          )
        ) {
          this._editRowStart.next(cellCoordinates);
          this._currentEditRow = cellCoordinates;
        }
      }
    }
  }

  startEditCell(cellCoordinates: ICellCoordinates<T>): void {
    if (
      this._currentEditCell?.column.name !== cellCoordinates?.column.name ||
      this._currentEditCell?.row !== cellCoordinates?.row
    ) {
      if (this._currentEditCell != null) {
        this._editCellStop.next(this._currentEditCell);
      }
      if (
        this.boolOrFuncCallback<ICellCoordinates<T>>(this.cellEditable)(
          cellCoordinates
        )
      ) {
        this._editCellStart.next(cellCoordinates);
        this._currentEditCell = cellCoordinates;
      }
    }
  }

  setActiveRow(row: TableRow<T>): void {
    this._activeRow.next(row);
  }

  selectRows(rows: TableRow<T>[]): void {
    this._selectedRows.next(rows);
  }

  selectRow(row: TableRow<T>): void {
    if (this.selectType === SelectType.none) {
      return;
    }
    if (this.selectType === SelectType.single) {
      this._selectedRows.next([row]);
    } else {
      this._selectedRows.next([...this._selectedRows.value, row]);
    }
  }

  deselectRow(row: TableRow<T>): void {
    if (this.selectType === SelectType.none) {
      return;
    }
    if (this.selectType === SelectType.single) {
      this._selectedRows.next([]);
    } else {
      this._selectedRows.next(
        this._selectedRows.value.filter((_) => _ !== row)
      );
    }
  }

  selectAll() {
    this._selectedRows.next(this._displayData.value);
  }

  deselectAll() {
    this._selectedRows.next([]);
  }

  allRowsSelected(): boolean | null {
    if (
      this._displayData.value?.length &&
      this._selectedRows.value?.length &&
      this._displayData.value.every(
        (_) => this._selectedRows.value.indexOf(_) >= 0
      )
    ) {
      return true;
    } else if (
      this._selectedRows.value == null ||
      this._selectedRows.value.length === 0
    ) {
      return false;
    }
    return null;
  }

  setHiddenColumns(value: string[]) {
    this.saveHiddenColumns(value);
    this._hiddenColumns.next(value);
  }

  columnIsHidden(column: TableColumn) {
    return this._hiddenColumns.value.indexOf(column.name) >= 0;
  }

  toggleGroup(row: TableRow<T>): void {
    this._groupToggle.next(row);
  }

  changeValue(coordinates: ICellCoordinates<T>): void {
    this._valueChanged.next(coordinates);
  }

  setValue(cellValue: ICellValue<T>): void {
    this._valueSet.next(cellValue);
  }

  getRowByIndex(rowIndex: string) {
    return this._displayData.value[parseInt(rowIndex, 10)];
  }

  getColumnByName(columnName: string) {
    return ArrayUtil.findRecursive(
      this.displayColumns,
      (iterableNode) => columnName === iterableNode.name,
      'columns'
    );
  }

  scrollToIndex(index: number) {
    this._scrollIndex.next(null);
    this._scrollIndex.next(index);
  }

  boolOrFuncCallback<M>(variable: boolean | ((row: M) => boolean)) {
    return (args: M) => {
      if (typeof variable === 'boolean') {
        return variable;
      } else if (this.isFunction(variable)) {
        return (variable as (row: M) => boolean)(args);
      }
      return true;
    };
  }

  private findParent(
    column: TableColumn,
    columns: TableColumn[]
  ): TableColumn[] | null {
    const found = columns.find((x) => x.name === column.name);
    if (found !== null && found !== undefined) {
      return columns;
    }
    for (let i = 0, l = columns.length; i < l; i++) {
      const col = columns[i];
      if (col.columns && col.columns.length) {
        const result = this.findParent(column, col.columns);
        if (result !== null && result !== undefined) {
          return result;
        }
      }
    }
    return null;
  }

  private getTableElement(element: HTMLElement) {
    return element.closest('teta-table');
  }

  private isFunction(obj: any) {
    return !!(obj && obj?.constructor && obj?.call && obj?.apply);
  }

  private setColumnAutoWidth(column: TableColumn, table: HTMLElement) {
    const cells = table.querySelectorAll(
      `teta-cell[data-column=${column.name}] .cell-text`
    );
    let maxWidth = 0;
    cells.forEach((cell) => {
      if (cell.scrollWidth > maxWidth) {
        maxWidth = cell.scrollWidth;
      }
    });
    column.flex = 0;
    column.width = maxWidth > 50 ? maxWidth + 10 : 50;
  }
}
