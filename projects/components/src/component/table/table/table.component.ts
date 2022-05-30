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
  SimpleChanges,
  TemplateRef,
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
import {filter, takeWhile} from 'rxjs/operators';
import {EditType} from '../enum/edit-type.enum';
import {EditEvent} from '../enum/edit-event.enum';
import {SelectType} from '../enum/select-type.enum';
import {IIdName} from '../../../common/contract/i-id-name';
import {IDictionary} from '../../../common/contract/i-dictionary';
import {ICellInstance, ICellInstanceEvent} from '../contract/i-cell-instance';

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
  @Input() selectType: SelectType = SelectType.mouse;
  @Input() aggregate: boolean;
  @Input() grouping: boolean;
  @Input() groupRowComponent: Type<GroupRowComponentBase<T>> =
    GroupRowComponent;
  @Input() openLevels: number;
  @Input() tree: boolean;
  @Input() trackRow: (index: number, row: TableRow<T>) => any = (index: number, row: TableRow<T>) => index;
  @Input() editType: EditType = EditType.cell;
  @Input() editEvent: EditEvent = EditEvent.doubleClick;
  @Input() rowEditable: boolean | ((row: TableRow<T>) => boolean);
  @Input() rowClass: (row: TableRow<T>, index?: number) => string;

  @Input() set scrollToIndex(index: number) {
    this._svc.scrollToIndex(index);
  }

  @Input() showHeadCellMenu = true;
  @Input() contextMenu: TemplateRef<any>;
  @Input() contextMenuOpen: boolean;
  @Output() contextMenuOpenChange = new EventEmitter<boolean>();

  @Output()
  stateChange: EventEmitter<FilterState> = new EventEmitter<FilterState>();
  @Output() bodyLeft = new EventEmitter<TableRow<T>>();
  @Output() activeRowChange: EventEmitter<TableRow<T>> = new EventEmitter();
  @Output() selectedRowsChange: EventEmitter<TableRow<T>[]> =
    new EventEmitter();
  @Output() cellClick = new EventEmitter<ICellInstanceEvent<T>>();
  @Output() cellDoubleClick = new EventEmitter<ICellInstanceEvent<T>>();
  @Output() cellFocus = new EventEmitter<ICellInstanceEvent<T>>();
  @Output() cellKeyDown = new EventEmitter<ICellInstanceEvent<T>>();
  @Output() rowLeft = new EventEmitter<TableRow<T>>();
  @Output() rowEditStart = new EventEmitter<ICellInstance<T>>();
  @Output() rowEditEnd = new EventEmitter<TableRow<T>>();
  @Output() cellEditStart = new EventEmitter<ICellInstance<T>>();
  @Output() cellEditEnd = new EventEmitter<ICellInstance<T>>();
  @Output() valueChange = new EventEmitter<ICellInstance<T>>();
  @Output() tableService = new EventEmitter<TableService<T>>();
  @ViewChild('contextMenu', {static: true}) menu: ElementRef;
  @HostBinding('class.table') private readonly tableClass = true;

  selectedRowsList: TableRow<T>[];

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
      .subscribe((item: ICellEvent) => this.cellEditStart.emit(this._svc.getCellInstance(item)));

    this._svc.editCellStop
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellCoordinates) => this.cellEditEnd.emit(this._svc.getCellInstance(item)));

    this._svc.editRowStart
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellEvent) =>
        this.rowEditStart.emit(this._svc.getCellInstance(item))
      );

    this._svc.editRowStop
      .pipe(takeWhile((_) => this._alive))
      .subscribe((item: ICellCoordinates) =>
        this.rowEditEnd.emit(this._svc.getRowByIndex(item?.row))
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
      .subscribe((coordinates: ICellCoordinates) => {
        this.valueChange.emit(this._svc.getCellInstance(coordinates));
      });
  }

  @HostListener('document:click', ['$event']) handleClickOutsideAnyRow(
    event: MouseEvent
  ) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellClick.emit({
        ...this._svc.getCellInstance(coordinates),
        event
      });
      if (this.editEvent === EditEvent.click) {
        this.startEditRowOrCell(coordinates);
      } else {
        if (this._svc.currentEditCell && (coordinates.row !== this._svc.currentEditCell.row || coordinates.column !== this._svc.currentEditCell.column)) {
          this.startEditRowOrCell(null);
        }
      }
    }
    const row = this.getRow(event);
    if (row) {
      if (event.ctrlKey) {
        this._svc.selectOrDeselectRow(row);
      } else if (event.shiftKey) {
        this._svc.selectRange(row);
      } else {
        this._svc.selectRows([row]);
      }
    }
    if (!this.eventIsOnRow(event) && !event.defaultPrevented) {
      if (this.editType === EditType.row) {
        this._svc.startEditRow(null);
      } else {
        this._svc.startEditCell(null);
      }
    }
  }

  @HostListener('focusin', ['$event']) focusIn(event: any) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellFocus.emit({
        ...this._svc.getCellInstance(coordinates),
        event
      });
      if (this.editEvent === EditEvent.focus) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  @HostListener('dblclick', ['$event'])
  dblclick(event: MouseEvent) {
    const coordinates = this.getCoordinates(event);
    if (coordinates) {
      this.cellDoubleClick.emit({
        ...this._svc.getCellInstance(coordinates),
        event
      });
      if (this.editEvent === EditEvent.doubleClick) {
        this.startEditRowOrCell(coordinates);
      }
    }
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'KeyA') {
      event.preventDefault();
      this._svc.selectAll();
      return;
    }
    if (event.key === 'Escape') {
      this._svc.deselectAll();
      if (this.editType === EditType.row) {
        this._svc.startEditRow(null);
      } else {
        this._svc.startEditCell(null);
      }
    }
    const coordinates = this.getCoordinates(event);
    if (event.key === 'Enter') {
      if (this.editType === EditType.row) {
        this._svc.startEditRow(null);
      } else {
        if (this._svc.currentEditCell) {
          const target = this._svc.getNextRowCell(coordinates);
          if (target) {
            this.startEditRowOrCell({
              row: target.row,
              column: target.column,
              event: undefined
            });
          } else {
            this._svc.startEditCell(null);
          }
        }
      }
    }
    if (coordinates) {
      this.cellKeyDown.emit({
        ...this._svc.getCellInstance(coordinates),
        event
      });
      if (event.key && (event.key.length === 1 || event.key === 'Delete')) {
        this.startEditRowOrCell({
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
        if (target) {
          this.startEditRowOrCell({
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
    if (changes.hasOwnProperty('trackRow')) {
      this._svc.trackRow = this.trackRow;
    }
  }

  setContextMenuOpen(value: boolean) {
    this.contextMenuOpen = value;
    this.contextMenuOpenChange.emit(this.contextMenuOpen);
  }

  private startEditRowOrCell(coordinates: ICellEvent): void {
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

  private getCellElement(coordinates: ICellCoordinates): HTMLElement | null {
    return this._elementRef.nativeElement.querySelector(
      `teta-cell[data-row="${coordinates.row}"][data-column="${coordinates.column}"]`
    );
  }

  private eventIsOnRow(event: Event): boolean {
    const row = event.composedPath().find((target: HTMLElement) => {
      return target?.getAttribute && target?.getAttribute('data-row');
    });
    return row && this._elementRef.nativeElement.contains(row);
  }

  private getCoordinates(event: Event): ICellEvent | null {
    const cell = this.getEventCell(event);
    if (cell) {
      const rowIndex = parseInt(cell.getAttribute('data-row'), 10);
      const columnName = cell.getAttribute('data-column');
      if (rowIndex >= 0 && columnName) {
        return {
          row: rowIndex,
          column: columnName,
          event,
        };
      }
    }
    return null;
  }

  private getRow(event: Event): TableRow<T> | null {
    const rowElement = this.getEventRow(event);
    if (rowElement) {
      const rowIndex = parseInt(rowElement.getAttribute('data-row'), 10);
      if (rowIndex >= 0) {
        return this._svc.getRowByIndex(rowIndex);
      }
    }
    return null;
  }

  private onScroll = () => {
    this._headElement.scrollLeft = this._bodyElement.scrollLeft;
  };

  // private getSelectedText() {
  //   let text = '';
  //   if (typeof window.getSelection != 'undefined') {
  //     text = window.getSelection().toString();
  //   }
  //   return text;
  // }
}
