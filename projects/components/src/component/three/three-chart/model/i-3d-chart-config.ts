import { Base3dSeries } from './base-3d-series';
import { Base3dThreePoint } from './base-3d-three-point';

export interface I3dChartConfig {
  series?: Base3dSeries<Base3dThreePoint>[];
  noDataText?: string;
  xAxis?: minMax;
  yAxis?: minMax;
  zAxis?: minMax;
}
interface minMax {
  min?: number;
  max?: number;
}
