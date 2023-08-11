import { Base3dThreePoint } from './base-3d-three-point';
import { Series3dType } from './enum/series-3d-type';

export interface Base3dSeries<T extends Base3dThreePoint> {
  name?: string;
  type: Series3dType;
  data: T[];
  visible?: boolean;
  color?: string;
}
