import { Series } from './series';
import { BasePoint } from './base-point';
import { AxisOptions } from './axis-options';
import { ZoomType } from './enum/zoom-type';

export interface IChartConfig {
  name?: string;
  series?: Series<BasePoint>[];
  zoom?: {
    enable: boolean;
    type: ZoomType;
    syncChannel?: string;
  };
  xAxis: AxisOptions[];
  yAxis: AxisOptions[];
  gridLines?: boolean;
  width?: number;
  height?: number;
}
