import { Base3dSeriesComponent } from '../series/base3d-series.component';
import { Base3dThreePoint } from './base-3d-three-point';
import { Series3dType } from './enum/series-3d-type';

export interface Base3dSeries<T extends Base3dThreePoint> {
  name?: string;
  type: Series3dType;
  component?: typeof Base3dSeriesComponent;
  data: T[];
  visible?: boolean;
  color?: string;
}
