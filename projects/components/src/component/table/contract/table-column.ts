import {FilterItem} from '../../filter/contarct/filter-item';
import {FilterType} from '../../filter/enum/filter-type.enum';
import {StringFilterType} from '../../filter/enum/string-filter-type.enum';
import {ListFilterType} from '../../filter/enum/list-filter-type.enum';
import {TableRow} from './table-row';
import {AggregationType} from '../enum/aggregation-type.enum';

export class TableColumn extends FilterItem {
  /**
   * Ширина
   */
  width = 150;
  /**
   * Коэффициент растяжения ячейки
   */
  flex = 0;
  /**
   * Стобец закреплен
   */
  locked: boolean;
  /**
   * Название столбца в строке результатов
   */
  override name: string;
  /**
   * Название столбца родителя
   */
  parentName: string;
  /**
   * Название столбца для заголовка таблицы
   */
  override caption: string;
  /**
   * Единицы измерения
   */
  unit: string;
  /**
   * список style классов для шапки таблицы
   */
  headCellClass: string[];
  /**
   * список style классов для ячейки таблицы
   */
  cellClass: string[];
  /**
   * Дополнительные данные, свободное описание, доступны внутри компонета ячейки, можно прокинуть callback например
   */
  data: any;
  /**
   * Колонка доступна для редактирования
   */
  editable: boolean;
  /**
   * Компонент для рендера ячейки
   */
  cellComponent: any;
  /**
   * Компонент для рендера заголовка столбца ячейки
   */
  headCellComponent: any;
  /**
   * Группировать по этому столбцу
   */
  groupBy: boolean;
  /**
   * Порядок группировки
   */
  groupingOrder = 0;
  /**
   *
   */
  groupByFn: ((row: TableRow<any>) => string) | undefined;
  /**
   * Дочерние колонки
   */
  override columns: TableColumn[];

  /**
   * Aggregate type
   */
  aggregate: AggregationType;

  /**
   * Значение по умолчанию при создании записи
   */
  defaultValue: any;

  /**
   * Значение по умолчанию при создании записи
   */
  maxValue: number;

  /**
   * Значение по умолчанию при создании записи
   */
  minValue: number;

  /**
   * Поле обязательно для заполнения
   */
  required: boolean;

  /**
   * Инициализация из анонимного объекта
   */
  constructor(options?: {
    width?: number;
    flex?: number;
    sortOrder?: number;
    locked?: boolean;
    name?: string;
    parentName?: string;
    caption?: string;
    hint?: string;
    unit?: string;
    sortable?: boolean;
    sortField?: string;
    filterable?: boolean;
    filterField?: string;
    filterType?: FilterType | null;
    stringFilterType?: StringFilterType;
    listFilterType?: ListFilterType;
    strict?: boolean;
    headCellClass?: string[];
    cellClass?: string[];
    data?: any;
    editable?: boolean;
    objectType?: boolean;
    cellComponent?: any;
    headCellComponent?: any;
    filterComponent?: any;
    groupBy?: boolean;
    groupingOrder?: number;
    groupByFn?: (row: TableRow<any>) => string;
    columns?: any[];
    aggregate?: AggregationType;
    defaultValue?: any;
    maxValue?: number;
    minValue?: number;
    required?: boolean;
  }) {
    super(options);
    this.width = options?.width ?? 150;
    this.flex = options?.flex ?? 0;
    this.headCellClass = options?.headCellClass ?? [];
    this.cellClass = options?.cellClass ?? [];
    this.locked = options?.locked ?? false;
    this.parentName = options?.parentName;
    this.unit = options?.unit ?? '';
    this.data = options?.data;
    this.editable = options?.editable ?? true;
    this.groupBy = options?.groupBy ?? false;
    this.groupingOrder = options?.groupingOrder ?? 0;
    this.groupByFn = options?.groupByFn;
    this.headCellComponent = options?.headCellComponent;
    this.cellComponent = options?.cellComponent;
    this.aggregate = options?.aggregate;
    this.defaultValue = options?.defaultValue;
    this.maxValue = options?.maxValue;
    this.minValue = options?.minValue;
    this.required = options?.required;
    this.columns = options?.columns?.map((x) => new TableColumn(x)) ?? [];
  }
}
