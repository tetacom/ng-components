import { IDrawer } from '../model/i-drawer';
import { BasePoint } from '../model/point/base-point';
import { Series } from '../model/series';
import * as d3 from 'd3';

export class AreaDrawer implements IDrawer<BasePoint> {
  draw(
    series: Series<BasePoint>,
    context: d3.Selection<SVGElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any
  ): void {
    const points = series.data;

    const path = d3
      .area()
      .x1((d: any) => (d.x1 != null ? scaleX(d.x1) : scaleX(0)))
      .x0((d: any) => scaleX(d.x))
      .y((d: any) => scaleY(d.y));

    context
      .append('path')
      .attr('transform', `translate(${0}, 0)`)
      .attr('fill', series.color)
      .attr('stroke', series.color)
      .attr('stroke-width', series.strokeWidth ? series.strokeWidth : 1)
      .datum(points)
      .attr('d', path as any);
  }
}
