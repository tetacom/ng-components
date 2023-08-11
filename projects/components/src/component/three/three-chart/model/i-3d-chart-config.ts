import { Line3dSeries } from './line-3d-series';
import { Lithotype3dSeries } from './lithotype-3d-series';

export interface I3dChartConfig {
  series?: Line3dSeries[] | Lithotype3dSeries[];
  noDataText?: string;
  xAxis?: minMax;
  yAxis?: minMax;
  zAxis?: minMax;
}
interface minMax {
  min?: number;
  max?: number;
}
