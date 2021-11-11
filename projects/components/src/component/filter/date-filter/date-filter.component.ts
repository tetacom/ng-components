import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DateFilterValue } from '../contarct/date-filter-value';
import { DateFilter } from '../contarct/date-filter';
import { FilterState } from '../contarct/filter-state';
import { FilterBase } from '../base/filter-base';
import { FilterComponentBase } from '../base/filter-component-base';
import { FilterItem } from '../contarct/filter-item';
import { IIdName } from '../../../common/contract/i-id-name';

@Component({
  selector: 'teta-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterComponent extends FilterComponentBase implements OnInit {
  @Input() column: FilterItem;
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase> =
    new EventEmitter<FilterBase>();

  filter: DateFilter;
  state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
    this.changeDetector.markForCheck();
  }

  get state() {
    return this.state$;
  }

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.filter = this.getFilter();
  }

  private getFilter(): DateFilter {
    let filter = this.state.dateFilters.find(
      (f) => f.field === this.column.filterField
    );
    if (filter === null || filter === undefined) {
      filter = this.state.addDateFilter(
        new DateFilter({
          value: new DateFilterValue(),
          field: this.column.filterField,
          name: this.column.name,
        })
      );
    }
    return filter;
  }
}
