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
import { FilterState } from '../../filter/contarct/filter-state';
import { TableService } from '../service/table.service';
import { takeWhile } from 'rxjs/operators';
import { TableUtil } from '../util/table-util';
import { SelectType } from '../enum/select-type.enum';
import { combineLatest } from 'rxjs';
import { ArrayUtil } from '../../../common/util/array-util';

@Component({
  selector: 'teta-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent<T> implements OnInit, OnDestroy {
  @Input() selectType: SelectType;
  @Input() showHeadCellMenu: boolean;
  @HostBinding('class.table-head') private readonly tableHeadClass = true;
  gridTemplateColumns: string;

  @HostBinding('style.grid-template-columns')
  get getTemplateColumns() {
    let template = this.gridTemplateColumns;
    if (this.selectType !== SelectType.none) {
      template = `48px ${template}`;
    }
    return template;
  }

  state: FilterState;
  selectTypeEnum = SelectType;

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
    return this._columns.filter(
      (_) => _.locked === true && this._hiddenColumns.indexOf(_.name) < 0
    );
  }

  get unlocked(): TableColumn[] {
    return this._columns.filter(
      (_) => _.locked === false && this._hiddenColumns.indexOf(_.name) < 0
    );
  }

  constructor(private _svc: TableService<T>, private _cdr: ChangeDetectorRef) {
    combineLatest([this._svc.columns, this._svc.hiddenColumns])
      .pipe(takeWhile((_) => this._alive))
      .subscribe((values: [TableColumn[], string[]]) => {
        const [columns, hiddenColumns] = values;
        this._hiddenColumns = hiddenColumns;
        this.columns = columns;

        this.gridTemplateColumns = TableUtil.getGridTemplateColumns(
          ArrayUtil.flatten(columns, 'columns', true)
            .filter((_) => this._hiddenColumns.indexOf(_.name) < 0)
            .sort((a, b) => Number(b.locked) - Number(a.locked))
        );
        this._cdr.markForCheck();
      });

    this._svc.state.pipe(takeWhile((_) => this._alive)).subscribe((_) => {
      this.state = _;
      this._cdr.markForCheck();
    });
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

  getLockedGridTemplateColumns(columns: TableColumn[]) {
    let template = TableUtil.getGridTemplateColumns(columns);
    if (this.selectType !== SelectType.none) {
      template = `48px ${template}`;
    }
    return template;
  }

  track(index: number, item: TableColumn): any {
    return item.name;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }
}
