import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { ArrayUtil } from '../../../common/util/array-util';
import { FilterState } from '../../filter/contarct/filter-state';
import { TableColumn } from '../contract/table-column';
import { SelectType } from '../enum/select-type.enum';
import { TableService } from '../service/table.service';
import { TableHeadGroupComponent } from '../table-head-group/table-head-group.component';
import { SelectionHeadCellComponent } from '../selection-head-cell/selection-head-cell.component';

@Component({
    selector: 'teta-table-head',
    templateUrl: './table-head.component.html',
    styleUrls: ['./table-head.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SelectionHeadCellComponent, TableHeadGroupComponent]
})
export class TableHeadComponent<T> implements OnInit, OnDestroy {
  @Input() selectType: SelectType;
  @Input() showHeadCellMenu: boolean;
  @HostBinding('class.table-head') private readonly tableHeadClass = true;

  state: FilterState;
  selectTypeEnum = SelectType;
  lockedFlex: number;
  lockedWidth: number;

  private _alive = true;
  private _columns: TableColumn[] = [];
  private _hiddenColumns: string[] = [];

  set columns(columns: TableColumn[]) {
    this._columns = columns;
    this._cdr.markForCheck();
  }

  get columns(): TableColumn[] {
    return this._columns;
  }

  get locked(): TableColumn[] {
    return this._columns.filter((_) => _.locked === true && this._hiddenColumns.indexOf(_.name) < 0);
  }

  get unlocked(): TableColumn[] {
    return this._columns.filter((_) => _.locked === false && this._hiddenColumns.indexOf(_.name) < 0);
  }

  data: T[];

  constructor(
    private _svc: TableService<T>,
    private _cdr: ChangeDetectorRef,
  ) {}

  track(index: number, item: TableColumn): any {
    return item.name;
  }

  ngOnInit(): void {
    combineLatest([this._svc.columns, this._svc.hiddenColumns])
      .pipe(takeWhile((_) => this._alive))
      .subscribe((values: [TableColumn[], string[]]) => {
        const [columns, hiddenColumns] = values;
        this._hiddenColumns = hiddenColumns;
        this.columns = columns;
        const locked = ArrayUtil.flatten(columns, 'columns', true).filter(
          (_) => this._hiddenColumns.indexOf(_.name) < 0 && _.locked,
        );
        const startWidth = this.selectType === SelectType.checkBox ? 28 : 0;
        this.lockedFlex = locked.reduce((prev: number, curr: TableColumn) => prev + curr.flex, 0);
        this.lockedWidth = locked.reduce((prev: number, curr: TableColumn) => prev + curr.width, startWidth);
        this._cdr.markForCheck();
      });

    this._svc.state.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.state = _;
      this._cdr.markForCheck();
    });

    this._svc.displayData.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.data = _.map((_) => _.data);
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
