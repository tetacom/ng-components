import {PagerState} from '../model/pager-state';

export class PagerUtil {
  static getPage<T>(data: T[], paging: PagerState): T[] {
    return data.slice(paging.page * paging.pageSize, (paging.page + 1) * paging.pageSize);
  }
}
