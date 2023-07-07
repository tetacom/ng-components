import {FilterItem} from '../../filter/contarct/filter-item';
import {FilterType} from '../../filter/enum/filter-type.enum';
import {StringFilterType} from '../../filter/enum/string-filter-type.enum';
import {ListFilterType} from '../../filter/enum/list-filter-type.enum';
import {AggregationType} from '../enum/aggregation-type.enum';
import {ICellInstance} from './i-cell-instance';
import {HeadDropdownTabConfig} from './head-dropdown-tab';

export class TableColumn extends FilterItem {
  /**
   * Ширина
   */
  width = 80;
  /**
   * Коэффициент растяжения ячейки
   */
  flex = 1;
  /**
   * Стобец закреплен
   */
  locked: boolean;
  /**
   * Название столбца в строке результатов
   */
  // override name: string = '';
  /**
   * Название столбца родителя
   */
  parentName: string;
  /**
   * Название столбца для заголовка таблицы
   */
  // override caption: string = '';
  /**
   * Единицы измерения
   */
  unit: string;
  unitMeasureParameterId: number;
  unitId: number;
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
  editable: boolean | ((coordinates: ICellInstance<any>) => boolean);
  /**
   * Компонент для рендера ячейки
   */
  cellComponent: any;
  /**
   * Компонент для рендера заголовка столбца ячейки
   */
  headCellComponent: any;
  /**
   * Custom head dropdown for column
   */
  headDropdownConfig: HeadDropdownTabConfig;
  /**
   * Дочерние колонки
   */
  override columns: TableColumn[] = [];

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
    unitMeasureParameterId?: number;
    unitId?: number;
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
    editable?: boolean | ((coordinates: ICellInstance<any>) => boolean);
    objectType?: boolean;
    cellComponent?: any;
    headCellComponent?: any;
    headDropdownConfig?: HeadDropdownTabConfig;
    filterComponent?: any;
    columns?: any[];
    aggregate?: AggregationType;
    defaultValue?: any;
    maxValue?: number;
    minValue?: number;
    required?: boolean;
  }) {
    super(options);
    this.width = options?.width ?? 80;
    this.flex = options?.flex ?? 1;
    this.headCellClass = options?.headCellClass ?? [];
    this.cellClass = options?.cellClass ?? [];
    this.locked = options?.locked ?? false;
    this.parentName = options?.parentName;
    this.unit = options?.unit ?? '';
    this.unitMeasureParameterId = options?.unitMeasureParameterId;
    this.unitId = options?.unitId;
    this.data = options?.data;
    this.editable = options?.editable ?? true;
    this.headCellComponent = options?.headCellComponent;
    this.headDropdownConfig = options?.headDropdownConfig;
    this.cellComponent = options?.cellComponent;
    this.aggregate = options?.aggregate;
    this.defaultValue = options?.defaultValue;
    this.maxValue = options?.maxValue;
    this.minValue = options?.minValue;
    this.required = options?.required;
    this.columns = options?.columns?.map((x) => new TableColumn(x)) ?? [];
  }
}
