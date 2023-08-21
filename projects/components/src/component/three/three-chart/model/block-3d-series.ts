import { Base3dSeries } from './base-3d-series';
import { Block3dPoint } from './block3d-point';
import { Series3dType } from './enum/series-3d-type';

export interface Block3dSeries extends Base3dSeries<Block3dPoint> {
  type: Series3dType.block;
}
