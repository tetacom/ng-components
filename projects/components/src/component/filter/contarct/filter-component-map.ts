import { FilterType } from '../enum/filter-type.enum';
import { Type } from '@angular/core';
import { NumericFilterComponent } from '../numeric-filter/numeric-filter.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { ListFilterComponent } from '../list-filter/list-filter.component';
import { StringFilterComponent } from '../string-filter/string-filter.component';
import { FilterItem } from './filter-item';
import { BooleanFilterComponent } from '../boolean-filter/boolean-filter.component';

const filterComponentsMap: Map<FilterType, Type<any>> = new Map<
  FilterType,
  Type<any>
>()
  .set(FilterType.number, NumericFilterComponent)
  .set(FilterType.date, DateFilterComponent)
  .set(FilterType.list, ListFilterComponent)
  .set(FilterType.string, StringFilterComponent)
  .set(FilterType.boolean, BooleanFilterComponent)
  .set(FilterType.custom, StringFilterComponent);

export const getFilterComponent = (item: FilterItem): Type<any> =>
  filterComponentsMap.has(item.filterType)
    ? filterComponentsMap.get(item.filterType)
    : StringFilterComponent;
