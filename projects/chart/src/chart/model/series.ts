import { BasePoint } from './base-point';
import { SeriesType } from './enum/series-type';
import { SeriesBaseComponent } from '../base/series-base.component';
import { SvgAttributes } from './svg-attributes';
import { FillType } from './enum/fill-type';

export interface Series<T extends BasePoint> {
  id?: number | string;
  type: SeriesType;
  data: T[];
  name?: string;
  xAxisIndex?: number;
  yAxisIndex?: number;
  component?: typeof SeriesBaseComponent;
  visible?: boolean;
  color?: string;
  fillType?: FillType;
  showInLegend?: boolean;
  style?: SvgAttributes;
}
