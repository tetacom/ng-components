import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import {TableRow} from '../contract/table-row';
import {TableColumn} from '../contract/table-column';
import {GroupRowComponentBase} from '../base/group-row-component-base';
import {TableService} from '../service/table.service';
import {DetailComponentBase} from '../base/detail-component-base';
import {takeWhile} from 'rxjs/operators';
import {TableUtil} from '../util/table-util';
import {SelectType} from '../enum/select-type.enum';
import {combineLatest} from 'rxjs';
import {ArrayUtil} from '../../../common/util/array-util';
import {IDictionary} from '../../../common/contract/i-dictionary';
import {IIdName} from '../../../common/contract/i-id-name';
import {AggregationType} from '../enum/aggregation-type.enum';
import {Datasource, IDatasource, SizeStrategy} from 'ngx-ui-scroll';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'teta-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent<T> implements OnInit, OnDestroy {
  @Input() virtual: boolean;
  @Input() activeRow: TableRow<T>;
  @Input() rowHeight: number;
  @Input() additionalComponent: Type<DetailComponentBase<T>>;
  @Input() tree: boolean;
  @Input() aggregate: boolean;
  @Input() grouping: boolean;
  @Input() groupRowComponent: Type<GroupRowComponentBase<T>>;
  @Input() openLevels: number;
  @Input() selectType: SelectType;
  @Input() rowClass: (row: TableRow<T>, index?: number) => string;

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewport: CdkVirtualScrollViewport;

  @HostBinding('class.table-body') private readonly tableBodyClass = true;

  set data(data: TableRow<T>[]) {
    this._data = data;
    if (!this.dataSource) {
      this.createAdapter();
    }
    this.resetAdapter();
  }

  get data() {
    return this._data;
  }

  dict: IDictionary<IIdName<any>[]>;

  gridTemplateColumns: string;
  selectedRows: TableRow<T>[] = [];
  locked: TableColumn[] = [];
  unlocked: TableColumn[] = [];

  selectTypeEnum = SelectType;
  dataSource: IDatasource<TableRow<T>>;

  private _columns: TableColumn[] = [];
  private _alive = true;
  private _data: TableRow<T>[];
  private _hiddenColumns: string[] = [];
  private _index: number;

  set columns(columns: TableColumn[]) {
    this._columns = columns;
    this.locked = this._columns?.filter((_) => _.locked === true);
    this.unlocked = this._columns?.filter((_) => _.locked === false);
  }

  get columns(): TableColumn[] {
    return this._columns;
  }

  constructor(private _svc: TableService<T>, private _cdr: ChangeDetectorRef) {
    combineLatest([this._svc.columns, this._svc.hiddenColumns])
      .pipe(takeWhile((_) => this._alive))
      .subscribe((values: [TableColumn[], string[]]) => {
        const [columns, hiddenColumns] = values;
        this._hiddenColumns = hiddenColumns;
        this.columns = ArrayUtil.flatten(columns, 'columns', true).filter(
          (_) => this._hiddenColumns.indexOf(_.name) < 0
        );
        this.gridTemplateColumns = TableUtil.getGridTemplateColumns(
          this.columns.sort((a, b) => Number(b.locked) - Number(a.locked))
        );
        this._cdr.markForCheck();
      });

    this._svc.displayData.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.data = _;
      this._cdr.markForCheck();
    });

    this._svc.dict.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.dict = _;
      this._cdr.markForCheck();
    });

    this._svc.scrollIndex
      .pipe(takeWhile((_) => this._alive))
      .subscribe(async (_) => {
        // if (this.viewport && this.dataSource && _ !== null) {
        //   await this.dataSource.adapter.relax();
        //   await this.dataSource.adapter.fix({
        //     scrollPosition: (_ + 1) * 24,
        //   });
        // }
        if (this.viewport) {
          this.viewport.scrollToIndex(_, 'smooth');
        }
        this._cdr.markForCheck();
      });

    this._svc.activeRow
      .pipe(takeWhile((_) => this._alive))
      .subscribe(async (_) => {
        this.activeRow = _;
        this._cdr.markForCheck();
      });
  }

  setActiveRow(row: TableRow<T>) {
    this._svc.setActiveRow(row);
  }

  getData = (index, count, success) => {
    const data = [];
    if (this.data?.length > 0) {
      const start = Math.max(0, index);
      const end = Math.min(index + count - 1, this.data.length - 1);
      for (let i = start; i <= end; i++) {
        data.push(this.data[i]);
      }
    }
    return success(data);
  };

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._alive = false;
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
  }

  getAggregateText(column: TableColumn): string {
    if (column.aggregate === AggregationType.sum) {
      return 'Сумма=';
    }
    if (column.aggregate === AggregationType.avg) {
      return 'Среднее=';
    }
    if (column.aggregate === AggregationType.min) {
      return 'Мин=';
    }
    if (column.aggregate === AggregationType.max) {
      return 'Макс=';
    }
    return '';
  }

  getSpan(): string {
    if (this.locked?.length > 0) {
      let span = this.locked.length;
      if (this.selectType !== SelectType.none) {
        span += 1;
      }
      return `span ${span}`;
    }
    return null;
  }

  getTemplateColumns() {
    let template = this.gridTemplateColumns;
    if (this.selectType !== SelectType.none) {
      template = `48px ${template}`;
    }
    return template;
  }

  getLockedGridTemplateColumns(columns: TableColumn[]) {
    let template = TableUtil.getGridTemplateColumns(columns);
    if (this.selectType !== SelectType.none) {
      template = `48px ${template}`;
    }
    return template;
  }

  trackRow(index: number, row: TableRow<T>): any {
    return index;
  }

  trackColumns(index: number, column: TableColumn): any {
    return column.name;
  }

  private getSum(columnName) {
    return this.data?.reduce((accum, current) => {
      const val = parseFloat(current.data[columnName]);
      return accum + (isNaN(val) ? 0 : val);
    }, 0);
  }

  private getMin(columnName) {
    return this.data?.reduce(
      (accum, current) =>
        accum != null && accum <= current.data[columnName]
          ? accum
          : current.data[columnName],
      null
    );
  }

  private getMax(columnName) {
    return this.data?.reduce(
      (accum, current) =>
        accum != null && accum >= current.data[columnName]
          ? accum
          : current.data[columnName],
      null
    );
  }

  private async resetAdapter() {
    await this.dataSource.adapter.relax();
    await this.dataSource.adapter.reset({
      get: this.getData,
      settings: {
        minIndex: 0,
        maxIndex: this._data?.length ? this._data.length - 1 : 0,
        startIndex: 0,
        itemSize: 24,
        sizeStrategy: SizeStrategy.Constant,
      },
    });
    await this.dataSource.adapter.check();
  }

  private createAdapter() {
    this.dataSource = new Datasource<TableRow<T>>({
      get: this.getData,
      settings: {
        startIndex: 0,
        bufferSize: 2,
        sizeStrategy: SizeStrategy.Constant,
        itemSize: 24,
      },
    });
  }
}
