import { IDrawer } from '../model/i-drawer';
import { BasePoint } from '../model/point/base-point';
import { Series } from '../model/series';
import * as d3 from 'd3';
import { ChartOptions } from '../model/chart-options';
import { IDragEvent } from '../model/i-drag-event';
import { DispatchType } from '../model/enum/dispatch-type';

export class LineDrawer implements IDrawer<BasePoint> {
  dispatch: d3.Dispatch<IDragEvent<Series<BasePoint>>>;

  constructor() {
    this.dispatch = d3.dispatch(DispatchType.moveLine, DispatchType.movePoint);
  }

  draw(
    series: Series<BasePoint>,
    context: d3.Selection<SVGElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any,
    options: ChartOptions
  ): void {
    const points = series.data;

    const markerPoints = points.filter((_) => _.marker);

    const path = d3
      .line<BasePoint>()
      .curve(series.curveType)
      .defined((d) => d.x != null && d.y != null)
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y));

    const seriesIndex = options.series.findIndex((_) => _.id === series.id);

    if (markerPoints?.length) {
      const emit = (event: DragEvent, target: BasePoint) => {
        this.dispatch.apply(DispatchType.movePoint, {
          target: series,
          point: {
            ...target,
          },
          event,
        });
      };

      context
        .selectAll('circle')
        .data(markerPoints)
        .enter()
        .append('circle')
        .attr('class', 'draggable-marker')
        .attr('r', (d) => d.marker?.style?.radius || 5)
        .attr('cx', function (d) {
          return scaleX(d.x);
        })
        .attr('cy', function (d) {
          return scaleY(d.y);
        })
        .style('cursor', 'pointer')
        .style('fill', (d) => d.marker?.style?.color || 'red')
        .attr('stroke', (d) => d.marker?.style?.stroke || 'none')
        .attr('stroke-width', (d) => d.marker?.style?.strokeWidth || 0);

      context.selectAll('.draggable-marker').call(
        d3.drag().on('drag start end', function dragged(event, d: BasePoint) {
          d.x = scaleX.invert(event.sourceEvent?.offsetX);
          d.y = scaleY.invert(event.sourceEvent?.offsetY);

          d3.select(this).attr('cx', scaleX(d.x)).attr('cy', scaleY(d.y));
          context.select('path').attr('d', path);

          emit(event, d);
        })
      );
    }

    context
      .append('path')
      .attr('class', (d: BasePoint) =>
        series?.drag.enable ? 'draggable' : null
      )
      .attr('data-draggable-id', seriesIndex)
      .attr('fill', 'none')
      .attr('stroke', series.color)
      .attr('stroke-dasharray', series?.strokeDasharray)
      .attr('stroke-width', series.strokeWidth ? series.strokeWidth : 1)
      .style('cursor', series?.drag?.enable ? 'move' : 'default')
      .datum(points)
      .attr('d', path as any);

    const u = context.append('g').attr('class', 'grabbers');

    const emit = (event: DragEvent, target: Series<BasePoint>) => {
      this.dispatch.apply(DispatchType.moveLine, {
        target,
        event,
      });
    };

    if (series.drag.enable) {
      u.selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('data-grabber-id', seriesIndex)
        .attr('stroke', series?.drag?.grabbers?.stroke ?? series?.color)
        .attr('stroke-width', series?.drag?.grabbers?.strokeWidth ?? 1)
        .attr('fill', series?.drag?.grabbers?.fill ?? series?.color)
        .attr('r', series?.drag?.grabbers?.radius ?? 4)
        .attr('cx', function (d) {
          return scaleX(d.x);
        })
        .attr('cy', function (d) {
          return scaleY(d.y);
        })
        .style('cursor', 'move')
        .call(
          d3.drag().on('start drag end', function (event, d: BasePoint) {
            d.x = scaleX.invert(event.sourceEvent?.offsetX);
            d.y = scaleY.invert(event.sourceEvent?.offsetY);
            d3.select(this).attr('cx', scaleX(d.x)).attr('cy', scaleY(d.y));

            context
              .select(`[data-draggable-id='${seriesIndex}']`)
              .attr('d', path);

            emit(event, series);

            if (series?.drag?.extendLine) {
              drawExtendedLine();
            }
          })
        );

      u.exit().remove();
    }

    const drawExtendedLine = () => {
      context.selectAll(`[data-extended-id='${seriesIndex}']`).remove();

      const p1 = points[0];
      const p2 = points[points.length - 1];

      const distance = Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p2.y, 2)
      );

      if (distance <= 0) {
        return;
      }

      const extendLength = 50;

      const extendedEndX = p2.x + ((p2.x - p1.x) / distance) * extendLength;
      const extendedEndY = p2.y + ((p2.y - p1.y) / distance) * extendLength;

      const extendedStartX = p1.x - ((p2.x - p1.x) / distance) * extendLength;
      const extendedStartY = p1.y - ((p2.y - p1.y) / distance) * extendLength;

      context
        .append('line')
        .attr('class', 'extendedLine')
        .attr('data-extended-id', seriesIndex)
        .attr('stroke', series?.color)
        .attr('stroke-width', series?.strokeWidth)
        .attr('stroke-dasharray', series?.strokeDasharray)
        .attr('x1', scaleX(p1.x))
        .attr('y1', scaleY(p1.y))
        .attr('x2', scaleX(extendedStartX))
        .attr('y2', scaleY(extendedStartY));

      context
        .append('line')
        .attr('class', 'extendedLine')
        .attr('data-extended-id', seriesIndex)
        .attr('stroke', series?.color)
        .attr('stroke-width', series?.strokeWidth)
        .attr('stroke-dasharray', series?.strokeDasharray)
        .attr('x1', scaleX(p2.x))
        .attr('y1', scaleY(p2.y))
        .attr('x2', scaleX(extendedEndX))
        .attr('y2', scaleY(extendedEndY));
    };

    if (series?.drag?.extendLine && points?.length) {
      drawExtendedLine();
    }
  }
}
