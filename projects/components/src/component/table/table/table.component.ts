import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges, TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import {TableRow} from '../contract/table-row';
import {TableService} from '../service/table.service';
import {TableColumn} from '../contract/table-column';
import {FilterState} from '../../filter/contarct/filter-state';
import {DetailComponentBase} from '../base/detail-component-base';
import {ICellEvent} from '../contract/i-cell-event';
import {ICellCoordinates} from '../contract/i-cell-coordinates';
import {GroupRowComponentBase} from '../base/group-row-component-base';
import {GroupRowComponent} from '../default/group-row/group-row.component';
import {filter, takeWhile, withLatestFrom} from 'rxjs/operators';
import {EditType} from '../enum/edit-type.enum';
import {EditEvent} from '../enum/edit-event.enum';
import {SelectType} from '../enum/select-type.enum';
import {IIdName} from '../../../common/contract/i-id-name';
import {IDictionary} from '../../../common/contract/i-dictionary';
import {of} from 'rxjs';
import {ArrayUtil} from '../../../common/util/array-util';
import {FilterType} from '../../filter/enum/filter-type.enum';
import {TableContextMenuConfig} from '../contract/table-context-menu-config';

@Component({
  selector: 'teta-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableService],
})
export class TableComponent<T>
  implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() dict: IDictionary<IIdName<any>[]>;
  @Input() filterOptions: IDictionary<IIdName<any>[]>;

  @Input()
  set state(state: FilterState) {
    this._state = state;
  }

  @Input() cookieName: string;
  @Input() virtual: boolean;
  @Input() detailComponent: Type<DetailComponentBase<T>>;
  @Input() activeRow: TableRow<T>;
  @Input() selectedRows: TableRow<T>[];
  @Input() selectType: SelectType = SelectType.none;
  @Input() aggregate: boolean;
  @Input() grouping: boolean;
  @Input() groupRowComponent: Type<GroupRowComponentBase<T>> =
    GroupRowComponent;
  @Input() openLevels: number;
  @Input() tree: boolean;
  @Input() trackBy: (row: TableRow<T>) => any;
  @Input() editType: EditType;
  @Input() editEvent: EditEvent;
  @Input() rowEditable: boolean | ((row: TableRow<T>) => boolean);
  @Input() rowClass: (row: TableRow<T>, index?: number) => string;

  @Input() set scrollToIndex(index: number) {
    this._svc.scrollToIndex(index);
  }

  @Input() contextMenuConfig: TableContextMenuConfig =
    new TableContextMenuConfig();

  @Input() showHeadCellMenu = true;
  @Input() contextMenu: TemplateRef<any>;

  @Output()
  stateChange: EventEmitter<FilterState> = new EventEmitter<FilterState>();
  @Output() bodyLeft = new EventEmitter<TableRow<T>>();
  @Output() activeRowChange: EventEmitter<TableRow<T>> = new EventEmitter();
  @Output() selectedRowsChange: EventEmitter<TableRow<T>[]> =
    new EventEmitter();
  @Output() cellClick = new EventEmitter<ICellEvent<T>>();
  @Output() cellDoubleClick = new EventEmitter<ICellEvent<T>>();
  @Output() cellFocus = new EventEmitter<ICellEvent<T>>();
  @Output() cellKeyDown = new EventEmitter<ICellEvent<T>>();

  @Output() rowLeft = new EventEmitter<TableRow<T>>();

  @Output() rowEditStart = new EventEmitter<ICellEvent<T>>();
  @Output() rowEditEnd = new EventEmitter<TableRow<T>>();
  @Output() cellEditStart = new EventEmitter<ICellEvent<T>>();
  @Output() cellEditEnd = new EventEmitter<ICellCoordinates<T>>();

  @Output() valueChange = new EventEmitter<ICellCoordinates<T>>();

  @Output() pasteRows = new EventEmitter<any[]>();
  @Output() addRow = new EventEmitter<void>();
  @Output() deleteRows = new EventEmitter<TableRow<T>[]>();
  @Output() tableService = new EventEmitter<TableService<T>>();

  @ViewChild('contextMenu', {static: true}) menu: ElementRef;
  @HostBinding('class.table') private readonly tableClass = true;

  showContextMenu: boolean;
  selectedRowsList: TableRow<T>[];
  contextMenuTarget: ICellCoordinates<T>;

  private _alive = true;
  private _bodyElement: HTMLElement;
  private _headElement: HTMLElement;

  private _state: FilterState;

  constructor(private _svc: TableService<T>, private _elementRef: ElementRef) {
    this._svc.state
      .pipe(
        takeWhile((_) => this._alive),
        filter((state) => state !== this._state)
      )
      .subscribe((state: FilterState) => this.stateChange.next(state));

    this._svc.editCellStart
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellEvent<T>) => this.cellEditStart.emit(item));

    this._svc.editCellStop
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellCoordinates<T>) => this.cellEditEnd.emit(item));

    this._svc.editRowStart
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellEvent<T>) =>
        this.rowEditStart.emit(item)
      );

    this._svc.editRowStop
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellCoordinates<T>) =>
        this.rowEditEnd.emit(item?.row)
      );

    this._svc.selectedRows
      .pipe(takeWhile((_) => this._alive))
      .subscribe((items: TableRow<T>[]) => {
        this.selectedRowsList = items;
        this.selectedRowsChange.emit(items);
      });

    this._svc.activeRow
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: TableRow<T>) => this.activeRowChange.emit(item));

    this._svc.valueChanged
      .pipe(takeWhile((_) => this._alive))
      .subscribe((coordinates: ICellCoordinates<T>) => {
        this.valueChange.emit(coordinates);
      });
  }

  @HostListener('document:click', ['$event']) handleClickOutsideAnyRow(
    event: MouseEvent
  ) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellClick.emit(coordinates);
      if (this.editEvent === EditEvent.click) {
        this.startEditRowOrCell(coordinates);
      } else {
        if (this._svc.currentEditCell
          && (coordinates.row !== this._svc.currentEditCell.row
            || coordinates.column.name !== this._svc.currentEditCell.column.name)) {
          this.startEditRowOrCell(null);
        }
      }
    }
    const row = this.getRow(event);
    if (row) {
      if (event.ctrlKey) {
        this._svc.selectOrDeselectRow(row);
      }
      if (event.shiftKey) {
        this._svc.selectRange(row);
      }
    }
    if (!this.eventIsOnRow(event) && !event.defaultPrevented) {
      this._svc.startEditRow(null);
    }
  }

  @HostListener('focusin', ['$event']) focusIn(event: any) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellFocus.emit(coordinates);
      if (this.editEvent === EditEvent.focus) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  @HostListener('dblclick', ['$event'])
  dblclick(event: MouseEvent) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellDoubleClick.emit(coordinates);
      if (this.editEvent === EditEvent.doubleClick) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this._svc.startEditRow(null);
      this._svc.startEditCell(null);
    }
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellKeyDown.emit(coordinates);
      if (event.key && (event.key.length === 1 || event.key === 'Delete')) {
        this._svc.startEditCell({
          row: coordinates.row,
          column: coordinates.column,
          event: event
        });
      }
      if (event.key === 'Tab' && this._svc.currentEditCell) {
        event.preventDefault();
        let target = this._svc.getNextEditableCell(coordinates);
        if (event.shiftKey) {
          target = this._svc.getPreviousEditableCell(coordinates);
        }
        if (target && target.row && target.column) {
          this._svc.startEditCell({
            row: target.row,
            column: target.column,
            event: undefined
          });
        }
      }
      if (!this._svc.currentEditCell) {
        let target;
        if (event.key === 'ArrowRight') {
          target = this._svc.getNextCell(coordinates);
        }
        if (event.key === 'ArrowLeft') {
          target = this._svc.getPreviousCell(coordinates);
        }
        if (event.key === 'ArrowUp') {
          target = this._svc.getPreviousRowCell(coordinates);
        }
        if (event.key === 'ArrowDown') {
          target = this._svc.getNextRowCell(coordinates);
        }
        if (target) {
          event.preventDefault();
          const element = this.getCellElement(target);
          element?.focus();
        }
      }
    }
  }

  @HostListener('mousedown', ['$event']) mousedown(event: MouseEvent) {
    if (event.button === 2) {
      event.preventDefault();
    }
  }

  // @HostListener('contextmenu', ['$event']) contextMenu(event: MouseEvent) {
  //   if (
  //     this.getSelectedText() ||
  //     this.contextMenuConfig?.contextMenu === false
  //   ) {
  //     return;
  //   }
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.contextMenuTarget = this.getCoordinates(event);
  //   this.showContextMenu = true;
  //   this.setPosition(event);
  // }

  rowAdd() {
    this.addRow.emit();
    this.contextMenuTarget = null;
    this.showContextMenu = false;
  }

  copy(rows: TableRow<T>[]) {
    of(1)
      .pipe(withLatestFrom(this._svc.columns, this._svc.hiddenColumns))
      .subscribe((data: [number, TableColumn[], string[]]) => {
        const [, columns, hidden] = data;
        navigator.clipboard.writeText(
          this.toClipboardString(rows, this.getVisibleColumns(columns, hidden))
        );
        this.contextMenuTarget = null;
        this.showContextMenu = false;
      });
  }

  delete(rows: TableRow<T>[]) {
    this.deleteRows.emit(rows);
    this.contextMenuTarget = null;
    this.showContextMenu = false;
  }

  async pasteData() {
    const result = await navigator.clipboard.readText();
    of(1)
      .pipe(withLatestFrom(this._svc.columns, this._svc.hiddenColumns))
      .subscribe((data: [number, TableColumn[], string[]]) => {
        const [, columns, hidden] = data;
        this.pasteRows.emit(
          this.fromClipboard(result, this.getVisibleColumns(columns, hidden))
        );
      });
    this.contextMenuTarget = null;
    this.showContextMenu = false;
  }

  ngOnInit(): void {
    this._svc.restoreState();
    this._svc.restoreHiddenColumns();
    this.tableService.emit(this._svc);
  }

  ngAfterViewInit(): void {
    this._headElement =
      this._elementRef.nativeElement.querySelector('.table-head');
    this._bodyElement = this._elementRef.nativeElement.querySelector(
      '.table-body-container'
    );
    this._bodyElement.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    this._alive = false;
    this._bodyElement.removeEventListener('scroll', this.onScroll);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('editType')) {
      this._svc.editType = this.editType;
    }
    if (changes.hasOwnProperty('selectType')) {
      this._svc.selectType = this.selectType;
    }
    if (changes.hasOwnProperty('selectedRows')) {
      this._svc.selectRows(this.selectedRows);
    }
    if (changes.hasOwnProperty('rowEditable')) {
      this._svc.rowEditable = this.rowEditable;
    }
    if (changes.hasOwnProperty('cookieName')) {
      this._svc.setCookieName(this.cookieName);
    }
    if (changes.hasOwnProperty('columns')) {
      if (this.columns !== null && this.columns !== undefined) {
        this._svc.setColumns(this.columns);
      }
    }
    if (changes.hasOwnProperty('data')) {
      this._svc.setData(this.data);
      this._svc.selectRows([]);
    }
    if (changes.hasOwnProperty('dict')) {
      this._svc.setDict(this.dict);
      this._svc.setFilterOptions(this.dict);
    }

    if (changes.hasOwnProperty('filterOptions')) {
      this._svc.setFilterOptions(this.filterOptions);
    }
  }

  private startEditRowOrCell(coordinates: ICellEvent<T>): void {
    if (this.editType === EditType.row) {
      this._svc.startEditRow(coordinates);
    }
    if (this.editType === EditType.cell) {
      this._svc.startEditCell(coordinates);
    }
  }

  private getEventCell(event: Event): HTMLElement | null {
    return event.composedPath().find((target: HTMLElement) => {
      return target.tagName?.toLowerCase() === 'teta-cell';
    }) as HTMLElement;
  }

  private getEventRow(event: Event): HTMLElement | null {
    return event.composedPath().find((target: HTMLElement) => {
      return target?.getAttribute && target?.getAttribute('data-row');
    }) as HTMLElement;
  }

  private getCellElement(coordinates: ICellCoordinates<T>): HTMLElement | null {
    return this._elementRef.nativeElement.querySelector(
      `teta-cell[data-row="${this._svc.getRowIndex(coordinates.row)}"][data-column="${coordinates.column.name}"]`
    );
  }

  private eventIsOnRow(event: Event): boolean {
    const row = event.composedPath().find((target: HTMLElement) => {
      return target?.getAttribute && target?.getAttribute('data-row');
    });
    return row && this._elementRef.nativeElement.contains(row);
  }

  private getCoordinates(event: Event): ICellEvent<T> | null {
    const cell = this.getEventCell(event);
    if (cell) {
      const rowIndex = cell.getAttribute('data-row');
      const columnName = cell.getAttribute('data-column');
      if (rowIndex && columnName) {
        const row = this._svc.getRowByIndex(rowIndex);
        const column = this._svc.getColumnByName(columnName);
        return {
          row,
          column: column ? column : new TableColumn(),
          event,
        };
      }
    }
    return null;
  }

  private getRow(event: Event): TableRow<T> | null {
    const rowElement = this.getEventRow(event);
    if (rowElement) {
      const rowIndex = rowElement.getAttribute('data-row');
      if (rowIndex) {
        return this._svc.getRowByIndex(rowIndex);
      }
    }
    return null;
  }

  private onScroll = () => {
    this._headElement.scrollLeft = this._bodyElement.scrollLeft;
  };

  private getSelectedText() {
    let text = '';
    if (typeof window.getSelection != 'undefined') {
      text = window.getSelection().toString();
    }
    return text;
  }

  // private setPosition(event: MouseEvent) {
  //   const position = PositionUtil.getPosition(
  //     {
  //       top: event.y,
  //       bottom: event.y,
  //       left: event.x,
  //       right: event.x,
  //     },
  //     this.menu.nativeElement.getBoundingClientRect(),
  //     Align.left,
  //     VerticalAlign.auto
  //   );
  //   PositionUtil.setElementPosition(this.menu.nativeElement, position);
  // }

  private toClipboardString(rows: TableRow<T>[], columns: TableColumn[]) {
    return rows.reduce(
      (res: string, currentRow: TableRow<T>, i: number) =>
        `${res}${i === 0 ? '' : '\n'}${columns.reduce(
          (columnResult: string, column: TableColumn, j: number) =>
            `${columnResult}${j === 0 ? '' : '\t'}${
              currentRow.data[column.name] ?? ''
            }`,
          ''
        )}`,
      ''
    );
  }

  private fromClipboard(data: string, columns: TableColumn[]) {
    const rows = data.split('\n').filter((_) => _?.length > 0);
    const result = rows.map((_) =>
      _.replace('\r', '').replace('\n', '').split('\t')
    );
    return result.map((row: string[]) =>
      row.reduce((res, item, index) => {
        let value: any = item;
        if (
          columns[index]?.filterType === FilterType.number ||
          columns[index]?.filterType === FilterType.list
        ) {
          value = parseFloat(item);
        }
        if (columns[index]?.filterType === FilterType.boolean) {
          value = Boolean(JSON.parse(item.toLowerCase()));
        }
        if (columns[index]) {
          res[columns[index].name] = value;
        }
        return res;
      }, {})
    );
  }

  private getVisibleColumns(columns: TableColumn[], hidden: string[]) {
    const visible = ArrayUtil.flatten(columns, 'columns', true).filter(
      (_) => hidden.indexOf(_.name) < 0
    );
    return visible.sort((a, b) => Number(b.locked) - Number(a.locked));
  }
}
