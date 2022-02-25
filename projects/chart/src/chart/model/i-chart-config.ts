import { Series } from './series';
import { BasePoint } from './base-point';
import { AxisOptions } from './axis-options';
import { ZoomType } from './enum/zoom-type';
import { TooltipOptions } from './tooltip-options';
import { ChartBounds } from './chart-bounds';
import { BrushType } from './enum/brush-type';
import { Annotation } from './annotation';

export interface IChartConfig {
  name?: string;
  series?: Series<BasePoint>[];
  zoom?: {
    enable: boolean;
    type: ZoomType;
    axisIndex?: number;
    syncChannel?: string;
  };
  brush?: {
    enable?: boolean;
    type: BrushType;
    from?: number;
    to?: number;
    limit?: number;
  };
  legend?: {
    enable?: boolean;
  };
  bounds?: ChartBounds;
  inverted?: boolean;
  tooltip?: TooltipOptions;
  xAxis: AxisOptions[];
  yAxis: AxisOptions[];
  annotations?: Annotation[];
  gridLines?: boolean;
  width?: number;
  height?: number;
}
