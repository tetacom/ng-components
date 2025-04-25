import { Type } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

import { FilterItem, IFilterItemOptions } from '../../filter/contarct/filter-item';
import { FilterType } from '../../filter/enum/filter-type.enum';
import { ListFilterType } from '../../filter/enum/list-filter-type.enum';
import { StringFilterType } from '../../filter/enum/string-filter-type.enum';
import { CellComponentBase } from '../base/cell-component-base';
import { AggregationType } from '../enum/aggregation-type.enum';
import { HeadDropdownTabConfig } from './head-dropdown-tab';
import { IColumnRow } from './i-cell-instance';

export interface ITableColumnOptions extends IFilterItemOptions {
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
  editable?: boolean | ((coordinates: IColumnRow<any>) => boolean);
  objectType?: boolean;
  cellComponent?: Type<CellComponentBase<any>>;
  headCellComponent?: any;
  headDropdownConfig?: HeadDropdownTabConfig;
  filterComponent?: any;
  columns?: any[];
  aggregate?: AggregationType;
  defaultValue?: any;
  maxValue?: number;
  minValue?: number;
  maxLength?: number;
  required?: boolean;
  fillPercentage?: boolean;
  validators?: ValidatorFn[];
}

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
   * Название столбца родителя
   */
  parentName: string;
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
  editable: boolean | ((coordinates: IColumnRow<any>) => boolean);
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
   * Максимальная длина
   */
  maxLength: number;
  /**
   * Поле обязательно для заполнения
   */
  required: boolean;
  /**
   * Показывать диашоамму в процентах от максимума столбца для ячейки с числом
   */
  fillPercentage: boolean;
  /**
   * Функции валидации
   */
  validators: ValidatorFn[];
  /**
   * Инициализация из анонимного объекта
   */
  constructor(options?: ITableColumnOptions) {
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
    this.maxLength = options?.maxLength;
    this.required = options?.required;
    this.fillPercentage = options?.fillPercentage;
    this.columns = options?.columns?.map((x) => new TableColumn(x)) ?? [];
    this.validators = options?.validators;
  }
}
