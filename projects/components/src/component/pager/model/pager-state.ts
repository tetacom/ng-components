export class PagerState {
  /**
   * Текущая страница
   */
  page = 0;

  /**
   * Количество записей на странице
   */
  pageSize = 30;
  /**
   * Количество страниц
   */
  count: number;
  /**
   * Количество записей
   */
  totalCount: number;
  /**
   * первая видимая страница
   */
  start: number;
  /**
   * Последняя видимая страница
   */
  end: number;
  /**
   * Список страниц
   */
  pages: number[];

  /**
   * Инициализация из анонимного объекта
   */
  constructor(options?: { page?: number; pageSize?: number; count?: number; totalCount?: number }) {
    if (options) {
      this.pageSize = options.pageSize || 30;
      this.count = options.count !== null && options.count !== undefined ? options.count : this.count;
      this.totalCount =
        options.totalCount !== null && options.totalCount !== undefined ? options.totalCount : this.totalCount;
      this.page = options.page !== null && options.page !== undefined ? options.page : 0;
      this.createPages();
    }
  }

  createPages() {
    if (this.page > this.count) {
      this.page = this.count > 0 ? this.count - 1 : 0;
    }

    let start = 0;
    let end = this.count - 1;
    if (this.count > 5) {
      start = this.page - 2;
      end = this.page + 2;
      if (start < 0) {
        start = 0;
        end = 4;
      }
      const rightShift = this.count - 1 - end;
      if (rightShift < 0) {
        start = this.count - 5;
        end = this.count - 1;
      }
    }

    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }

    this.start = start;
    this.end = end;
    this.pages = arr;
  }
}
