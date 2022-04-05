import {TableColumn} from '../contract/table-column';
import {ArrayUtil} from '../../../common/util/array-util';
import {SortParam} from '../../filter/contarct/sort-param';
import {ListFilterType} from '../../filter/enum/list-filter-type.enum';
import {ListFilter} from '../../filter/contarct/list-filter';
import {NumericFilter} from '../../filter/contarct/numeric-filter';
import {DateFilter} from '../../filter/contarct/date-filter';
import {StringFilterType} from '../../filter/enum/string-filter-type.enum';
import {StringFilter} from '../../filter/contarct/string-filter';
import {FilterState} from '../../filter/contarct/filter-state';

export class TableUtil {
  public static getColumnLeaves(column: TableColumn): TableColumn[] | null {
    if (column?.columns?.length > 0) {
      return ArrayUtil.flatten(column.columns, 'columns', true);
    }
    return null;
  }

  static getData<T>(data: T[], state: FilterState): T[] {
    let result: T[] = data;
    result = TableUtil.filterData(result, state);
    result = TableUtil.sortData(result, state);
    return result;
  }

  static sortData<T>(data: T[], state: FilterState): T[] {
    let result: T[] = data;
    const func = (sortParam: SortParam) => {
      result = TableUtil.sort(result, sortParam);
    };
    if (state?.sortParams?.length > 0) {
      state.sortParams.forEach(func);
    }
    return result;
  }

  static filterData<T>(data: T[], state: FilterState): T[] {
    let result: T[] = data;
    if (state?.stringFilters?.length) {
      const stringFilter = (filter: StringFilter) => {
        result = TableUtil.filterString(result, filter);
      };
      state.stringFilters.forEach(stringFilter);
    }
    if (state?.dateFilters?.length) {
      const dateFilter = (filter: DateFilter) => {
        result = TableUtil.filterDate(result, filter);
      };
      state.dateFilters.forEach(dateFilter);
    }
    if (state?.numericFilters?.length) {
      const numericFilter = (filter: NumericFilter) => {
        result = TableUtil.filterNumber(result, filter);
      };
      state.numericFilters.forEach(numericFilter);
    }
    if (state?.listFilters?.length) {
      const listFilter = (filter: ListFilter) => {
        result = TableUtil.filterList(result, filter);
      };
      state.listFilters.forEach(listFilter);
    }
    return result;
  }

  static filterString<T>(data: T[], filter: StringFilter): T[] {
    if (filter.value === null || filter.value === undefined) {
      return data;
    }
    const filterString = (row: T) => {
      const item = row as any;
      if (filter.type === StringFilterType.EndsWith) {
        return item[filter.field]?.toLowerCase().endsWith(filter.value?.toLowerCase());
      }
      if (filter.type === StringFilterType.Equals) {
        return item[filter.field]?.toLowerCase() === filter.value?.toLowerCase();
      }
      if (filter.type === StringFilterType.StartsWith) {
        return item[filter.field]?.toLowerCase().startsWith(filter.value?.toLowerCase());
      }
      return item[filter.field]?.toLowerCase().indexOf(filter.value?.toLowerCase()) >= 0;
    };
    return data.filter(filterString);
  }

  static filterDate<T>(data: T[], filter: DateFilter): T[] {
    const filterDate = (row: T) => {
      const item = row as any;
      return (filter.value.lessThan === null || filter.value.lessThan === undefined
          ? true
          : filter.value.lessThan.getTime() > item[filter.field].getTime()) &&
        (filter.value.greaterThan === null || filter.value.greaterThan === undefined
          ? true
          : filter.value.greaterThan.getTime() < item[filter.field].getTime());
    };
    return data.filter(filterDate);
  }

  static filterNumber<T>(data: T[], filter: NumericFilter): T[] {
    const filterNumber = (row: T) => {
      const item = row as any;
      return (filter.value.lessThan === null || filter.value.lessThan === undefined
          ? true
          : filter.value.lessThan > item[filter.field]) &&
        (filter.value.greaterThan === null || filter.value.greaterThan === undefined
          ? true
          : filter.value.greaterThan < item[filter.field]) &&
        (filter.value.equalsTo === null || filter.value.equalsTo === undefined
          ? true
          : filter.value.equalsTo === item[filter.field]);
    };
    return data.filter(filterNumber);
  }

  static filterList<T>(data: T[], filter: ListFilter): T[] {
    if (filter.value === null || filter.value === undefined || filter.value.length < 1) {
      return data;
    }
    const filterList = (row: T) => {
      const item = row as any;
      if (filter.type === ListFilterType.Excluded) {
        return filter.value.indexOf(item[filter.field]) < 0;
      }
      return filter.value.indexOf(item[filter.field]) >= 0;
    };
    return data.filter(filterList);
  }

  static sort<T>(data: T[], sortParam: SortParam): T[] {
    const res = data.sort(sortParam.asc ? TableUtil.asc(sortParam.field) : TableUtil.desc(sortParam.field));
    return [...res];
  }

  static desc(field: string) {
    const res = (a: any, b: any) => a[field] > b[field] ? -1 : 1;
    return res;
  }

  static asc(field: string) {
    const res = (a: any, b: any) => a[field] < b[field] ? -1 : 1;
    return res;
  }
}
