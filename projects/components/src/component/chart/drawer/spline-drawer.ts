import { IDrawer } from '../model/i-drawer';
import { BasePoint } from '../model/point/base-point';
import { Series } from '../model/series';
import * as d3 from 'd3';

export class SplineDrawer implements IDrawer<BasePoint> {
  draw(
    series: Series<BasePoint>,
    context: d3.Selection<SVGElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any
  ): void {
    const points = series.data;

    const path = d3
      .line()
      .curve(d3.curveCatmullRom)
      .defined((d: any) => d.x != null && d.y != null)
      .x((d: any) => scaleX(d.x))
      .y((d: any) => scaleY(d.y));

    context
      .append('path')
      .attr('transform', `translate(${0}, 0)`)
      .attr('fill', 'none')
      .attr('stroke', series.color)
      .attr('stroke-width', series.strokeWidth ? series.strokeWidth : 1)
      .datum(points)
      .attr('d', path as any)
      .transition()
      .duration(750);
  }
}
