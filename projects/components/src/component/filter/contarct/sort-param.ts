export class SortParam {
  /**
   * Поле сортировки
   */
  field: string;
  /**
   * Направление (true: Asc, false: Desc)
   */
  asc: boolean;
  /**
   * Порядок сортировки
   */
  order: number;

  /**
   * Инициализация из анонимного объекта
   */
  constructor(options?: {
    field?: string;
    asc?: boolean;
    order?: number;
  }) {
    if (options) {
      this.field = options.field || this.field;
      this.asc = options.asc || false;
      this.order = options.order || this.order;
    }
  }
}
