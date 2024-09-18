import { FilterType } from '../../filter/enum/filter-type.enum';
import { Type } from '@angular/core';
import { NumericCellComponent } from '../default/numeric-cell/numeric-cell.component';
import { DateCellComponent } from '../default/date-cell/date-cell.component';
import { ListCellComponent } from '../default/list-cell/list-cell.component';
import { StringCellComponent } from '../default/string-cell/string-cell.component';
import { TableColumn } from './table-column';
import { BooleanCellComponent } from '../default/boolean-cell/boolean-cell.component';

const cellComponentsMap: Map<FilterType, Type<any>> = new Map<FilterType, Type<any>>()
  .set(FilterType.number, NumericCellComponent)
  .set(FilterType.date, DateCellComponent)
  .set(FilterType.list, ListCellComponent)
  .set(FilterType.string, StringCellComponent)
  .set(FilterType.boolean, BooleanCellComponent)
  .set(FilterType.custom, StringCellComponent);

export const getCellComponent = (column: TableColumn): Type<any> =>
  cellComponentsMap.has(column.filterType) ? cellComponentsMap.get(column.filterType) : StringCellComponent;
