import { StringFilter } from './string-filter';
import { NumericFilter } from './numeric-filter';
import { DateFilter } from './date-filter';
import { ListFilter } from './list-filter';
import { SortParam } from './sort-param';
import { DateFilterValue } from './date-filter-value';
import { NumericFilterValue } from './numeric-filter-value';
import { ListFilterType } from '../enum/list-filter-type.enum';
import { BooleanFilter } from './boolean-filter';

export class FilterState {
  stringFilters: StringFilter[] = [];
  numericFilters: NumericFilter[] = [];
  dateFilters: DateFilter[] = [];
  listFilters: ListFilter[] = [];
  booleanFilters: BooleanFilter[] = [];
  sortParams: SortParam[] = [];

  constructor(options?: {
    stringFilters?: any[];
    booleanFilters?: any[];
    numericFilters?: any[];
    dateFilters?: any[];
    listFilters?: any[];
    sortParams?: any[];
  }) {
    if (options) {
      if (options.stringFilters && options.stringFilters.length) {
        this.stringFilters = options.stringFilters.map((x: any) => new StringFilter(x));
      }

      if (options.booleanFilters && options.booleanFilters.length) {
        this.booleanFilters = options.booleanFilters.map((x: any) => new BooleanFilter(x));
      }

      if (options.numericFilters && options.numericFilters.length) {
        this.numericFilters = options.numericFilters.map((x: any) => new NumericFilter(x));
      }

      if (options.dateFilters && options.dateFilters.length) {
        this.dateFilters = options.dateFilters.map((x: any) => new DateFilter(x));
      }

      if (options.listFilters && options.listFilters.length) {
        this.listFilters = options.listFilters.map((x: any) => new ListFilter(x));
      }

      if (options.sortParams && options.sortParams.length) {
        this.sortParams = options.sortParams.map((x: any) => new SortParam(x));
      }
    }
  }

  static restore(cookie: string): any {
    const state = localStorage.getItem(cookie) || 'null';
    return JSON.parse(state);
  }

  save(cookieName: string): void {
    if (cookieName) {
      localStorage.setItem(cookieName, JSON.stringify(this));
    }
  }

  addListFilter(value: ListFilter): ListFilter {
    if (this.listFilters === null || this.listFilters === undefined) {
      this.listFilters = [];
    }
    const filter = this.listFilters.find((f) => f.field === value.field);
    if (filter === null || filter === undefined) {
      this.listFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addDateFilter(value: DateFilter): DateFilter {
    if (this.dateFilters === null || this.dateFilters === undefined) {
      this.dateFilters = [];
    }
    const filter = this.dateFilters.find((f) => f.field === value.field);
    if (filter === null || filter === undefined) {
      this.dateFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addStringFilter(value: StringFilter): StringFilter {
    if (this.stringFilters === null || this.stringFilters === undefined) {
      this.stringFilters = [];
    }
    const filter = this.stringFilters.find((f) => f.field === value.field);
    if (filter === null || filter === undefined) {
      this.stringFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addBooleanFilter(value: BooleanFilter): BooleanFilter {
    if (this.booleanFilters === null || this.booleanFilters === undefined) {
      this.booleanFilters = [];
    }
    const filter = this.booleanFilters.find((f) => f.field === value.field);
    if (filter === null || filter === undefined) {
      this.booleanFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addNumericFilter(value: NumericFilter): NumericFilter {
    if (this.numericFilters === null || this.numericFilters === undefined) {
      this.numericFilters = [];
    }
    const filter = this.numericFilters.find((f) => f.field === value.field);
    if (filter === null || filter === undefined) {
      this.numericFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  clear(): void {
    this.sortParams.length = 0;

    this.stringFilters.map((f: StringFilter) => {
      f.value = '';
    });
    this.booleanFilters.map((f: BooleanFilter) => {
      f.value = null;
    });
    this.dateFilters.map((f: DateFilter) => {
      f.value = new DateFilterValue({
        lessThan: null,
        greaterThan: null,
      });
    });
    this.numericFilters.map((f: NumericFilter) => {
      f.value = new NumericFilterValue({
        lessThan: null,
        greaterThan: null,
        equalsTo: null,
      });
    });
    this.listFilters.map((f: ListFilter) => {
      f.value = [];
      f.type = ListFilterType.None;
    });
  }
}
