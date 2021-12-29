import { AxisOptions } from './axis-options';
import { Series } from './series';
import { BasePoint } from './point/base-point';
import { TooltipOptions } from './tooltip-options';
import { ChartBounds } from './chart-bounds';
import { LegendType } from './enum/legend-type';
import { ZoomType } from './enum/zoom-type';
import { ZoomTransform } from 'd3';
import { Annotation } from './annotation';

export class ChartOptions {
  name: string;
  series?: Series<BasePoint>[];
  legend?: {
    type?: LegendType;
    visible?: boolean;
  };
  zoom?: {
    enable?: boolean;
    zoomType?: ZoomType;
    zoomTransform?: ZoomTransform;
  };
  tooltip?: TooltipOptions;
  xAxis: AxisOptions[];
  yAxis: AxisOptions[];
  gridLines?: boolean;
  width?: number;
  height?: number;
  bounds = new ChartBounds();
  annotations?: Annotation[];

  constructor(options?: {
    name?: string;
    series?: Series<BasePoint>[];
    zoom?: {
      enable?: boolean;
      zoomType?: ZoomType;
      zoomTransform?: ZoomTransform;
    };
    tooltip?: TooltipOptions;
    xAxis: AxisOptions[];
    yAxis: AxisOptions[];
    gridLines?: boolean;
    width?: number;
    height?: number;
    legend?: {
      type?: LegendType;
      visible?: boolean;
    };
    bounds?: ChartBounds;
    annotations?: Annotation[];
  }) {
    this.name = options?.name;
    this.zoom = {
      enable: false,
      zoomType: ZoomType.x,
      ...options?.zoom,
    };
    this.series = options?.series?.map((series, idx) => ({
      ...series,
      id: idx,
    }));
    this.zoom = { enable: false, zoomType: ZoomType.x, ...options?.zoom };
    this.series = options?.series?.map((series, idx) => new Series(series));
    this.tooltip = new TooltipOptions({ ...options?.tooltip });
    this.xAxis = options?.xAxis?.map((_) => new AxisOptions(_));
    this.yAxis = options?.yAxis?.map((_) => new AxisOptions(_));
    this.gridLines = options?.gridLines == null ? true : options.gridLines;
    this.width = options?.width;
    this.height = options?.height;
    this.legend = {
      ...options?.legend,
      visible: true,
      type: LegendType.swatches,
    };
    this.bounds = { ...this.bounds, ...options?.bounds };
    this.annotations = options?.annotations;
  }
}
