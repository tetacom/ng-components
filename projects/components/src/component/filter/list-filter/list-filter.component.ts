import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {ListFilter} from '../contarct/list-filter';
import {ListFilterType} from '../enum/list-filter-type.enum';
import {FilterComponentBase} from '../base/filter-component-base';
import {FilterBase} from '../base/filter-base';
import {FilterState} from '../contarct/filter-state';
import {FilterItem} from '../contarct/filter-item';
import {IIdName} from '../../../common/contract/i-id-name';
import {TableRow} from '../../table/contract/table-row';

@Component({
  selector: 'teta-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFilterComponent<T> extends FilterComponentBase<T> implements OnInit {
  @Input() column: FilterItem;
  @Input() data: TableRow<T>[];
  @Input() filterOptions: IIdName<any>[] = [];
  @Output() filterChanged: EventEmitter<FilterBase> =
    new EventEmitter<FilterBase>();

  filter: ListFilter;
  state$: FilterState;
  search = '';

  get visibleOptions() {
    return this.filterOptions?.filter(
      (option: IIdName<any>) => {
        return option.name?.toString().indexOf(this.search) >= 0
          && this.data?.map(_ => _.data[this.column.name])?.indexOf(option.id) >= 0;
      }
    );
  }

  @Input()
  set state(val: FilterState) {
    this.state$ = val;
    this.filter = this.getFilter();
    this.changeDetector.detectChanges();
  }

  get state() {
    return this.state$;
  }

  excluded: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
  }

  all() {
    if (!this.filter?.value || this.filter?.value?.length === 0) {
      return false;
    }
    const notSet = this.visibleOptions?.find(
      (_) => this.filter?.value?.indexOf(_.id) < 0
    );
    if (!notSet) {
      return true;
    }
    return null;
  }

  setAll(value: boolean) {
    if (value) {
      this.setFilter(this.visibleOptions?.map((_) => _.id));
    } else {
      this.setFilter([]);
    }
  }

  setType() {
    this.excluded = !this.excluded;
    this.filter.type = this.excluded
      ? ListFilterType.Excluded
      : ListFilterType.None;
  }

  setFilter(value: any[]) {
    this.filter.value = value;
    this.filterChanged.emit(this.filter);
  }

  private getFilter(): ListFilter {
    let filter = this.state.listFilters?.find(
      (f) => f.field === this.column.filterField
    );
    if (!filter) {
      filter = this.state.addListFilter(
        new ListFilter({
          field: this.column.filterField,
          value: [],
          type: this.column.listFilterType,
          name: this.column.name,
        })
      );
    }
    this.excluded = filter.type === ListFilterType.Excluded;
    return filter;
  }
}
