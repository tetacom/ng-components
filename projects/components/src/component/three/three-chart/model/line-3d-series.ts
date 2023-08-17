import { Base3dSeries } from './base-3d-series';
import { Series3dType } from './enum/series-3d-type';
import { Line3dPoint } from './line-3d-point';

export interface Line3dSeries extends Base3dSeries<Line3dPoint> {
  type: Series3dType.line;
}
