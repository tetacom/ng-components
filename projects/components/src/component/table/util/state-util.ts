import { FilterState } from '../../filter/contarct/filter-state';
import { TableColumn } from '../contract/table-column';
import { SortParam } from '../../filter/contarct/sort-param';
import { FilterType } from '../../filter/enum/filter-type.enum';
import { SortEvent } from '../contract/sort-event';

export class StateUtil {
  static hasSortedColumns(state: FilterState): boolean {
    return state.sortParams && state.sortParams.length > 0;
  }

  static hasFilteredColumns(state: FilterState): boolean {
    let hasFilters = false;
    if (state.stringFilters && state.stringFilters.some((filter) => filter.value && filter.value.length)) {
      hasFilters = true;
    }
    if (state.listFilters && state.listFilters.some((filter) => filter.value && filter.value.length)) {
      hasFilters = true;
    }
    if (
      state.numericFilters &&
      state.numericFilters.some(
        (filter) =>
          filter &&
          filter.value &&
          ((filter.value.lessThan !== null && filter.value.lessThan !== undefined) ||
            (filter.value.greaterThan !== null && filter.value.greaterThan !== undefined) ||
            (filter.value.equalsTo !== null && filter.value.equalsTo !== undefined)),
      )
    ) {
      hasFilters = true;
    }
    if (
      state.dateFilters &&
      state.dateFilters.some(
        (filter) =>
          filter &&
          filter.value &&
          ((filter.value.lessThan !== null && filter.value.lessThan !== undefined) ||
            (filter.value.greaterThan !== null && filter.value.greaterThan !== undefined)),
      )
    ) {
      hasFilters = true;
    }

    return hasFilters;
  }

  static getSortState(state: FilterState, column: TableColumn): SortParam | null {
    if (state?.sortParams && state.sortParams.length) {
      const param = state.sortParams.find((x) => x.field === column.sortField);
      if (param) {
        return param;
      }
    }
    return null;
  }

  static isColumnFiltered(state: FilterState, column: TableColumn): boolean {
    if (!column.filterable) {
      return false;
    }
    let filtered = false;
    switch (column.filterType) {
      case FilterType.string:
        if (state?.stringFilters) {
          const filter = state.stringFilters.find((x) => x.field === column.filterField);
          if (filter && filter.value && filter.value.length) {
            filtered = true;
          }
        }
        break;
      case FilterType.list:
        if (state?.listFilters) {
          const filter = state.listFilters.find((x) => x.field === column.filterField);
          if (filter && filter.value && filter.value.length) {
            filtered = true;
          }
        }
        break;
      case FilterType.number:
        if (state?.numericFilters) {
          const filter = state.numericFilters.find((x) => x.field === column.filterField);
          if (
            filter &&
            filter.value &&
            ((filter.value.lessThan !== null && filter.value.lessThan !== undefined) ||
              (filter.value.greaterThan !== null && filter.value.greaterThan !== undefined) ||
              (filter.value.equalsTo !== null && filter.value.equalsTo !== undefined))
          ) {
            filtered = true;
          }
        }
        break;
      case FilterType.date:
        if (state?.dateFilters) {
          const filter = state.dateFilters.find((x) => x.field === column.filterField);
          if (
            filter &&
            filter.value &&
            ((filter.value.lessThan !== null && filter.value.lessThan !== undefined) ||
              (filter.value.greaterThan !== null && filter.value.greaterThan !== undefined))
          ) {
            filtered = true;
          }
        }
        break;
    }
    return filtered;
  }

  static sortColumn(sortEvent: SortEvent, state: FilterState): FilterState {
    const column = sortEvent.column;
    const shiftKey = sortEvent.shiftKey;
    const sort = state.sortParams.find((sortParam: SortParam) => sortParam.field === column.sortField);
    if (sort === null || sort === undefined) {
      if (!shiftKey) {
        state.sortParams.length = 0;
      }
      state.sortParams.push(new SortParam({ field: column.sortField, asc: true, order: 0 }));
    } else {
      if (!sort.asc) {
        state.sortParams = StateUtil.clearSortParam(sort, state.sortParams);
      } else {
        sort.asc = !sort.asc;
        if (!shiftKey) {
          state.sortParams = [sort];
        }
      }
    }
    return new FilterState(state);
  }

  static sortAsc(sortEvent: SortEvent, state: FilterState): FilterState {
    return StateUtil.sort(sortEvent, state, true);
  }

  static sortDesc(sortEvent: SortEvent, state: FilterState): FilterState {
    return StateUtil.sort(sortEvent, state, false);
  }

  static sort(sortEvent: SortEvent, state: FilterState, asc: boolean) {
    const column = sortEvent.column;
    const shiftKey = sortEvent.shiftKey;
    const sort = state.sortParams.find((sortParam: SortParam) => sortParam.field === column.sortField);
    if (sort) {
      state.sortParams = StateUtil.clearSortParam(sort, state.sortParams);
    }
    if (!shiftKey) {
      state.sortParams.length = 0;
    }
    state.sortParams.push(new SortParam({ field: column.sortField, asc: asc, order: 0 }));
    return new FilterState(state);
  }

  static clearSortParam(sort: SortParam, sortParams: SortParam[]) {
    const index = sortParams.indexOf(sort);
    sortParams.splice(index, 1);
    return sortParams;
  }

  static clearSort(column: TableColumn, state: FilterState): FilterState {
    state.sortParams = state.sortParams.filter((_) => _.field !== column.sortField);
    return new FilterState(state);
  }

  static clearAllSort(state: FilterState): FilterState {
    state.sortParams = [];
    return new FilterState(state);
  }
}
