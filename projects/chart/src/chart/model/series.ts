import { BasePoint } from './base-point';
import { SeriesType } from './enum/series-type';
import { SeriesBaseComponent } from '../base/series-base.component';

export interface Series<T extends BasePoint> {
  id?: number | string;
  type: SeriesType;
  data: T[];
  name?: string;
  xAxisIndex?: number;
  yAxisIndex?: number;
  component?: typeof SeriesBaseComponent;
  strokeWidth?: number;
  strokeDasharray?: string;
  visible?: boolean;
  color?: string;
  showInLegend?: boolean;
}
