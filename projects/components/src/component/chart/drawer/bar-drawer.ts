import { IDrawer } from '../model/i-drawer';
import { BasePoint } from '../model/point/base-point';
import { Series } from '../model/series';
import * as d3 from 'd3';
import { BarPoint } from '../model/point/bar-point';

export class BarDrawer implements IDrawer<BasePoint> {
  draw(
    series: Series<BarPoint>,
    context: d3.Selection<SVGElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any
  ): void {
    const points = series.data.filter((_) => _.visible);

    const barScale = d3
      .scaleBand<number>()
      .domain(d3.range(points.length))
      .range(scaleX.range())
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const u = context.selectAll('rect').data(points) as any;

    u.enter()
      .append('rect')
      .merge(u as any)
      .attr('x', (d: BasePoint, i) => barScale(i))
      .attr('y', (d: BasePoint) => scaleY(d.y))
      .attr('width', barScale.bandwidth())
      .attr('height', (d: BasePoint) => Math.abs(scaleY(0) - scaleY(d.y)))
      .attr('fill', (d: BasePoint) => d.color);

    u.exit().remove();
  }
}
