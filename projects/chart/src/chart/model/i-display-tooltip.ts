import { BasePoint } from './base-point';
import { Series } from './series';

export interface IDisplayTooltip {
  point: BasePoint;
  series: Series<BasePoint>;
}
