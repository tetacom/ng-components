import * as d3 from 'd3';
import { ILegendDrawer, LegendDrawOptions } from '../model/i-drawer-legend';
import { BasePoint } from '../model/point/base-point';

export class GradientDrawer implements ILegendDrawer {
  draw(options: LegendDrawOptions<BasePoint>): void {
    const container = d3
      .select(options.context.parentElement)
      .select('.legend-container');

    container.selectAll('.gradient-legend').remove();

    const svg = container
      .append('svg')
      .attr('class', 'gradient-legend')
      .attr('width', options.width)
      .attr('height', 32);

    svg.selectAll('.legend-defs').remove();

    const extent = d3.extent(
      options.series[0]?.data as any,
      (d: any) => d.value
    ) as any;

    const defs = svg.append('defs').attr('class', 'legend-defs') as any;

    const linearGradient = defs
      .append('linearGradient')
      .attr('id', 'legend-gradient');

    linearGradient
      .selectAll('stop')
      .data([...options.series[0]?.data].reverse())
      .enter()
      .append('stop')
      .attr(
        'offset',
        (d) => ((d.value - extent[0]) / (extent[1] - extent[0])) * 100 + '%'
      )
      .attr('stop-color', (d) => d.color);

    const g = svg.append('g').attr('class', 'gradient-legend');

    g.append('rect')
      .attr('width', options.width - 80)
      .attr('transform', 'translate(40, 0)')
      .attr('height', 4)
      .style('fill', 'url(#legend-gradient)');

    const xScale = d3
      .scaleLinear()
      .range([80, options.width - 80])
      .domain(extent)
      .nice();
    const tickCount = options.width / 80;

    const xAxis = d3.axisBottom(xScale).tickSize(8).ticks(tickCount);

    g.call(xAxis).call((node) => {
      node.select('.domain').remove();
      node.selectAll('line').remove();
    });
  }
}
