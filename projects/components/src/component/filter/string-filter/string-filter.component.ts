import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { StringFilter } from '../contarct/string-filter';
import { FilterState } from '../contarct/filter-state';
import { FilterBase } from '../base/filter-base';
import { FilterComponentBase } from '../base/filter-component-base';
import { FilterItem } from '../contarct/filter-item';
import { IIdName } from '../../../common/contract/i-id-name';

@Component({
  selector: 'teta-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringFilterComponent
  extends FilterComponentBase
  implements OnInit
{
  @Input() column: FilterItem;
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase> =
    new EventEmitter<FilterBase>();

  filter: StringFilter;
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

  private getFilter(): StringFilter {
    let filter = this.state.stringFilters.find(
      (f) => f.field === this.column.filterField
    );
    if (!filter) {
      filter = this.state.addStringFilter(
        new StringFilter({
          value: '',
          field: this.column.filterField,
          type: this.column.stringFilterType,
          name: this.column.name,
        })
      );
    }
    filter.type = this.column.stringFilterType;
    return filter;
  }
}
