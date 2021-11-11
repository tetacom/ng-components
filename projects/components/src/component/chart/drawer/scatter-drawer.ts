import { IDrawer } from '../model/i-drawer';
import { Series } from '../model/series';
import * as d3 from 'd3';
import { ScatterPoint } from '../model/point/scatter-point';
import { ChartOptions } from '../model/chart-options';

export class ScatterDrawer implements IDrawer<ScatterPoint> {
  private _virtualCanvas: any;
  private _colorToData = {};
  private _options: ChartOptions;
  private _context:
    | d3.Selection<SVGElement, unknown, null, undefined>
    | d3.Selection<HTMLCanvasElement, unknown, null, undefined>;

  draw(
    series: Series<ScatterPoint>,
    context:
      | d3.Selection<SVGElement, unknown, null, undefined>
      | d3.Selection<HTMLCanvasElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any,
    options: ChartOptions
  ): void {
    this._options = options;

    d3.select(context.node().parentNode as any).select('.virtual-canvas').remove();

    if (series.renderTo === 'canvas') {
      this._context = context;

      const height = context.node().clientHeight;
      const width = context.node().clientWidth;

      const points = series.data;

      const context2D = (context.node() as HTMLCanvasElement).getContext('2d');
      this._virtualCanvas = d3
        .select(context.node().parentNode as any)
        .append('canvas')
        .attr('class', 'virtual-canvas')
        .style('display', 'none');

      this._virtualCanvas.attr('width', width).attr('height', height);
      const virtualContext = this._virtualCanvas.node().getContext('2d');

      context.on('mouseout', () => {
        d3.select(this._context.node().parentNode as any)
          .select('.tooltip-chart')
          .style('display', 'none');

        context.on('mousemove', null);
      });

      context.on('mouseenter', () => {
        d3.select(this._context.node().parentNode as any)
          .select('.tooltip-chart')
          .style('display', null);
        context.on('mousemove', (e) => this.handleMouseMove(e));
      });

      points.forEach((d: any, idx) => {
        const color = this.getColor(idx);
        this._colorToData[color] = d;
        virtualContext.fillStyle = color;
        context2D.fillStyle = d.color;

        const cx = scaleX(d.x);
        const cy = scaleY(d.y);

        context2D.beginPath();
        context2D.arc(cx, cy, d.radius, 0, 2 * Math.PI);
        context2D.closePath();
        context2D.fill();

        virtualContext.beginPath();
        virtualContext.arc(cx, cy, d.radius, 0, 2 * Math.PI);
        virtualContext.closePath();
        virtualContext.fill();
      });
    }
  }

  private getColor(index) {
    return d3
      .rgb(
        Math.floor(index / 256 / 256) % 256,
        Math.floor(index / 256) % 256,
        index % 256
      )
      .toString();
  }

  private tooltipPosition(event) {
    const centerX = this._context.node().clientWidth / 2;
    const centerY = this._context.node().clientHeight / 2;

    const padding = { x: 10, y: 10 };

    const scene = {
      left: event.pageX > centerX ? 'initial' : `${event.pageX + padding.x}px`,
      top: event.pageY > centerY ? 'initial' : `${event.pageY + padding.y}px`,
      bottom:
        event.pageY > centerY
          ? `${window.innerHeight - event.pageY}px`
          : 'initial',
      right:
        event.pageX > centerX
          ? `${window.innerWidth - event.pageX + padding.x}px`
          : 'initial',
    };

    return scene;
  }

  private handleMouseMove(event: MouseEvent) {
    const mouse = d3.pointer(event);

    const virtualContext = this._virtualCanvas.node().getContext('2d');

    const image = virtualContext.getImageData(mouse[0], mouse[1], 1, 1);
    const color = d3.rgb.apply(null, image.data).toString();
    const possibleDatum = this._colorToData[color];

    const { top, right, bottom, left } = this.tooltipPosition(event);

    if (possibleDatum) {
      const formatted = this._options.tooltip?.format([possibleDatum]);
      d3.select(this._context.node().parentNode as any)
        .select('.tooltip-chart')
        .style('z-index', 3)
        .style('top', top)
        .style('right', right)
        .style('bottom', bottom)
        .style('left', left)
        .html(formatted);
    }
  }
}
