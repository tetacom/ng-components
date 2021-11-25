import { Series } from './series';
import { BasePoint } from './base-point';
import { AxisOptions } from './axis-options';

export interface IChartConfig {
  name?: string;
  series?: Series<BasePoint>[];
  xAxis: AxisOptions[];
  yAxis: AxisOptions[];
  gridLines?: boolean;
  width?: number;
  height?: number;
}
