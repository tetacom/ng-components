import {Series} from './series';
import {BasePoint} from './base-point';
import {Axis} from './axis';

export interface IChartConfig {
  name?: string;
  series?: Series<BasePoint>[];
  xAxis: Axis[];
  yAxis: Axis[];
  gridLines?: boolean;
  width?: number;
  height?: number;
}
