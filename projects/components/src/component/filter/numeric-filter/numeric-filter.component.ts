import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NumericFilter } from '../contarct/numeric-filter';
import { FilterComponentBase } from '../base/filter-component-base';
import { FilterBase } from '../base/filter-base';
import { FilterState } from '../contarct/filter-state';
import { FilterItem } from '../contarct/filter-item';
import { NumericFilterValue } from '../contarct/numeric-filter-value';
import { IIdName } from '../../../common/contract/i-id-name';

@Component({
  selector: 'teta-numeric-filter',
  templateUrl: './numeric-filter.component.html',
  styleUrls: ['./numeric-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericFilterComponent
  extends FilterComponentBase
  implements OnInit
{
  @Input() column: FilterItem;
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase> =
    new EventEmitter<FilterBase>();

  filter: NumericFilter;

  private state$: FilterState;

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
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

  private getFilter(): NumericFilter {
    let filter = this.state.numericFilters?.find(
      (f) => f.field === this.column.filterField
    );
    if (filter === null || filter === undefined) {
      filter = this.state.addNumericFilter(
        new NumericFilter({
          value: new NumericFilterValue(),
          field: this.column.filterField,
          name: this.column.name,
          strict: true,
        })
      );
    }
    return filter;
  }
}
