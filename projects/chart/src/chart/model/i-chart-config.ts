import { Series } from './series';
import { BasePoint } from './base-point';
import { AxisOptions } from './axis-options';
import { ZoomType } from './enum/zoom-type';
import { TooltipOptions } from './tooltip-options';

export interface IChartConfig {
  name?: string;
  series?: Series<BasePoint>[];
  zoom?: {
    enable: boolean;
    type: ZoomType;
    syncChannel?: string;
  };
  brush?: {
    enable: boolean;
  };
  legend?: {
    enable?: boolean;
  };
  inverted?: boolean;
  tooltip?: TooltipOptions;
  xAxis: AxisOptions[];
  yAxis: AxisOptions[];
  gridLines?: boolean;
  width?: number;
  height?: number;
}
