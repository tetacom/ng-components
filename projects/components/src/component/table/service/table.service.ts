import { Injectable } from '@angular/core';
import objectHash from 'object-hash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { ArrayUtil } from '../../../common/util/array-util';
import { boolOrFuncCallback } from '../../../util/bool-or-func';
import { DateUtil } from '../../../util/date-util';
import { DateFilter } from '../../filter/contarct/date-filter';
import { DateFilterValue } from '../../filter/contarct/date-filter-value';
import { FilterState } from '../../filter/contarct/filter-state';
import { ListFilter } from '../../filter/contarct/list-filter';
import { NumericFilter } from '../../filter/contarct/numeric-filter';
import { NumericFilterValue } from '../../filter/contarct/numeric-filter-value';
import { StringFilter } from '../../filter/contarct/string-filter';
import { FilterType } from '../../filter/enum/filter-type.enum';
import { ListFilterType } from '../../filter/enum/list-filter-type.enum';
import { ColumnReorderEvent } from '../contract/column-reorder-event';
import { ColumnResizeEvent } from '../contract/column-resize-event';
import { ICellCoordinates } from '../contract/i-cell-coordinates';
import { ICellEvent } from '../contract/i-cell-event';
import {
  ICellInstance,
  ICellInstanceValue,
  IColumnRow,
} from '../contract/i-cell-instance';
import { ICellValue } from '../contract/i-cell-value';
import { SortEvent } from '../contract/sort-event';
import { TableColumn } from '../contract/table-column';
import { TableColumnStore } from '../contract/table-column-store';
import { TableRow } from '../contract/table-row';
import { EditEvent } from '../enum/edit-event.enum';
import { EditType } from '../enum/edit-type.enum';
import { SelectType } from '../enum/select-type.enum';
import { StateUtil } from '../util/state-util';

@Injectable({
  providedIn: 'root',
})
export class TableService<T> {
  columns: Observable<TableColumn[]>;
  displayData: Observable<TableRow<T>[]>;
  dict: Observable<IDictionary<IIdName<any>[]>>;
  filterOptions: Observable<IDictionary<IIdName<any>[]>>;
  state: Observable<FilterState>;
  selectType: SelectType = SelectType.mouse;
  editRowStart: Observable<ICellEvent | null>;
  editRowStop: Observable<ICellCoordinates | null>;
  editCellStart: Observable<ICellEvent | null>;
  editCellStop: Observable<ICellCoordinates | null>;
  valueChanged: Observable<ICellCoordinates | null>;
  valueSet: Observable<ICellValue>;
  stateChanged: Observable<FilterState>;
  filterClear: Observable<TableColumn>;
  selectedRows: Observable<T[]>;
  activeRow: Observable<T | null>;
  hiddenColumns: Observable<string[]>;
  scrollIndex: Observable<number>;

  editType: EditType = EditType.cell;
  editEvent: EditEvent = EditEvent.doubleClick;
  rowEditable?: boolean | ((row: T) => boolean);
  trackRow: (index: number, row: T) => any = (index: number, row: T) => {
    const rowId = (row as any)['id'];
    if (rowId) {
      return rowId;
    }
    return index;
  };

  get dragSource() {
    return this._dragSource;
  }

  private initialColumnsHash = '';
  private initialColumns: TableColumn[] = [];
  private displayColumns: TableColumn[] = [];
  private _columns: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
    TableColumn[]
  >([]);
  private _hiddenColumns = new BehaviorSubject<string[]>([]);
  private _displayData: BehaviorSubject<TableRow<T>[]> = new BehaviorSubject<
    TableRow<T>[]
  >([]);
  private _dict: BehaviorSubject<IDictionary<IIdName<any>[]>> =
    new BehaviorSubject<IDictionary<IIdName<any>[]>>({});
  private _filterOptions: BehaviorSubject<IDictionary<IIdName<any>[]>> =
    new BehaviorSubject<IDictionary<IIdName<any>[]>>({});
  private _state: BehaviorSubject<FilterState> =
    new BehaviorSubject<FilterState>(new FilterState());
  private _cookieName?: string;
  private _hiddenCookieName?: string;
  private _columnsCookieName?: string;
  private _editRowStart = new Subject<ICellEvent | null>();
  private _editRowStop = new Subject<ICellCoordinates | null>();
  private _editCellStart = new Subject<ICellEvent | null>();
  private _editCellStop = new Subject<ICellCoordinates | null>();
  private _valueChanged = new Subject<ICellCoordinates | null>();
  private _valueSet = new Subject<ICellValue>();
  private _stateChanged = new Subject<FilterState>();
  private _filterClear = new Subject<TableColumn>();
  private _dragSource?: TableColumn;
  private _selectedRows = new BehaviorSubject<T[]>([]);
  private _activeRow = new BehaviorSubject<T | null>(null);
  private _scrollIndex = new Subject<number | null>();

  private _currentEditCell?: ICellCoordinates;

  get currentEditCell() {
    return this._currentEditCell;
  }

  constructor() {
    this.columns = this._columns.asObservable();
    this.displayData = this._displayData.asObservable();
    this.dict = this._dict.asObservable();
    this.filterOptions = this._filterOptions.asObservable();
    this.state = this._state.asObservable();
    this.editRowStart = this._editRowStart.asObservable();
    this.editRowStop = this._editRowStop.asObservable();
    this.editCellStart = this._editCellStart.asObservable();
    this.editCellStop = this._editCellStop.asObservable();
    this.valueChanged = this._valueChanged.asObservable();
    this.valueSet = this._valueSet.asObservable();
    this.stateChanged = this._stateChanged.asObservable();
    this.filterClear = this._filterClear.asObservable();
    this.selectedRows = this._selectedRows.asObservable();
    this.activeRow = this._activeRow.asObservable();
    this.hiddenColumns = this._hiddenColumns.asObservable();
    this.scrollIndex = this._scrollIndex.asObservable();
  }

  setData(data: T[]): void {
    this._displayData.next(
      data?.map(
        item =>
          new TableRow<T>({
            data: item,
          })
      ) ?? []
    );
  }

  setDict(dict: IDictionary<IIdName<any>[]>): void {
    this._dict.next(dict);
  }

  setFilterOptions(filterOptions: IDictionary<IIdName<any>[]>): void {
    this._filterOptions.next(filterOptions);
  }

  setColumns(columns: TableColumn[]): void {
    this.initialColumns = columns ? columns.map(_ => new TableColumn(_)) : [];
    const excludeKeys = [
      'editable',
      'cellComponent',
      'headCellComponent',
      'headDropdownConfig',
    ];
    this.initialColumnsHash = objectHash(this.initialColumns, {
      algorithm: 'sha1',
      ignoreUnknown: true,
      excludeKeys: (key: string) => {
        return excludeKeys.indexOf(key) >= 0;
      },
    });
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
    if (this._columnsCookieName) {
      localStorage.setItem(
        this._columnsCookieName,
        JSON.stringify({
          hash: this.initialColumnsHash,
          columns: this.displayColumns.map(_ => new TableColumnStore(_)),
        })
      );
    }
  }

  clearColumnsState() {
    if (this._columnsCookieName) {
      localStorage.removeItem(this._columnsCookieName);
    }
  }

  setDisplayColumns(columns: TableColumn[]): void {
    this.displayColumns = columns ? columns.map(_ => new TableColumn(_)) : [];
    this._columns.next(this.displayColumns);
  }

  restoreColumns() {
    if (this._columnsCookieName) {
      const savedColumns = JSON.parse(
        localStorage.getItem(this._columnsCookieName)
      );
      if (savedColumns && savedColumns.hash === this.initialColumnsHash) {
        return this.restoreColumnsState(savedColumns.columns);
      }
    }
    return null;
  }

  restoreColumnsState(columns: TableColumnStore[]) {
    return columns.map((column: TableColumnStore) => {
      const found = ArrayUtil.findRecursive(
        this.initialColumns,
        item => item.name === column.name,
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
    if (this._cookieName) {
      state.save(this._cookieName);
    }
    this._state.next(state);
  }

  setCookieName(name: string): void {
    this._cookieName = name;
    this._hiddenCookieName = `${this._cookieName}_hidden_columns`;
    this._columnsCookieName = `${this._cookieName}_columns`;
  }

  restoreState(): void {
    let state: FilterState;
    if (
      this._cookieName &&
      this._cookieName?.length > 0 &&
      FilterState.restore(this._cookieName)
    ) {
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
    if (this._hiddenCookieName) {
      localStorage.setItem(
        this._hiddenCookieName,
        JSON.stringify(hiddenColumns)
      );
    }
  }

  restoreHiddenColumns(): void {
    const hiddenColumns =
      localStorage.getItem(this._hiddenCookieName ?? '') || '[]';
    this._hiddenColumns.next(JSON.parse(hiddenColumns));
  }

  sortAsc(sortEvent: SortEvent): void {
    if (sortEvent.column.sortable) {
      this.setState(StateUtil.sortAsc(sortEvent, this._state.value));
    }
  }

  sortDesc(sortEvent: SortEvent): void {
    if (sortEvent.column.sortable) {
      this.setState(StateUtil.sortDesc(sortEvent, this._state.value));
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
    const previous = flat.slice(0, index).filter(_ => _.flex > 0);
    if (previous?.length > 0) {
      const tableElement = this.getTableElement(element);
      previous.forEach((item: TableColumn) => {
        const itemCol = tableElement?.querySelector(
          `teta-head-cell[data-column="${item.name}"]`
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
    flat.forEach(col =>
      this.setColumnAutoWidth(col, tableElement as HTMLElement)
    );
    this._columns.next(this.displayColumns);
    this.saveColumnsState();
  }

  reorderColumn(column: TableColumn, insertBefore: boolean): void {
    if (!this._dragSource) {
      return;
    }
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

  getColumnParent(column: TableColumn) {
    return this.findParentColumn(column, this.displayColumns);
  }

  startEditRow(cellEvent: ICellEvent): void {
    if (this._currentEditCell?.row !== cellEvent?.row) {
      if (this._currentEditCell != null) {
        this._editRowStop.next(this._currentEditCell);
      }
      if (cellEvent === null) {
        this._editRowStart.next(cellEvent);
        this._currentEditCell = cellEvent;
      } else {
        if (
          boolOrFuncCallback<T>(!!this.rowEditable)(
            this.getRowByIndex(cellEvent?.row)?.data
          )
        ) {
          this._editRowStart.next(cellEvent);
          this._currentEditCell = cellEvent;
        }
      }
    }
  }

  startEditCell(cellEvent: ICellEvent): void {
    if (
      this._currentEditCell?.column !== cellEvent?.column ||
      this._currentEditCell?.row !== cellEvent?.row
    ) {
      if (this._currentEditCell != null) {
        this._editCellStop.next(this._currentEditCell);
      }
      const column = this.getColumnByName(cellEvent?.column);
      if (
        boolOrFuncCallback<IColumnRow<T>>(column?.editable)({
          row: this.getRowByIndex(cellEvent?.row)?.data,
          column: column,
        })
      ) {
        this._editCellStart.next(cellEvent);
        this._currentEditCell = cellEvent;
        const key = (cellEvent?.event as KeyboardEvent)?.key;
        if (
          key &&
          (key.length === 1 || (key === 'Delete' && !column.required))
        ) {
          this.clearValue(cellEvent);
        }
      }
    }
  }

  setActiveRow(row: T): void {
    this._activeRow.next(row);
  }

  selectRows(rows: T[]): void {
    this._selectedRows.next(rows);
  }

  selectOrDeselectRow(row: T): void {
    if (this._selectedRows.value.indexOf(row) >= 0) {
      this._selectedRows.next(this._selectedRows.value.filter(_ => _ !== row));
    } else {
      this._selectedRows.next([...this._selectedRows.value, row]);
    }
  }

  selectRange(row: T): void {
    const index = this._displayData.value.findIndex(_ => _.data === row);
    let minIndex = this._selectedRows.value.reduce((prev, curr) => {
      const newIndex = this._displayData.value.findIndex(_ => _.data === curr);
      if (newIndex < prev) {
        return newIndex;
      }
      return prev;
    }, this._displayData.value.length);
    let maxIndex = this._selectedRows.value.reduce((prev, curr) => {
      const newIndex = this._displayData.value.findIndex(_ => _.data === curr);
      if (newIndex > prev) {
        return newIndex;
      }
      return prev;
    }, 0);
    if (index > maxIndex) {
      maxIndex = index;
    }
    if (index < minIndex) {
      minIndex = index;
    }
    if (minIndex < index && index < maxIndex) {
      maxIndex = index;
    }
    this._selectedRows.next([
      ...this._displayData.value.slice(minIndex, maxIndex + 1).map(_ => _.data),
    ]);
  }

  selectRow(row: T): void {
    if (this.selectType === SelectType.none) {
      return;
    }
    this._selectedRows.next([...this._selectedRows.value, row]);
  }

  deselectRow(row: T): void {
    if (this.selectType === SelectType.none) {
      return;
    }
    this._selectedRows.next(this._selectedRows.value.filter(_ => _ !== row));
  }

  selectAll() {
    this._selectedRows.next(this._displayData.value.map(_ => _.data));
  }

  deselectAll() {
    this._selectedRows.next([]);
  }

  allRowsSelected(): boolean | null {
    if (
      this._displayData.value?.length &&
      this._selectedRows.value?.length &&
      this._displayData.value.every(
        _ =>
          this._selectedRows.value.findIndex(selected => selected === _.data) >=
          0
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

  changeValue(coordinates: ICellCoordinates): void {
    this._valueChanged.next(coordinates);
  }

  setValue(cellValue: ICellValue): void;
  setValue(cellValue: ICellInstanceValue<T>): void;
  setValue(cellValue: ICellValue | ICellInstanceValue<T>): void {
    let value: ICellValue;
    if (
      typeof cellValue.row === 'object' &&
      typeof cellValue.column === 'object'
    ) {
      value = {
        row: this.getRowIndex(cellValue.row.data),
        column: cellValue.column.name,
        value: cellValue.value,
      };
    } else {
      value = cellValue as ICellValue;
    }
    this._valueSet.next(value);
  }

  getRowByIndex(rowIndex?: number): TableRow<T> | undefined {
    if (rowIndex !== null && rowIndex !== undefined) {
      return this._displayData?.value[rowIndex];
    }
    return undefined;
  }

  getRowIndex(row: T) {
    return this._displayData.value.findIndex(_ => _.data === row);
  }

  getEventCell(event: Event): HTMLElement | null {
    return event.composedPath().find((target: any) => {
      return target.tagName?.toLowerCase() === 'teta-cell';
    }) as HTMLElement;
  }

  getEventRow(event: Event): HTMLElement | null {
    return event.composedPath().find((target: any) => {
      return target?.getAttribute && target?.getAttribute('data-row');
    }) as HTMLElement;
  }

  getNextEditableCell(coords: ICellCoordinates): ICellCoordinates | null {
    const nextCell = this.getNextCell(coords);
    if (!nextCell) {
      return null;
    }
    const column = this.getColumnByName(nextCell?.column);
    if (
      boolOrFuncCallback<ICellInstance<T>>(column.editable)({
        row: this.getRowByIndex(nextCell.row),
        column,
      })
    ) {
      return nextCell;
    }
    return this.getNextEditableCell(nextCell);
  }

  getPreviousEditableCell(coords: ICellCoordinates): ICellCoordinates | null {
    const prevCell = this.getPreviousCell(coords);
    if (!prevCell) {
      return null;
    }
    const column = this.getColumnByName(prevCell?.column);
    if (
      boolOrFuncCallback<ICellInstance<T>>(column.editable)({
        row: this.getRowByIndex(prevCell.row),
        column,
      })
    ) {
      return prevCell;
    }
    return this.getPreviousEditableCell(prevCell);
  }

  getNextCell(coords: ICellCoordinates): ICellCoordinates | null {
    const columns = this.getFlatColumns();
    let colIndex = columns.findIndex(
      (col: TableColumn) => col.name === coords?.column
    );
    let rowIndex = coords?.row;
    if (colIndex >= 0 && rowIndex >= 0) {
      if (colIndex === columns.length - 1) {
        colIndex = 0;
        rowIndex = rowIndex + 1;
      } else {
        colIndex = colIndex + 1;
      }
      return {
        column: columns[colIndex]?.name,
        row: rowIndex,
      };
    }
    return null;
  }

  getPreviousCell(coords: ICellCoordinates): ICellCoordinates | null {
    const columns = this.getFlatColumns();
    let colIndex = columns.findIndex(
      (col: TableColumn) => col.name === coords?.column
    );
    let rowIndex = coords?.row;
    if (colIndex >= 0 && rowIndex >= 0) {
      if (colIndex === 0) {
        colIndex = columns.length - 1;
        rowIndex = rowIndex - 1;
      } else {
        colIndex = colIndex - 1;
      }
      return {
        column: columns[colIndex]?.name,
        row: rowIndex,
      };
    }
    return null;
  }

  getNextRowCell(coords: ICellCoordinates): ICellCoordinates | null {
    const columns = this.getFlatColumns();
    const colIndex = columns.findIndex(
      (col: TableColumn) => col.name === coords?.column
    );
    const rowIndex = coords?.row;
    if (
      colIndex >= 0 &&
      rowIndex >= 0 &&
      rowIndex < this._displayData.value.length - 1
    ) {
      return {
        column: columns[colIndex]?.name,
        row: rowIndex + 1,
      };
    }
    return null;
  }

  getPreviousRowCell(coords: ICellCoordinates) {
    const columns = this.getFlatColumns();
    const colIndex = columns.findIndex(
      (col: TableColumn) => col.name === coords?.column
    );
    const rowIndex = coords?.row;
    if (colIndex >= 0 && rowIndex > 1) {
      return {
        column: columns[colIndex]?.name,
        row: rowIndex - 1,
      };
    }
    return null;
  }

  getColumnByName(columnName: string) {
    return ArrayUtil.findRecursive(
      this.displayColumns,
      iterableNode => columnName === iterableNode.name,
      'columns'
    );
  }

  scrollToIndex(index: number) {
    this._scrollIndex.next(null);
    this._scrollIndex.next(index);
  }

  getVisibleColumns() {
    const visible = ArrayUtil.flatten(
      this._columns.value,
      'columns',
      true
    ).filter(_ => this._hiddenColumns.value.indexOf(_.name) < 0);
    return visible.sort((a, b) => Number(b.locked) - Number(a.locked));
  }

  getCellInstance(coords: ICellCoordinates): ICellInstance<T> | null {
    return coords
      ? {
          row: this.getRowByIndex(coords.row),
          column: this.getColumnByName(coords.column),
        }
      : null;
  }

  private getFlatColumns() {
    return ArrayUtil.flatten(this.displayColumns, 'columns', true).sort(
      (a, b) => Number(b.locked) - Number(a.locked)
    );
  }

  private findParent(
    column: TableColumn,
    columns: TableColumn[]
  ): TableColumn[] | null {
    const found = columns.find(x => x.name === column.name);
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

  private findParentColumn(
    column: TableColumn,
    columns: TableColumn[]
  ): TableColumn | null {
    const found = columns.find(x => x.columns.indexOf(column) >= 0);
    if (found !== null && found !== undefined) {
      return found;
    }
    for (let i = 0, l = columns.length; i < l; i++) {
      const col = columns[i];
      if (col.columns && col.columns.length) {
        const result = this.findParentColumn(column, col.columns);
        if (result !== null && result !== undefined) {
          return result;
        }
      }
    }
    return null;
  }

  getTableElement(element: HTMLElement) {
    return element.closest('teta-table');
  }

  private setColumnAutoWidth(column: TableColumn, table: HTMLElement) {
    const cells = table.querySelectorAll(
      `teta-cell[data-column="${column.name}"] .cell-text`
    );
    let maxWidth = 0;
    cells.forEach(cell => {
      if (cell.scrollWidth > maxWidth) {
        maxWidth = cell.scrollWidth;
      }
    });
    const aggCells = table.querySelectorAll(
      `.aggregate-cell[data-column="${column.name}"] .cell-text`
    );
    aggCells?.forEach(cell => {
      if (cell.scrollWidth > maxWidth) {
        maxWidth = cell.scrollWidth;
      }
    });
    column.flex = 0;
    column.width = maxWidth + 20;
  }

  private clearValue(event: ICellEvent) {
    this.setValue({
      ...event,
      value: null,
    });
  }
}
