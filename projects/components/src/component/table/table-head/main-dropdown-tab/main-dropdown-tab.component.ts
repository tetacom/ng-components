import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { TableService } from '../../service/table.service';
import { TetaConfigService } from '../../../../locale/teta-config.service';
import { TableColumn } from '../../contract/table-column';
import { Observable } from 'rxjs';
import { TetaLocalisation } from '../../../../locale/teta-localisation';
import { SortParam } from '../../../filter/contarct/sort-param';
import { StateUtil } from '../../util/state-util';
import { FilterState } from '../../../filter/contarct/filter-state';
import { SortEvent } from '../../contract/sort-event';
import { ITreeData } from '../../../../common/contract/i-tree-data';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'teta-main-dropdown-tab',
  templateUrl: './main-dropdown-tab.component.html',
  styleUrls: ['./main-dropdown-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
})
export class MainDropdownTabComponent<T> implements OnInit {
  @Input() columns: ITreeData[];
  @Input() column: TableColumn;
  @Input() state: FilterState;
  @Input() data: T[];
  @Input() close: () => void;
  @Input() headCellElementRef: ElementRef;

  locale: Observable<TetaLocalisation>;

  constructor(
    private _svc: TableService<T>,
    private _config: TetaConfigService,
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef,
  ) {
    this.locale = this._config.locale;
  }

  get sortParam(): SortParam {
    return StateUtil.getSortState(this.state, this.column);
  }

  get filtered() {
    return StateUtil.isColumnFiltered(this.state, this.column);
  }

  get parent() {
    return this._svc.getColumnParent(this.column);
  }

  pinColumn() {
    this._svc.pinColumn(this.column);
  }

  sortAsc(event: MouseEvent) {
    this._svc.sortAsc(new SortEvent(this.column, event.shiftKey));
  }

  sortDesc(event: MouseEvent) {
    this._svc.sortDesc(new SortEvent(this.column, event.shiftKey));
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

  clearFilter() {
    this._svc.clearFilter(this.column);
    this.close();
    this._cdr.markForCheck();
  }

  clearAllFilters() {
    this._svc.clearAllFilters();
    this.close();
    this._cdr.markForCheck();
  }

  autosizeColumn() {
    this._svc.autosizeColumn(this.column, this.headCellElementRef.nativeElement);
  }

  autosizeAllColumns() {
    this._svc.autosizeAllColumns(this.headCellElementRef.nativeElement);
  }

  ngOnInit(): void {}
}
