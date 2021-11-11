import { IDrawer } from '../model/i-drawer';
import { Series } from '../model/series';
import * as d3 from 'd3';
import { tricontour } from 'd3-tricontour';
import { ContourPoint } from '../model/point/contour-point';

export class ContourDrawer implements IDrawer<ContourPoint> {
  draw(
    series: Series<ContourPoint>,
    context: d3.Selection<SVGElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any
  ): void {
    const points = series.data;

    const tricontourFn = tricontour()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))
      .value((d) => d.value)
      .thresholds(30);

    let contours = tricontourFn(points);

    const geoFn = d3.geoPath();

    const color = series?.colorScale.domain(
      d3.extent(contours, (d: ContourPoint) => d.value) as any
    );

    contours = contours.map((_) => ({
      ..._,
      color: color(_.value),
    }));

    const u = context.selectAll('path').data(contours) as any;

    u.enter()
      .append('path')
      .merge(u as any)
      .attr('d', (_: any) => geoFn(_))
      .attr('stroke', 'rgba(255, 255,255,0.5)')
      .attr('stroke-width', 0.5)
      .attr('fill', (_: ContourPoint) => _.color);

    u.exit().remove();
  }
}
