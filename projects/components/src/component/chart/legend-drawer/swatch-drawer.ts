import * as d3 from 'd3';
import { SeriesType } from '../model/enum/series-type';
import { ILegendDrawer, LegendDrawOptions } from '../model/i-drawer-legend';
import { BasePoint } from '../model/point/base-point';
import { BarPoint } from '../model/point/bar-point';

const classTypeLegendMapping = new Map<SeriesType, string>()
  .set(SeriesType.line, 'line')
  .set(SeriesType.spline, 'line');

export class SwatchDrawer implements ILegendDrawer {
  draw(options: LegendDrawOptions<BasePoint | BarPoint>): void {
    d3.select(options.context.parentElement)
      .select('.legend-container')
      .selectAll('.legend')
      .remove();

    const defaultData = options.series?.filter(
      (serie) => serie.type !== SeriesType.bar
    );
    const barData = options?.series
      ?.filter((serie) => serie.type === SeriesType.bar)
      .reduce((acc, serie) => {
        const data = serie.data.map((_) => ({
          ..._,
          serieType: serie.type,
          serieIndex: serie.id,
        }));

        return acc.concat(data);
      }, []);

    const legendContainer = d3
      .select(options.context.parentElement)
      .select('.legend-container')
      .append('div')
      .attr('class', 'legend padding-bottom-4');

    const defaultLegend = legendContainer
      .selectAll('div')
      .data(defaultData)
      .enter()
      .append('div')
      .attr('class', 'item')
      .style('user-select', 'none');

    const barLegend = legendContainer
      .selectAll('.bar')
      .data(barData)
      .enter()
      .append('div')
      .attr('class', 'item bar')
      .style('user-select', 'none');

    defaultLegend
      .append('div')
      .attr('class', (_) => classTypeLegendMapping.get(_.type) || 'swatch')
      .style('background', (_) =>
        _.visible ? _.color ?? 'black' : 'var(--color-text-10)'
      );

    defaultLegend
      .append('div')
      .attr('class', 'label')
      .text((_) => _.name ?? 'Без названия')
      .style('text-decoration', (_) => (_.visible ? 'unset' : 'line-through'));

    barLegend
      .append('div')
      .attr('class', 'swatch')
      .style('background', (_) =>
        _.visible ? _.color ?? 'black' : 'var(--color-text-10)'
      );

    barLegend
      .append('div')
      .attr('class', 'label')
      .text((_) => _.label ?? 'Без названия')
      .style('text-decoration', (_) => (_.visible ? 'unset' : 'line-through'));
  }
}
