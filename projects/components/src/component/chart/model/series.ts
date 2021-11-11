import { BasePoint } from './point/base-point';
import { SeriesType } from './enum/series-type';
import { IDrawer } from './i-drawer';
import * as d3 from 'd3';

export class Series<T extends BasePoint> {
  id?: number | string;
  renderTo?: 'canvas' | 'svg';
  type: SeriesType;
  curveType?: d3.CurveFactoryLineOnly | d3.CurveFactory;
  data: T[];
  axisFormat?: () => void;
  name?: string;
  xAxisIndex?: number;
  yAxisIndex?: number;
  drawer?: IDrawer<T>;
  strokeWidth?: number;
  strokeDasharray?: string;
  visible?: boolean;
  color?: string;
  colorScale?: d3.ScaleSequential<any, any>;
  drag?: {
    enable?: boolean;
    extendLine?: boolean;
    grabbers?: {
      radius?: number;
      stroke?: string;
      fill?: string;
      strokeWidth?: string;
    };
  };
  extend?: boolean;
  showInLegend?: boolean;

  constructor(options?: {
    id?: number | string;
    renderTo?: 'canvas' | 'svg';
    type?: SeriesType;
    curveType?: d3.CurveFactoryLineOnly | d3.CurveFactory;
    data?: T[];
    axisFormat?: () => void;
    name?: string;
    xAxisIndex?: number;
    yAxisIndex?: number;
    drawer?: IDrawer<T>;
    strokeWidth?: number;
    strokeDasharray?: string;
    visible?: boolean;
    color?: string;
    colorScale?: d3.ScaleSequential<any, any>;
    drag?: {
      enable?: boolean;
      extendLine?: boolean;
      grabbers?: {
        radius?: number;
        stroke?: string;
        fill?: string;
        strokeWidth?: string;
      };
    };
    extend?: boolean;
    showInLegend?: boolean;
  }) {
    this.id = options?.id;
    this.renderTo = options?.renderTo ?? 'svg';
    this.type = options?.type != null ? options?.type : SeriesType.line;
    this.curveType =
      options?.curveType != null ? options?.curveType : d3.curveLinear;
    this.data = options?.data?.filter((_) => !isNaN(_.x) && !isNaN(_.y));
    this.axisFormat = options?.axisFormat;
    this.name = options?.name;
    this.xAxisIndex = options?.xAxisIndex != null ? options?.xAxisIndex : 0;
    this.yAxisIndex = options?.yAxisIndex != null ? options?.yAxisIndex : 0;
    this.drawer = options?.drawer;
    this.strokeWidth = options?.strokeWidth;
    this.strokeDasharray = options?.strokeDasharray ?? null;
    this.visible = options?.visible || true;
    this.color = options?.color ?? 'cyan';
    this.colorScale = options?.colorScale;
    this.drag = { enable: false, extendLine: false, ...options?.drag };
    this.showInLegend =
      options?.showInLegend != null ? options?.showInLegend : true;
    this.extend = options?.extend != null ? options?.extend : false;
  }
}
