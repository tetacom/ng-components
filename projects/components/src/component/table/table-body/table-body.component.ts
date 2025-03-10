import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild,
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { IDictionary } from '../../../common/contract/i-dictionary';
import { IIdName } from '../../../common/contract/i-id-name';
import { ArrayUtil } from '../../../common/util/array-util';
import { TetaConfigService } from '../../../locale/teta-config.service';
import { TetaLocalisation } from '../../../locale/teta-localisation';
import { DetailComponentBase } from '../base/detail-component-base';
import { TableColumn } from '../contract/table-column';
import { TableRow } from '../contract/table-row';
import { AggregationType } from '../enum/aggregation-type.enum';
import { SelectType } from '../enum/select-type.enum';
import { TableService } from '../service/table.service';
import { NumberPipe } from '../../../pipe/number-pipe/number.pipe';
import { IconComponent } from '../../icon/icon/icon.component';
import { CellComponent } from '../cell/cell.component';
import { SelectionCellComponent } from '../selection-cell/selection-cell.component';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet, NgClass, AsyncPipe } from '@angular/common';
import { ScrollableDirective } from '../../../directive/scrollable/scrollable.directive';
import { ScrollableComponent } from '../../../directive/scrollable/scrollable/scrollable.component';
import { TableRowComponent } from '../table-row/table-row.component';

@Component({
    selector: 'teta-table-body',
    templateUrl: './table-body.component.html',
    styleUrls: ['./table-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ScrollableComponent,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        ScrollableDirective,
        CdkVirtualForOf,
        NgTemplateOutlet,
        FormsModule,
        NgClass,
        SelectionCellComponent,
        CellComponent,
        IconComponent,
        AsyncPipe,
        NumberPipe,
        TableRowComponent,
    ]
})
export class TableBodyComponent<T> implements OnInit, OnDestroy {
  @Input() virtual: boolean;
  @Input() activeRow: T;
  @Input() selectedRows: T[] = [];
  @Input() additionalComponent: Type<DetailComponentBase<T>>;
  @Input() aggregate: boolean;
  @Input() selectType: SelectType;
  @Input() rowClass: (row: T, index?: number) => string;
  @Input() trackRow: (index: number, row: T) => any;
  @Input() trackColumns: (index: number, column: TableColumn) => any;
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;

  rowHeight = input<number>(28);

  @HostBinding('class.table-body') private readonly tableBodyClass = true;
  @Output() scrollChange = new EventEmitter<Event>();

  set data(data: TableRow<T>[]) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  dict: IDictionary<IIdName<any>[]>;
  locked: TableColumn[] = [];
  unlocked: TableColumn[] = [];
  selectTypeEnum = SelectType;
  aggregationType = AggregationType;
  lockedFlex: number;
  lockedWidth: number;
  totalFlex: number;
  totalWidth: number;

  private _columns: TableColumn[] = [];
  private _alive = true;
  private _data: TableRow<T>[];
  private _hiddenColumns: string[] = [];
  private _obs: ResizeObserver;

  set columns(columns: TableColumn[]) {
    this._columns = columns;
    this.locked = this._columns?.filter((_) => _.locked === true);
    this.unlocked = this._columns?.filter((_) => _.locked === false);
    const startWidth = this.selectType === SelectType.checkBox ? 28 : 0;
    this.lockedFlex = this.locked.reduce((prev: number, curr: TableColumn) => prev + curr.flex, 0);
    this.lockedWidth = this.locked.reduce((prev: number, curr: TableColumn) => prev + curr.width, startWidth);
    this.totalFlex = this._columns.reduce((prev: number, curr: TableColumn) => prev + curr.flex, 0);
    this.totalWidth = this._columns.reduce((prev: number, curr: TableColumn) => prev + curr.width, startWidth);
  }

  get columns(): TableColumn[] {
    return this._columns;
  }

  locale: Observable<TetaLocalisation>;

  constructor(
    private _svc: TableService<T>,
    private _elementRef: ElementRef,
    private _config: TetaConfigService,
    private _cdr: ChangeDetectorRef,
  ) {}

  setActiveRow(row: T, event: MouseEvent) {
    if (!event.shiftKey && !event.ctrlKey) {
      this._svc.setActiveRow(row);
    }
  }

  ngOnInit(): void {
    this.locale = this._config.locale;
    combineLatest([this._svc.columns, this._svc.hiddenColumns])
      .pipe(takeWhile((_) => this._alive))
      .subscribe((values: [TableColumn[], string[]]) => {
        const [columns, hiddenColumns] = values;
        this._hiddenColumns = hiddenColumns;
        this.columns = ArrayUtil.flatten(columns, 'columns', true).filter(
          (_) => this._hiddenColumns.indexOf(_.name) < 0,
        );
        this._cdr.markForCheck();
      });

    this._svc.displayData.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.data = _;
      this._cdr.markForCheck();
      this.viewport?.checkViewportSize();
    });

    this._svc.dict.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.dict = _;
      this._cdr.markForCheck();
    });

    this._svc.scrollIndex.pipe(takeWhile(() => this._alive)).subscribe(async (index) => {
      if (this.viewport) {
        this.viewport.scrollToIndex(index, 'auto');
      } else {
        const row = this._elementRef.nativeElement.querySelector(`.table-row[data-row="${index}"]`) as HTMLElement;
        row?.scrollIntoView();
      }
      this._cdr.markForCheck();
    });

    this._svc.activeRow.pipe(takeWhile((_) => this._alive)).subscribe(async (_) => {
      this.activeRow = _;
      this._cdr.markForCheck();
    });
    this.addResizeObserver();
  }

  ngOnDestroy(): void {
    this._alive = false;
    this.removeResizeObserver();
  }

  getAggregateValue(column: TableColumn): number {
    if (column.aggregate === AggregationType.sum) {
      return this.getSum(column.name);
    }
    if (column.aggregate === AggregationType.avg) {
      return this.getSum(column.name) / this.data.length;
    }
    if (column.aggregate === AggregationType.min) {
      return this.getMin(column.name);
    }
    if (column.aggregate === AggregationType.max) {
      return this.getMax(column.name);
    }
    return null;
  }

  getAggregateText(column: TableColumn): string {
    if (column.aggregate === AggregationType.sum) {
      return 'sum';
    }
    if (column.aggregate === AggregationType.avg) {
      return 'avg';
    }
    if (column.aggregate === AggregationType.min) {
      return 'min';
    }
    if (column.aggregate === AggregationType.max) {
      return 'max';
    }
    return '';
  }

  emitScroll(event) {
    this.scrollChange.emit(event);
  }

  trackTableRow = (index: number, row: TableRow<T>): any => {
    return this.trackRow ? this.trackRow(index, row.data) : row.data['id'];
  };

  private addResizeObserver() {
    this._obs = new ResizeObserver((_) => {
      this.viewport?.checkViewportSize();
    });

    this._obs.observe(this._elementRef.nativeElement);
  }

  private removeResizeObserver() {
    this._obs.unobserve(this._elementRef.nativeElement);
    this._obs.disconnect();
  }

  private getSum(columnName: string) {
    return this.data?.reduce((accum, current) => {
      const val = parseFloat(current.data[columnName]);
      return accum + (isNaN(val) ? 0 : val);
    }, 0);
  }

  private getMin(columnName: string): number {
    return (this.data as any)?.reduce(
      (accum, current: TableRow<T>) =>
        accum != null && accum <= current.data[columnName] ? accum : current.data[columnName],
      null,
    );
  }

  private getMax(columnName: string): number {
    return (this.data as any)?.reduce(
      (accum, current) => (accum != null && accum >= current.data[columnName] ? accum : current.data[columnName]),
      null,
    );
  }
}
