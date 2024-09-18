import { FilterType } from '../enum/filter-type.enum';
import { StringFilterType } from '../enum/string-filter-type.enum';
import { ListFilterType } from '../enum/list-filter-type.enum';
import { StringUtil } from '../../../util/string-util';

export interface IFilterItemOptions {
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
}

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

  constructor(options?: IFilterItemOptions) {
    this.sortOrder = options?.sortOrder ?? Number.MAX_VALUE;
    this.name = options?.name ?? '';
    this.caption = options?.caption ?? this.name;
    this.hint = options?.hint ?? '';
    this.sortable = options?.sortable ?? true;
    this.filterable = options?.filterable ?? true;
    this.sortField = StringUtil.firstLetterToLower(options?.sortField ?? this.name);
    this.filterField = StringUtil.firstLetterToLower(options?.filterField ?? this.name);
    this.filterType = options?.filterType;
    this.stringFilterType = options?.stringFilterType ?? StringFilterType.Contains;
    this.listFilterType = options?.listFilterType ?? ListFilterType.None;
    this.strict = options?.strict ?? false;
    this.filterComponent = options?.filterComponent;
    this.columns = options?.columns?.map((_) => new FilterItem(_)) ?? [];
  }
}
