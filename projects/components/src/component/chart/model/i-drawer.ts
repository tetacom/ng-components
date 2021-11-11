import { BasePoint } from './point/base-point';
import { Series } from './series';
import * as d3 from 'd3';
import { ChartOptions } from './chart-options';
import { IDragEvent } from './i-drag-event';

export interface IDrawer<T extends BasePoint> {
  dispatch?: d3.Dispatch<IDragEvent<Series<T>>>;

  draw(
    series: Series<T>,
    drawContext:
      | d3.Selection<SVGElement, unknown, null, undefined>
      | d3.Selection<HTMLCanvasElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any,
    options: ChartOptions
  ): void;
}
