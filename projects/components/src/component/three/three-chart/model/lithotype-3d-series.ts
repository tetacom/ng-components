import { Base3dSeries } from './base-3d-series';
import { Series3dType } from './enum/series-3d-type';
import { Lithotype3dPoint } from './lithotype-3d-point';

export interface Lithotype3dSeries extends Base3dSeries<Lithotype3dPoint> {
  type: Series3dType.lithotype;
}
