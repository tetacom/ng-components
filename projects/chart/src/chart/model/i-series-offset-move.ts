import { BasePoint } from './base-point';
import { Series } from './series';

export interface ISeriesOffsetMove {
  series: Series<BasePoint>;
  offsetPx: {
    x: number;
    y: number;
  };
  offsetValue: {
    x: number;
    y?: number;
  };
}
