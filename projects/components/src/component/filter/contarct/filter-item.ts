import {FilterType} from '../enum/filter-type.enum';
import {StringFilterType} from '../enum/string-filter-type.enum';
import {ListFilterType} from '../enum/list-filter-type.enum';

export class FilterItem {
  /**
   * Порядковый номер
   */
  sortOrder: number = Number.MAX_VALUE;
  /**
   * Название столбца для заголовка таблицы
   */
  caption: string;
  /**
   * Подсказка
   */
  hint: string;
  /**
   * Название столбца в строке результатов
   */
  name: string;
  /**
   * Возможность сортировать поле
   */
  sortable = true;
  /**
   * Возможность фильтровать поле
   */
  filterable = true;
  /**
   * Поле для сортировки
   */
  sortField: string;
  /**
   * Поле для фильтрации
   */
  filterField: string;
  /**
   * Тип фильтра
   */
  filterType: FilterType | null;
  /**
   * Тип сравнения строкового фильтра
   */
  stringFilterType: StringFilterType;
  /**
   * Тип сравнения строкового фильтра
   */
  listFilterType: ListFilterType;
  /**
   * Строгое сравнение
   */
  strict: boolean;
  /**
   * Компонент для рендера фильтра
   */
  filterComponent: any;

  /**
   * Дочерние элементы
   */
  columns: FilterItem[];

  constructor(options?: {
    sortOrder?: number;
    name?: string;
    caption?: string;
    hint?: string;
    sortable?: boolean;
    sortField?: string;
    filterable?: boolean;
    filterField?: string;
    filterType?: FilterType | null;
    stringFilterType?: StringFilterType;
    listFilterType?: ListFilterType;
    strict?: boolean;
    filterComponent?: any;
    columns?: FilterItem[];
  }) {
    if (options) {
      this.sortOrder = options.sortOrder || Number.MAX_VALUE;
      this.name = options.name || '';
      this.caption = options.caption === null || options.caption === undefined ? this.name : options.caption;
      this.hint = options.hint === null || options.hint === undefined ? '' : options.hint;
      this.sortable = options.sortable === null || options.sortable === undefined ? true : options.sortable;
      this.filterable = options.filterable === null || options.filterable === undefined ? true : options.filterable;
      this.sortField = options.sortField === null || options.sortField === undefined ? this.name : options.sortField;
      this.filterField = options.filterField === null || options.filterField === undefined ? this.name : options.filterField;
      this.filterType = options.filterType === null || options.filterType === undefined ? null : options.filterType;
      this.stringFilterType = options.stringFilterType === null || options.stringFilterType === undefined
        ? StringFilterType.Contains
        : options.stringFilterType;
      this.listFilterType = options.listFilterType === null || options.listFilterType === undefined
        ? ListFilterType.None
        : options.listFilterType;
      this.strict = options.strict || false;
      this.filterComponent = options.filterComponent;
      if (options.columns && options.columns.length) {
        this.columns = options.columns.map(_ => new FilterItem(_));
      }
    }
  }
}
