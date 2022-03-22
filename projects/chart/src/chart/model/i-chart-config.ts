import { Series } from './series';
import { BasePoint } from './base-point';
import { AxisOptions } from './axis-options';
import { ZoomType } from './enum/zoom-type';
import { TooltipOptions } from './tooltip-options';
import { ChartBounds } from './chart-bounds';
import { BrushType } from './enum/brush-type';
import { Annotation } from './annotation';
import {ZoomBehaviorType} from "./enum/zoom-behavior-type";

export interface IChartConfig {
  name?: string;
  id?: string;
  series?: Series<BasePoint>[];
  zoom?: {
    enable: boolean;
    type: ZoomType;
    axisIndex?: number;
    syncChannel?: string;
    min?: number;
    max?: number;
    limitTranslateByData?: boolean;
    limitZoomByData?: boolean;
    zoomBehavior?: ZoomBehaviorType
  };
  brush?: {
    enable?: boolean;
    type: BrushType;
    from?: number;
    to?: number;
    min?: number;
    max?: number
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
  gridLines?: {
    enable?: boolean;
    showX?: boolean;
    showY?: boolean;
  };
  width?: number;
  height?: number;
}
