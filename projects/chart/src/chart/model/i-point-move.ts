import { Series } from './series';
import { BasePoint } from './base-point';

export interface IPointMove {
  series: Series<BasePoint>;
  point: BasePoint;
}
