import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FilterComponentBase } from '../base/filter-component-base';
import { FilterItem } from '../contarct/filter-item';
import { IIdName } from '../../../common/contract/i-id-name';
import { FilterBase } from '../base/filter-base';
import { FilterState } from '../contarct/filter-state';
import { BooleanFilter } from '../contarct/boolean-filter';

@Component({
  selector: 'teta-boolean-filter',
  templateUrl: './boolean-filter.component.html',
  styleUrls: ['./boolean-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanFilterComponent
  extends FilterComponentBase
  implements OnInit
{
  @Input() column: FilterItem;
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase> =
    new EventEmitter<FilterBase>();

  filter: BooleanFilter;
  state$: FilterState;

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

  ngOnInit() {}

  setFilter() {
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): BooleanFilter {
    let filter = this.state.booleanFilters.find(
      (f) => f.field === this.column.filterField
    );
    if (!filter) {
      filter = this.state.addBooleanFilter(
        new BooleanFilter({
          value: null,
          field: this.column.filterField,
          name: this.column.name,
        })
      );
    }
    return filter;
  }
}
