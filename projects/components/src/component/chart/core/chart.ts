import { ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as d3 from 'd3';
import { D3ZoomEvent, zoomIdentity, ZoomTransform } from 'd3';
import * as d3annotation from 'd3-svg-annotation';
import { Scale } from '../model/enum/scale';
import { ChartOptions } from '../model/chart-options';
import { AxisOptions } from '../model/axis-options';
import { Series } from '../model/series';
import { BasePoint } from '../model/point/base-point';
import { SeriesType } from '../model/enum/series-type';
import { defaultDrawerMapping } from '../drawer/default-drawer-mapping';
import { defaultLegendDrawerMapping } from '../legend-drawer/default-drawer-legend-mapping';
import { LegendType } from '../model/enum/legend-type';
import { Axis } from './axis-creator';
import { AxisType } from '../model/enum/axis-type';
import { PlotLine } from '../model/plot-line';
import { PlotBand } from '../model/plot-band';
import { ScaleType } from '../model/enum/scale-type';
import { ZoomType } from '../model/enum/zoom-type';
import { IDragEvent } from '../model/i-drag-event';
import { DispatchType } from '../model/enum/dispatch-type';
import { IZoomEvent } from '../model/i-zoom-event';

type ChartSize = { width: number; height: number };

export class TetaChart {
  plotLinesMove: Observable<IDragEvent<PlotLine>>;
  plotBandsMove: Observable<IDragEvent<PlotBand>>;

  zoom: Observable<IZoomEvent>;
  seriesMove: Observable<IDragEvent<Series<BasePoint>>>;
  pointMove: Observable<IDragEvent<Series<BasePoint>>>;

  private plotLinesMove$: Subject<IDragEvent<PlotLine>> = new Subject<
    IDragEvent<PlotLine>
  >();
  private plotBandsMove$: Subject<IDragEvent<PlotBand>> = new Subject<
    IDragEvent<PlotBand>
  >();

  private seriesMove$: Subject<IDragEvent<Series<BasePoint>>> = new Subject<
    IDragEvent<Series<BasePoint>>
  >();
  private pointMove$: Subject<IDragEvent<Series<BasePoint>>> = new Subject<
    IDragEvent<Series<BasePoint>>
  >();

  private zoom$: Subject<IZoomEvent> = new Subject<IZoomEvent>();

  private _container: ElementRef = null;
  private _canvas: any;
  private _width = 0;
  private _height = 0;

  private _zoomYCache: Map<number, ZoomTransform> = new Map<
    number,
    ZoomTransform
  >();

  private _zoomXCache: Map<number, ZoomTransform> = new Map<
    number,
    ZoomTransform
  >();

  private _zoom = d3.zoom();
  private _commonZoomTransform: ZoomTransform;

  private visibleChartWindowWidth = 0;

  private _options: ChartOptions;
  private _xAxisList: Axis[];
  private _yAxisList: Axis[];
  private _xScales: Map<number, any> = new Map<number, any>();
  private _yScales: Map<number, any> = new Map<number, any>();

  private _clonedX = new Map<number, any>();
  private _clonedY = new Map<number, any>();

  private _chart: d3.Selection<any, unknown, null, undefined>;

  private offsetOpposite = 0;
  private offsetNonOpposite = 0;

  private uniqId: string;
  private _zoomAdded = false;

  constructor(options: ChartOptions, element: ElementRef) {
    this._options = options;
    this.selectNode(element);
    this.createTooltip();

    this.plotLinesMove = this.plotLinesMove$.asObservable();
    this.plotBandsMove = this.plotBandsMove$.asObservable();
    this.seriesMove = this.seriesMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();
    this.zoom = this.zoom$.asObservable();
  }

  public redraw(options?: ChartOptions) {
    if (options) {
      this._options = options;
    }

    this.createAxis();
    this.createScales();
    this.createMarkers();
    this.createVisibleWindow();
    this._redraw();
    this.drawLegend();

    if (this._commonZoomTransform) {
      this._chart.call(this._zoom.transform, this._commonZoomTransform);
    }

    if (!this._zoomAdded) {
      this.addZoom();
      this._zoomAdded = true;
    }

    this.addAxesZoom();
  }

  public setZoom(zoom: IZoomEvent) {
    if (!this._zoom) {
      return;
    }

    this._chart.call(this._zoom.transform, zoom?.zoomTransform ?? zoomIdentity);
  }

  public setSize(size: ChartSize = { width: 0, height: 0 }) {
    this._height = size.height;
    this._width = size.width;

    this._chart.attr('width', this._width).attr('height', this._height);
    this._canvas.attr('width', this._width).attr('height', this._height);

    const extent = [
      [
        this.offsetNonOpposite
          ? this.offsetNonOpposite
          : this._options.bounds.left,
        this._options.bounds.top,
      ],
      [
        this._width -
          (this.offsetOpposite
            ? this.offsetOpposite
            : this._options.bounds.right),
        this._height - this._options.bounds.bottom,
      ],
    ] as any;

    this._zoom
      .scaleExtent([1, Infinity])
      .translateExtent(extent)
      .extent(extent);
  }

  private createVisibleWindow() {
    this.uniqId = (Date.now() + Math.random()).toString(36);

    this._chart.selectAll('defs').remove();

    this._chart
      .append('defs')
      .append('clipPath')
      .attr('id', `draw-window-${this.uniqId}`)
      .append('rect')
      .attr(
        'x',
        this.offsetNonOpposite === 0
          ? this._options.bounds.left
          : this.offsetNonOpposite
      )
      .attr('y', this._options.bounds.top)
      .attr('width', this.visibleChartWindowWidth + 1)
      .attr(
        'height',
        this._height -
          this._options.bounds.bottom -
          this._options.bounds.top +
          1 >
          0
          ? this._height -
              this._options.bounds.bottom -
              this._options.bounds.top +
              1
          : 0
      );
  }

  private createAxis() {
    this._xAxisList = this._options.xAxis.map(
      (_, index) =>
        new Axis({
          type: AxisType.abscissa,
          index,
          chartOptions: this._options,
        })
    );

    this._yAxisList = this._options.yAxis.map((_, index) => {
      const axis = new Axis({
        type: AxisType.ordinatus,
        index,
        chartOptions: this._options,
        height: this._height,
      });
      return axis;
    });

    const nonTitleOffset = 6;

    this.offsetNonOpposite = d3.reduce(
      this._yAxisList.filter(
        (_) => _.options?.opposite !== true && _.options?.visible
      ),
      (sum, axis) => {
        const offset =
          sum +
          axis.width +
          (axis?.options?.title ? Axis.offsetFactor : nonTitleOffset);
        axis.setOffset(offset);
        return offset;
      },
      0
    );

    this.offsetOpposite = d3.reduce(
      this._yAxisList.filter(
        (_) => _.options?.opposite === true && _.options?.visible
      ),
      (sum, axis) => {
        const offset =
          sum +
          axis.width +
          (axis?.options?.title ? Axis.offsetFactor : nonTitleOffset);
        axis.setOffset(offset);
        return offset;
      },
      0
    );

    this.visibleChartWindowWidth = this.caluclateChartWidth();
  }

  private _redraw() {
    this.drawChart();
    this.drawAxis();
    this.drawGridLines();
    this.drawPlotBands();
    this.drawPlotLines();
    this.drawAnnotations();
  }

  private addZoom() {
    if (this._options?.zoom?.enable) {
      const hasXZoom = [ZoomType.x, ZoomType.xy].includes(
        this._options.zoom.zoomType
      );
      const hasYZoom = [ZoomType.y, ZoomType.xy].includes(
        this._options.zoom.zoomType
      );

      this._chart.call(
        this._zoom.on('start end zoom', (event) => {
          if (hasXZoom) {
            for (const [key, value] of this._clonedX.entries()) {
              const rescaled = event.transform.rescaleX(value);
              this._xScales.set(key, rescaled);

              if (event.sourceEvent) {
                this.zoom$.next({
                  domain: rescaled.domain(),
                  zoomTransform: event.transform,
                  zoomType: ZoomType.x,
                  event,
                });
              }
            }
          }

          if (hasYZoom) {
            for (const [key, value] of this._clonedY.entries()) {
              const rescaled = event.transform.rescaleY(value);
              this._yScales.set(key, rescaled);

              if (event.type === 'zoom') {
                if (event.sourceEvent) {
                  this.zoom$.next({
                    domain: rescaled.domain(),
                    zoomTransform: event.transform,
                    zoomType: ZoomType.y,
                    event,
                  });
                }
              }
            }
          }

          if (event.type === 'end') {
            this._commonZoomTransform = event.transform;
          }

          this._redraw();
        })
      );
    }
  }

  private addAxesZoom() {
    this._chart.selectAll('.zoom-behavior').remove();

    [...this._yAxisList, ...this._xAxisList]
      .filter((axis) => axis.options.visible && axis.options.zoom)
      .forEach((axis) => {
        const foundNode = this._chart
          .select(
            `[data-${axis.type === AxisType.abscissa ? 'x' : 'y'}-scale-id='${
              axis.index
            }']`
          )
          .node() as any;

        if (!foundNode) {
          return;
        }

        const bBox = foundNode.getBBox();

        const translateX =
          axis.type === AxisType.abscissa
            ? this.offsetNonOpposite
              ? this.offsetNonOpposite
              : this._options.bounds.left + this.offsetNonOpposite
            : axis.options.opposite
            ? this._width - axis.offset
            : axis.offset - bBox.width;

        const zoom = d3
          .zoom()
          .scaleExtent([1, Infinity])
          .on('zoom end', (event: D3ZoomEvent<any, any>) => {
            if (axis.type === AxisType.abscissa) {
              const scale = this._clonedX.get(axis.index);
              this._xScales.set(axis.index, event.transform.rescaleX(scale));
            } else {
              const scale = this._clonedY.get(axis.index);
              this._yScales.set(axis.index, event.transform.rescaleY(scale));
            }

            if (event.type === 'end') {
              if (axis.type === AxisType.ordinatus) {
                this._zoomYCache.set(axis.index, event.transform);
              }

              if (axis.type === AxisType.abscissa) {
                this._zoomXCache.set(axis.index, event.transform);
                this._chart.call(this._zoom.transform, event.transform);
              }
            }

            this._redraw();
          });

        const restoredTransform: ZoomTransform =
          axis.type === AxisType.ordinatus
            ? this._zoomYCache.get(axis.index)
            : this._zoomXCache.get(axis.index);

        this._chart
          .append('rect')
          .attr('class', 'zoom-behavior')
          .attr('height', bBox.height)
          .attr('width', bBox.width)
          .attr(
            'transform',
            `translate(${translateX}, ${
              axis.type === AxisType.abscissa
                ? this._height - this._options.bounds.bottom
                : this._options.bounds.top
            })`
          )
          .style('opacity', '0')
          .style('pointer-events', 'all')
          .call(zoom.transform, restoredTransform ?? d3.zoomIdentity)
          .call(zoom);
      });
  }

  private selectNode(element: ElementRef) {
    this._container = element;

    d3.select(element.nativeElement).selectAll('.tooltip-chart').remove();

    d3.select(element.nativeElement).selectAll('svg').remove();
    d3.select(element.nativeElement).selectAll('canvas').remove();

    this._chart = d3
      .select(element.nativeElement)
      .append('svg')
      .attr('position', 'relative')
      .style('z-index', 0);

    this._canvas = d3
      .select(element.nativeElement)
      .append('canvas')
      .attr('class', 'main-canvas')
      .style('transform', 'translate(35, 0)')
      .style('position', 'absolute')
      .style('z-index', 1);
  }

  private drawAnnotations() {
    this._chart.selectAll('.annotations').remove();

    const annotations = this._options.annotations?.map((annotation) => {
      const x = this._xScales.get(annotation.xAxisIndex);
      const y = this._yScales.get(annotation.yAxisIndex);

      return {
        note: annotation.note,
        connector: annotation.connector,
        x: x(annotation.point?.x),
        y: y(annotation.point?.y),
        dx: annotation.dx,
        dy: annotation.dy,
        type: annotation.type,
        className: annotation.className,
      };
    });

    const makeAnnotations = d3annotation
      .annotation()
      .annotations(annotations ?? []);

    this._chart
      .append('g')
      .attr('class', 'annotations')
      .attr('clip-path', `url(#draw-window-${this.uniqId})`)
      .call(makeAnnotations as any)
      .lower();
  }

  private drawPlotLines() {
    this._chart.selectAll('.plotlines').remove();

    const plotlineGroup = this._chart
      .append('g')
      .attr('class', 'plotlines')
      .style('shape-rendering', 'crispEdges')
      .attr('clip-path', `url(#draw-window-${this.uniqId})`);

    this._xAxisList
      .filter((_) => _.options.plotLines.length > 0)
      .forEach((axis) => {
        const [min, max] = axis.extent;
        const x = this._xScales.get(axis.index);

        const plotlinesPoints = axis.options.plotLines;

        const getTextCenterPointPx = (d: PlotLine, idx: number) =>
          x(
            (d?.value +
              (plotlinesPoints[idx - 1]
                ? plotlinesPoints[idx - 1]?.value
                : 0)) /
              2
          );

        const opacity = (d: PlotLine, idx: number) => {
          const displayWidth = 20;

          const width =
            x(d?.value) -
            x(plotlinesPoints[idx - 1] ? plotlinesPoints[idx - 1]?.value : 0);
          return width <= displayWidth ? 0 : 1;
        };

        plotlineGroup
          .selectAll('.label')
          .data(plotlinesPoints)
          .join('text')
          .attr('class', 'label font-body-3 fill-text-70')
          .attr('x', getTextCenterPointPx)
          .attr('y', (d) => this._height / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr(
            'transform',
            (d, idx) =>
              `rotate(-90, ${getTextCenterPointPx(d, idx)}, ${
                this._height / 2
              })`
          )
          .text((d) => d?.label ?? '')
          .style('opacity', opacity);

        plotlineGroup
          .selectAll('.plotline')
          .data(plotlinesPoints)
          .join('line')
          .attr('class', 'plotline')
          .attr('data-plotline-id', (d) => d.id)
          .attr('x1', (d) => x(d.value))
          .attr('x2', (d) => x(d.value))
          .attr('y1', 0)
          .attr(
            'y2',
            this._height -
              this._options.bounds.top -
              this._options.bounds.bottom
          )
          .attr('transform', `translate(0, ${this._options.bounds.top})`)
          .style('stroke-width', (d) => d.width)
          .style('stroke', (d) => d.color)
          .style('stroke-dasharray', (d) => (d.dashed ? '8, 8' : '0, 0'));

        const emit = (event: DragEvent, plotLine: PlotLine) => {
          this.plotLinesMove$.next({ event, target: plotLine });
        };

        plotlineGroup
          .selectAll('.drag-plotline')
          .data(plotlinesPoints)
          .join('line')
          .attr('class', 'drag-plotline')
          .attr('x1', (d) => x(d.value))
          .attr('x2', (d) => x(d.value))
          .attr('y1', 0)
          .attr(
            'y2',
            this._height -
              this._options.bounds.top -
              this._options.bounds.bottom
          )
          .attr('transform', `translate(0, ${this._options.bounds.top})`)
          .style('stroke-width', 8)
          .style('stroke', 'rgba(0, 0, 0, 0)')
          .style('cursor', 'col-resize')
          .call(
            d3
              .drag()
              .on('drag', function (event, d: PlotLine) {
                const group = d3.select(this).node().parentElement;

                const draggedPlotLine = d3
                  .select(group)
                  .select(`[data-plotline-id='${d.id}']`);

                d.value = x.invert(event.x);

                const minValue = d.min ?? min;
                const maxValue = d.max ?? max;

                const borderLeftReached = d.value <= minValue;
                const borderRightReached = d.value >= maxValue;

                if (borderLeftReached) {
                  d.value = minValue;
                }

                if (borderRightReached) {
                  d.value = maxValue;
                }

                d3.select(this).attr('x1', x(d.value)).attr('x2', x(d.value));

                draggedPlotLine.attr('x1', x(d.value)).attr('x2', x(d.value));

                emit(event, d);
              })
              .on('end', (event: DragEvent, d: PlotLine) => {
                emit(event, d);
              }) as any
          );
      });

    this._yAxisList
      .filter((_) => _.options.plotLines.length > 0)
      .forEach((axis) => {
        const [min, max] = axis.extent;
        const y = this._yScales.get(axis.index);

        const plotlinesPoints = axis.options.plotLines;

        plotlineGroup
          .selectAll('.plotline')
          .data(plotlinesPoints)
          .join('line')
          .attr('class', 'plotline')
          .attr('data-plotline-id', (d) => d.id)
          .attr('y1', (d) => y(d.value))
          .attr('y2', (d) => y(d.value))
          .attr('x1', 0)
          .attr(
            'x2',
            this._width - this._options.bounds.left - this._options.bounds.right
          )
          .attr('transform', `translate(${this._options.bounds.left}, 0)`)
          .style('stroke-width', (d) => d.width)
          .style('stroke', (d) => d.color)
          .style('stroke-dasharray', (d) => (d.dashed ? '8, 8' : '0, 0'));

        const emit = (event: DragEvent, plotLine: PlotLine) => {
          this.plotLinesMove$.next({ event, target: plotLine });
        };

        plotlineGroup
          .selectAll('.drag-plotline')
          .data(plotlinesPoints)
          .join('line')
          .attr('class', 'drag-plotline')
          .attr('y1', (d) => y(d.value))
          .attr('y2', (d) => y(d.value))
          .attr('x1', 0)
          .attr(
            'x2',
            this._width - this._options.bounds.left - this._options.bounds.right
          )
          .attr('transform', `translate(${this._options.bounds.left}, 0)`)
          .style('stroke-width', 8)
          .style('stroke', 'rgba(0, 0, 0, 0)')
          .style('cursor', 'row-resize')
          .call(
            d3
              .drag()
              .on('drag', function (event, d: PlotLine) {
                const group = d3.select(this).node().parentElement;

                const draggedPlotLine = d3
                  .select(group)
                  .select(`[data-plotline-id='${d.id}']`);

                d.value = y.invert(event.y);

                const minValue = d.min ?? min;
                const maxValue = d.max ?? max;

                const borderTopReached = d.value <= minValue;
                const borderBottomReached = d.value >= maxValue;

                if (borderTopReached) {
                  d.value = minValue;
                }

                if (borderBottomReached) {
                  d.value = maxValue;
                }

                d3.select(this).attr('y1', y(d.value)).attr('y2', y(d.value));

                draggedPlotLine.attr('y1', y(d.value)).attr('y2', y(d.value));

                emit(event, d);
              })
              .on('end', (event: DragEvent, d: PlotLine) => {
                emit(event, d);
              }) as any
          );
      });
  }

  private drawPlotBands() {
    this._chart.selectAll('.plotbands').remove();

    const plotBandGroup = this._chart
      .append('g')
      .attr('class', 'plotbands')
      .attr('clip-path', `url(#draw-window-${this.uniqId})`);

    this._xAxisList
      .filter((_) => _.options.plotBands.length > 0)
      .forEach((axis) => {
        const x = this._xScales.get(axis.index);

        const [min, max] = axis.extent;

        const plotband = plotBandGroup
          .append('g')
          .style('shape-rendering', 'crispEdges');

        const plotBandHeight =
          this._height - this._options.bounds.top - this._options.bounds.bottom;

        const emit = (event: DragEvent, plotBand: PlotBand) => {
          this.plotBandsMove$.next({
            event,
            target: plotBand,
          });
        };

        plotband
          .selectAll('rect')
          .data(axis.options.plotBands)
          .on('start', (_) => {
            this._chart.selectAll('.marker').style('display', 'none');
            d3.select(this._container.nativeElement)
              .select('.tooltip-chart')
              .style('display', 'none');
          })
          .join('rect')
          .attr('data-plotband-id', (d) => d.id)
          .attr('x', (d) => x(d.from))
          .attr('y', 0)
          .attr('width', (d) => Math.abs(x(d.to) - x(d.from)))
          .attr('fill', (d) => {
            if (d.image) {
              return `url(#${d.image})`;
            }
            return d.color;
          })
          .style('opacity', (d) => d.opacity ?? 1)
          .attr('height', plotBandHeight > 0 ? plotBandHeight : 0)
          .attr('transform', `translate(0, ${this._options.bounds.top})`);

        plotband
          .selectAll('.line-left')
          .data(axis.options.plotBands)
          .join('line')
          .attr('data-line-left-id', (d) => d.id)
          .attr('class', 'line-left')
          .attr('x1', (d) => x(d.from))
          .attr('x2', (d) => x(d.from))
          .attr('y1', 0)
          .attr(
            'y2',
            this._height -
              this._options.bounds.top -
              this._options.bounds.bottom
          )
          .attr('transform', `translate(0, ${this._options.bounds.top})`)
          .style('stroke-width', 1)
          .style('stroke-dasharray', '8, 8')
          .style('stroke', 'var(--color-text-90)')
          .style('opacity', (d) => (d.showGrabbers ? 1 : 0));

        plotband
          .selectAll('.drag-left')
          .data(axis.options.plotBands)
          .join('line')
          .attr('x1', (d) => x(d.from))
          .attr('x2', (d) => x(d.from))
          .attr('y1', 0)
          .attr(
            'y2',
            this._height -
              this._options.bounds.top -
              this._options.bounds.bottom
          )
          .attr('transform', `translate(0, ${this._options.bounds.top})`)
          .style('stroke-width', 8)
          .style('stroke', 'rgba(0, 0, 0, 0)')
          .style('cursor', 'col-resize')
          .call(
            d3
              .drag()
              .on('drag', function (event: DragEvent, d: PlotBand) {
                const group = d3.select(this).node().parentElement;
                const draggedBand = d3
                  .select(group)
                  .select(`[data-plotband-id='${d.id}']`);

                const draggedLine = d3
                  .select(group)
                  .select(`[data-line-left-id='${d.id}']`);

                d.from = x.invert(event.x);

                const minValue = d.min ?? min;

                const borderReached = d.from <= minValue;

                if (borderReached) {
                  d.from = minValue;
                }

                if (d.from >= d.to) {
                  d.from = d.to;
                }

                d3.select(this).attr('x1', x(d.from)).attr('x2', x(d.from));

                draggedBand
                  .attr('x', x(d.from))
                  .attr('width', x(d.to) - x(d.from));

                draggedLine.attr('x1', x(d.from)).attr('x2', x(d.from));

                emit(event, d);
              })
              .on('end', (event: DragEvent, d: PlotBand) =>
                emit(event, d)
              ) as any
          );

        plotband
          .selectAll('.line-right')
          .data(axis.options.plotBands)
          .join('line')
          .attr('data-line-right-id', (d) => d.id)
          .attr('class', 'line-right')
          .attr('x1', (d) => x(d.to))
          .attr('x2', (d) => x(d.to))
          .attr('y1', 0)
          .attr(
            'y2',
            this._height -
              this._options.bounds.top -
              this._options.bounds.bottom
          )
          .attr('transform', `translate(0, ${this._options.bounds.top})`)
          .style('stroke-width', 1)
          .style('stroke-dasharray', '8, 8')
          .style('stroke', 'var(--color-text-90)')
          .style('opacity', (d) => (d.showGrabbers ? 1 : 0));

        plotband
          .selectAll('.drag-right')
          .data(axis.options.plotBands)
          .join('line')
          .attr('class', 'drag-right')
          .attr('x1', (d) => x(d.to))
          .attr('x2', (d) => x(d.to))
          .attr('y1', 0)
          .attr(
            'y2',
            this._height -
              this._options.bounds.top -
              this._options.bounds.bottom
          )
          .attr('transform', `translate(0, ${this._options.bounds.top})`)
          .style('stroke-width', 8)
          .style('stroke', 'rgba(0, 0, 0, 0)')
          .style('cursor', 'col-resize')
          .call(
            d3
              .drag()
              .on('drag', function (event: DragEvent, d: PlotBand) {
                const group = d3.select(this).node().parentElement;

                const draggedBand = d3
                  .select(group)
                  .select(`[data-plotband-id='${d.id}']`);

                const draggedLine = d3
                  .select(group)
                  .select(`[data-line-right-id='${d.id}']`);

                d.to = x.invert(event.x);

                const maxValue = d.max ?? max;

                const borderReached = d.to >= maxValue;

                if (borderReached) {
                  d.to = maxValue;
                }

                if (d.to <= d.from) {
                  d.to = d.from;
                }

                d3.select(this).attr('x1', x(d.to)).attr('x2', x(d.to));
                draggedBand.attr('width', x(d.to) - x(d.from));
                draggedLine.attr('x1', x(d.to)).attr('x2', x(d.to));

                emit(event, d);
              })
              .on('end', (event: DragEvent, d: PlotBand) =>
                emit(event, d)
              ) as any
          );
      });

    this._yAxisList
      .filter((_) => _.options.plotBands.length > 0)
      .forEach((axis) => {
        const y = this._yScales.get(axis.index);

        const [min, max] = axis.extent;

        const plotband = plotBandGroup
          .append('g')
          .style('shape-rendering', 'crispEdges');

        const plotBandWidth =
          this._width - this._options.bounds.left - this._options.bounds.right; // TODO add multiaxis support width

        const emit = (event: DragEvent, plotBand: PlotBand) => {
          this.plotBandsMove$.next({
            event,
            target: plotBand,
          });
        };

        const dragPlotband = d3
          .drag()
          .subject(function () {
            const element = d3.select(this);
            return { y: element.attr('y') };
          })
          .on('start drag end', function (event: any, d: PlotBand) {
            const element = d3.select(this);

            const height = parseFloat(element.attr('height'));

            d.to = y.invert(event.y + height);
            d.from = y.invert(event.y);

            const minValue = d.min ?? min;
            const maxValue = d.max ?? max;

            const borderReachedMin = d.from <= minValue;
            const borderReachedMax = d.to >= maxValue;

            if (borderReachedMin) {
              d.to = y.invert(y(minValue) + height);
              d.from = minValue;
            }

            if (borderReachedMax) {
              d.to = maxValue;
              d.from = y.invert(y(maxValue) - height);
            }

            element.attr('y', y(d.from));

            const group = element.node().parentElement;

            d3.select(group)
              .select(`[data-line-left-id='${d.id}']`)
              .attr('y1', y(d.from))
              .attr('y2', y(d.from));

            d3.select(group)
              .select(`[data-grab-left-id='${d.id}']`)
              .attr('y1', y(d.from))
              .attr('y2', y(d.from));

            d3.select(group)
              .select(`[data-line-right-id='${d.id}']`)
              .attr('y1', y(d.to))
              .attr('y2', y(d.to));

            d3.select(group)
              .select(`[data-grab-right-id='${d.id}']`)
              .attr('y1', y(d.to))
              .attr('y2', y(d.to));

            emit(event, d);
          }) as any;

        const leftGrabDrag = d3
          .drag()
          .on('drag', function (event: DragEvent, d: PlotBand) {
            const group = d3.select(this).node().parentElement;
            const draggedBand = d3
              .select(group)
              .select(`[data-plotband-id='${d.id}']`);

            const draggedLine = d3
              .select(group)
              .select(`[data-line-left-id='${d.id}']`);

            d.from = y.invert(event.y);

            const minValue = d.min ?? min;

            const borderReached = d.from <= minValue;

            if (borderReached) {
              d.from = minValue;
            }

            if (d.from >= d.to) {
              d.from = d.to;
            }

            d3.select(this).attr('y1', y(d.from)).attr('y2', y(d.from));

            draggedBand
              .attr('y', y(d.from))
              .attr('height', Math.abs(y(d.to) - y(d.from)));
            draggedLine.attr('y1', y(d.from)).attr('y2', y(d.from));

            emit(event, d);
          })
          .on('end', (event: DragEvent, d: PlotBand) => emit(event, d)) as any;

        const rightGrabDrag = d3
          .drag()
          .on('drag', function (event: DragEvent, d: PlotBand) {
            const group = d3.select(this).node().parentElement;

            const draggedBand = d3
              .select(group)
              .select(`[data-plotband-id='${d.id}']`);

            const draggedLine = d3
              .select(group)
              .select(`[data-line-right-id='${d.id}']`);

            d.to = y.invert(event.y);

            const maxValue = d.max ?? max;

            const borderReached = d.to >= maxValue;

            if (borderReached) {
              d.to = maxValue;
            }

            if (d.to <= d.from) {
              d.to = d.from;
            }

            d3.select(this).attr('y1', y(d.to)).attr('y2', y(d.to));

            draggedBand
              .attr('y', y(d.from))
              .attr('height', Math.abs(y(d.to) - y(d.from)));
            draggedLine.attr('y1', y(d.to)).attr('y2', y(d.to));

            emit(event, d);
          })
          .on('end', (event: DragEvent, d: PlotBand) => emit(event, d)) as any;

        plotband
          .selectAll('rect')
          .data(axis.options.plotBands)
          .join('rect')
          .attr('data-plotband-id', (d) => d.id)
          .attr('x', 0)
          .attr('y', (d) => y(d.from))
          .attr('width', (d) => plotBandWidth)
          .attr('fill', (d) => {
            if (d.image) {
              return `url(#${d.image})`;
            }
            return d.color;
          })
          .style('opacity', (d) => d.opacity ?? 1)
          .attr('height', (d) => Math.abs(y(d.to) - y(d.from)))
          .attr('cursor', (d) => (d.draggable ? 'move' : 'default'));

        plotband
          .selectAll('.line-left')
          .data(axis.options.plotBands.filter((d) => d.resizable))
          .join('line')
          .attr('data-line-left-id', (d) => d.id)
          .attr('class', 'line-left')
          .attr('y1', (d) => y(d.from))
          .attr('y2', (d) => y(d.from))
          .attr('x1', 0)
          .attr('x2', plotBandWidth)
          .style('stroke-width', 1)
          .style('stroke-dasharray', '8, 8')
          .style('stroke', 'var(--color-text-90)')
          .style('opacity', (d) => (d.showGrabbers ? 1 : 0));

        plotband
          .selectAll('.drag-left')
          .data(axis.options.plotBands.filter((d) => d.resizable))
          .join('line')
          .attr('data-grab-left-id', (d) => d.id)
          .attr('y1', (d) => y(d.from))
          .attr('y2', (d) => y(d.from))
          .attr('x1', 0)
          .attr('x2', plotBandWidth)
          .style('stroke-width', 8)
          .style('stroke', 'rgba(0, 0, 0, 0)')
          .style('cursor', (d) => (d.resizable ? 'row-resize' : 'default'));

        plotband
          .selectAll('.line-right')
          .data(axis.options.plotBands.filter((d) => d.resizable))
          .join('line')
          .attr('data-line-right-id', (d) => d.id)
          .attr('class', 'line-right')
          .attr('y1', (d) => y(d.to))
          .attr('y2', (d) => y(d.to))
          .attr('x1', 0)
          .attr('x2', plotBandWidth)
          .style('stroke-width', 1)
          .style('stroke-dasharray', '8, 8')
          .style('stroke', 'var(--color-text-90)')
          .style('opacity', (d) => (d.showGrabbers ? 1 : 0));

        plotband
          .selectAll('.drag-right')
          .data(axis.options.plotBands.filter((d) => d.resizable))
          .join('line')
          .attr('class', 'drag-right')
          .attr('data-grab-right-id', (d) => d.id)
          .attr('y1', (d) => y(d.to))
          .attr('y2', (d) => y(d.to))
          .attr('x1', 0)
          .attr('x2', plotBandWidth)
          .style('stroke-width', 8)
          .style('stroke', 'rgba(0, 0, 0, 0)')
          .style('cursor', (d) => (d.resizable ? 'row-resize' : 'default'));

        axis.options.plotBands.forEach((_) => {
          if (_.draggable) {
            plotband.select(`[data-plotband-id='${_.id}']`).call(dragPlotband);
          }

          if (_.resizable) {
            plotband.select(`[data-grab-left-id='${_.id}']`).call(leftGrabDrag);
            plotband
              .select(`[data-grab-right-id='${_.id}']`)
              .call(rightGrabDrag);
          }
        });
      });
  }

  private drawChart() {
    const series = this._options.series?.filter((_) => _.visible);

    this._chart.selectAll('.series').remove();

    if (!series || series.length < 1) {
      d3.select(this._container.nativeElement)
        .select('canvas')
        .style('display', 'none');
    }

    const group = this._chart
      .append('g')
      .attr('class', 'series')
      .attr('clip-path', `url(#draw-window-${this.uniqId})`);

    series?.forEach((seriesItem: Series<BasePoint>, index) => {
      if (seriesItem.renderTo === 'canvas') {
        d3.select(this._container.nativeElement)
          .select('canvas')
          .style('display', null);

        d3.select(this._container.nativeElement)
          .select('svg')
          .style('position', 'absolute');
      } else {
        d3.select(this._container.nativeElement)
          .select('canvas')
          .style('display', 'none');
      }
      if (
        !this._xScales.has(seriesItem.xAxisIndex) ||
        !this._yScales.has(seriesItem.yAxisIndex)
      ) {
        return;
      }

      const foundX = this._xScales.get(seriesItem.xAxisIndex);
      const foundY = this._yScales.get(seriesItem.yAxisIndex);

      const drawer =
        seriesItem.drawer != null
          ? seriesItem.drawer
          : defaultDrawerMapping.get(seriesItem.type);

      if (!drawer) {
        throw new Error(
          `No drawer for series ${seriesItem.name}, type ${
            SeriesType[seriesItem.type]
          }`
        );
      }

      if (seriesItem.renderTo === 'canvas') {
        const context = this._canvas.node().getContext('2d');
        context.clearRect(0, 0, this._width, this._height);
      }

      let [xMin, xMax] = foundX.domain();
      let [yMin, yMax] = foundY.domain();

      xMin = xMin instanceof Date ? xMin.getTime() : xMin;
      xMax = xMax instanceof Date ? xMax.getTime() : xMax;

      yMin = yMin instanceof Date ? yMin.getTime() : yMin;
      yMax = yMax instanceof Date ? yMax.getTime() : yMax;

      const visiblePoints = (
        point: BasePoint,
        idx: number,
        arr: Array<BasePoint>
      ) =>
        (point.x <= xMax ||
          point.x1 <= xMax ||
          (arr[idx - 1] && arr[idx - 1].x <= xMax) ||
          (arr[idx - 1] && arr[idx - 1].x1 <= xMax)) &&
        (point.x >= xMin ||
          point.x1 >= xMin ||
          (arr[idx + 1] && arr[idx + 1].x >= xMin) ||
          (arr[idx + 1] && arr[idx + 1].x1 >= xMin)) &&
        (point.y <= yMax ||
          point.y1 <= yMax ||
          (arr[idx - 1] && arr[idx - 1].y <= yMax) ||
          (arr[idx - 1] && arr[idx - 1].y1 <= yMax)) &&
        (point.y >= yMin ||
          point.y1 >= yMin ||
          (arr[idx + 1] && arr[idx + 1].y >= yMin) ||
          (arr[idx + 1] && arr[idx + 1].y1 >= yMin));

      const filteredData = seriesItem.data; //.filter(visiblePoints);

      const serie = {
        ...seriesItem,
        data: filteredData,
      };

      drawer.draw(
        serie,
        seriesItem.renderTo === 'canvas' ? this._canvas : group,
        foundX,
        foundY,
        this._options
      );

      const emit = (event: IDragEvent<Series<BasePoint>>) => {
        this.seriesMove$.next(event);
      };

      const emitPoint = (event: IDragEvent<Series<BasePoint>>) => {
        this.pointMove$.next(event);
      };

      drawer?.dispatch?.on(DispatchType.moveLine, function () {
        emit(this);
      });

      drawer?.dispatch?.on(DispatchType.movePoint, function () {
        emitPoint(this);
      });
    });
  }

  private createTooltip() {
    d3.select(this._container.nativeElement)
      .append('div')
      .attr('class', 'tooltip-chart color-text-90 bg-background-50 shadow-2')
      .style('position', 'fixed')
      .style('top', 'unset')
      .style('right', 'unset')
      .style('bottom', 'unset')
      .style('left', 'unset')
      .style('pointer-events', 'none')
      .style('display', 'none');
  }

  private handleMouseMove(options) {
    const mouse = d3.pointer(options.event);
    const { top, right, bottom, left } = this.tooltipPosition(options.event);

    const tooltipsData = [];

    this._chart
      .select('.marker-line')
      .attr('transform', `translate(${0}, ${mouse[1] - 2})`);

    this._chart
      .selectAll('.marker')
      .attr('transform', (d: Series<BasePoint>) => {
        if (!d.data.length) {
          return;
        }

        if (
          !this._xScales.has(d.xAxisIndex) ||
          !this._yScales.has(d.yAxisIndex)
        ) {
          return;
        }

        const foundX = this._xScales.get(d.xAxisIndex);
        const foundY = this._yScales.get(d.yAxisIndex);

        if (this._options.tooltip.tracking === 'x') {
          const [min, max] = foundX.domain();
          const filteredData = d.data.filter(
            (point) => point.x <= max && point.x >= min
          );

          const sorted = [...filteredData].sort((a, b) =>
            d3.ascending(a.x, b.x)
          );

          const bisect = d3.bisector((dd: any) => dd.x).left;
          const x0 = foundX.invert(mouse[0]);

          const index = bisect(sorted, x0);

          const data = sorted[index] ? sorted[index] : sorted[index - 1];

          tooltipsData.push({
            point: data,
            color: d.color,
            name: d.name,
          });

          return `translate(${
            !isNaN(data?.x) && data?.x != null ? foundX(data.x) : -10
          }, ${!isNaN(data?.y) && data?.y != null ? foundY(data.y) : -10})`;
        }

        if (this._options.tooltip.tracking === 'y') {
          const sorted = [...d.data].sort((a, b) => d3.ascending(a.y, b.y));
          const bisect = d3.bisector((dd: any) => dd.y).left;
          const y0 = foundY.invert(mouse[1]);

          const index = bisect(sorted, y0, 0);

          const data = sorted[index] ? sorted[index] : sorted[index - 1];

          tooltipsData.push({
            point: data,
            color: d.color,
            name: d.name,
          });

          return `translate(${
            !isNaN(data?.x) && data?.x != null ? foundX(data.x) : -10
          }, ${!isNaN(data?.y) && data?.y != null ? foundY(data.y) : -10})`;
        }
      });

    if (this._options.tooltip?.format) {
      const formatted = this._options.tooltip?.format(tooltipsData);

      d3.select(this._container.nativeElement)
        .select('.tooltip-chart')
        .style('top', top)
        .style('right', right)
        .style('bottom', bottom)
        .style('left', left)
        .html(formatted);
    }
  }

  private tooltipPosition(event) {
    const centerX = this._width / 2;
    const centerY = this._height / 2;

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

  private createMarkers() {
    if (this._options.tooltip === undefined) {
      return;
    }

    if (!this._options.tooltip.enable) {
      return;
    }

    this._chart.selectAll('.marker').remove();
    this._chart.select('.marker-line').remove();

    this._chart
      .append('line')
      .attr('class', 'marker-line')
      .attr('x1', 35)
      .attr('x2', this._width)
      .style('stroke-width', 0.5)
      .style('stroke', 'var(--color-text-40)')
      .style('display', 'none');

    const { series } = this._options;

    if (!series) {
      return;
    }

    const markers = this._chart
      .selectAll()
      .data(series.filter((_) => _.visible));
    markers
      .enter()
      .append('circle')
      .attr('class', 'marker')
      .attr('pointer-events', 'none')
      .attr('r', 3)
      .attr('fill', (_, i) => _.color)
      .style('display', 'none');

    const mouseoutEvent = () => {
      this._chart.selectAll('.marker').style('display', 'none');
      this._chart.select('.marker-line').style('display', 'none');

      d3.select(this._container.nativeElement)
        .select('.tooltip-chart')
        .style('display', 'none');
    };

    const mouseMoveEvent = (event) => {
      const options = {
        event,
        series,
      };

      this.handleMouseMove(options);
    };

    const mouseOverEvent = () => {
      if (this._options.tooltip.showMarkers) {
        this._chart
          .selectAll('.marker')
          .style('display', (d: Series<BasePoint>) => {
            if (d.data.length) {
              return null;
            }
            return 'none';
          });
      }

      if (this._options.tooltip.showLine) {
        this._chart.select('.marker-line').style('display', null);
      }

      d3.select(this._container.nativeElement)
        .select('.tooltip-chart')
        .style('display', null);
    };

    this._chart
      .on('mouseover', mouseOverEvent)
      .on('mousemove', mouseMoveEvent)
      .on('mouseleave', mouseoutEvent);
  }

  private drawLegend() {
    if (this._options.legend?.visible === false) {
      return;
    }

    this._chart.selectAll('.legend').remove();

    const drawer = this._options.legend?.type
      ? defaultLegendDrawerMapping.get(this._options.legend.type)
      : defaultLegendDrawerMapping.get(LegendType.swatches);

    const context = this._container.nativeElement as HTMLElement;

    if (!drawer) {
      throw new Error(
        `No drawer for legend
        }`
      );
    }

    drawer.draw({
      context,
      series: this._options.series.filter((_) => _.showInLegend),
      width: this._width,
      height: this._height,
    });
  }

  private caluclateChartWidth() {
    let width = -this._width;

    if (this.offsetOpposite > 0) {
      width = -this._width + this.offsetOpposite + this.offsetNonOpposite;
    }

    if (this.offsetNonOpposite > 0) {
      width =
        -this._width + this._options.bounds.right + this.offsetNonOpposite;
    }

    if (
      this.offsetOpposite >= Axis.offsetFactor &&
      this.offsetNonOpposite === 0
    ) {
      width = -this._width + this.offsetOpposite + this._options.bounds.left;
    }

    if (this.offsetOpposite > 0 && this.offsetNonOpposite > 0) {
      width = -this._width + this.offsetOpposite + this.offsetNonOpposite;
    }

    return Math.abs(width);
  }

  private drawGridLines() {
    if (this._options.gridLines === false) {
      return;
    }

    const translateX =
      this.offsetNonOpposite > 0
        ? this.offsetNonOpposite
        : this._options.bounds.left + this.offsetNonOpposite;

    this._chart.selectAll('.grid').remove();

    const yList = this._yAxisList.filter(
      (_) => _.options.visible && !_.options.opposite
    );

    const y: any =
      yList?.length > 0
        ? this._yScales.get(yList[yList.length - 1].index)
        : this._yScales.get(0);

    const x = this._xScales.get(0);

    if (!y || !x) {
      return;
    }

    const TICK_HEIGHT = 40;
    const TICK_WIDTH = 60;

    const tickCount = Math.round(this._height / TICK_HEIGHT);
    const tickCountX = Math.round(this._width / TICK_WIDTH);

    const gridY = this._chart
      .append('g')
      .attr('class', 'grid color-text-10')
      .style('shape-rendering', 'crispEdges');

    const gridlinesY = d3
      .axisLeft(y)
      .tickFormat('' as any)
      .tickSize(-this.visibleChartWindowWidth);

    const hasBarSeriesType = this._options.series.some(
      (_) => _.type === SeriesType.bar
    );

    if (!hasBarSeriesType) {
      const gridX = this._chart
        .append('g')
        .attr('class', 'grid color-text-10')
        .style('shape-rendering', 'crispEdges');

      const gridlinesX = d3
        .axisBottom(x)
        .ticks(tickCountX)
        .tickFormat('' as any)
        .tickSize(
          this._height - this._options.bounds.bottom - this._options.bounds.top
        );

      gridX
        .call(gridlinesX)
        .attr('transform', `translate(0, ${this._options.bounds.top})`)
        .lower();
    }

    gridY
      .call(gridlinesY)
      .attr('transform', `translate(${translateX}, ${0})`)
      .lower();

    this._chart.selectAll('.grid path').remove();
  }

  private createScales() {
    this._xScales.clear();
    this._yScales.clear();

    const defaultScaleMapping: Map<ScaleType, any> = new Map<ScaleType, any>()
      .set(ScaleType.linear, d3.scaleLinear)
      .set(ScaleType.log, d3.scaleLog)
      .set(ScaleType.sqrt, d3.scaleSqrt)
      .set(ScaleType.pow, d3.scalePow);

    const xRange = [
      this.offsetNonOpposite
        ? this.offsetNonOpposite
        : this._options.bounds.left,
      this._width -
        (this.offsetOpposite
          ? this.offsetOpposite
          : this._options.bounds.right),
    ];

    const yRange = [
      this._height - this._options.bounds.bottom,
      this._options.bounds.top,
    ];

    this._xAxisList.forEach((axis, index) => {
      let scale = null;

      if (axis.options.type === Scale.time) {
        scale = d3
          .scaleTime()
          .domain(axis.extent)
          .range(axis.options.inverted ? [...xRange].reverse() : xRange);
      }

      if (axis.options.type === Scale.number) {
        scale = defaultScaleMapping
          .get(axis.options.scaleOptions.type)()
          .domain(axis.extent)
          .range(axis.options.inverted ? [...xRange].reverse() : xRange);
      }

      if (axis.options.niceTicks) {
        scale.nice();
      }

      if (axis.options.scaleOptions.type === ScaleType.log) {
        scale.base(axis.options.scaleOptions.base);
      }

      if (axis.options.scaleOptions.type === ScaleType.pow) {
        scale.exponent(axis.options.scaleOptions.base);
      }

      this._xScales.set(index, scale);
    });

    this._yAxisList.forEach((axis, index) => {
      let scale = null;

      if (axis.options.type === Scale.number) {
        scale = defaultScaleMapping
          .get(axis.options.scaleOptions.type)()
          .domain(axis.extent)
          .range(axis.options.inverted ? [...yRange].reverse() : yRange);
      }

      if (axis.options.type === Scale.time) {
        scale = d3
          .scaleTime()
          .domain(axis.extent)
          .range(axis.options.inverted ? [...yRange].reverse() : yRange);
      }

      if (axis.options.niceTicks) {
        scale.nice();
      }

      if (axis.options.scaleOptions.type === ScaleType.log) {
        scale.base(axis.options.scaleOptions.base);
      }

      if (axis.options.scaleOptions.type === ScaleType.pow) {
        scale.exponent(axis.options.scaleOptions.base);
      }

      this._yScales.set(index, scale);
    });

    for (const [key, value] of this._yScales) {
      this._clonedY.set(key, value.copy());
    }

    for (const [key, value] of this._xScales) {
      this._clonedX.set(key, value.copy());
    }
  }

  private drawAxis() {
    const hasVisibleAxis = [...this._xAxisList, ...this._yAxisList].filter(
      (axis) => axis.options.visible
    );

    if (!hasVisibleAxis) {
      return;
    }

    const negative = false;

    this._chart.selectAll('.axes').remove();

    const axes = this._chart
      .append('g')
      .attr('class', 'axes')
      .style('shape-rendering', 'crispEdges');

    const TICK_HEIGHT = 40;
    const TICK_WIDTH = 60;

    const tickCount = Math.round(this._height / TICK_HEIGHT);
    const tickCountX = Math.round(this._width / TICK_WIDTH);

    this._xAxisList.forEach((axis) => {
      const options: AxisOptions = axis.options;

      const translate = `translate(${0}, ${
        this._height - this._options.bounds.bottom
      })`;

      const x = this._xScales.get(axis.index);

      const xAxis = d3.axisBottom(x).ticks(tickCountX);

      if (axis.options?.tickFormat) {
        xAxis.tickFormat(axis.options.tickFormat);
      }

      if (options.visible !== false) {
        const translateX = this.offsetNonOpposite
          ? this.offsetNonOpposite
          : this._options.bounds.left + this.offsetNonOpposite;

        axes
          .append('g')
          .attr('class', 'x-axis-label')
          .append('text')
          .style('fill', 'var(--color-text-50)')
          .attr(
            'transform',
            'translate(' +
              this._width / 2 +
              ' ,' +
              (this._height - this._options.bounds.bottom) +
              ')'
          )
          .style('text-anchor', 'middle')
          .attr('dy', '3em')
          .text(options.title ?? '');

        axes
          .append('g')
          .attr('class', 'x-axis font-caption')
          .attr('data-x-scale-id', axis.index)
          .attr('transform', translate)
          .style('pointer-events', 'none')
          .call(xAxis)
          .call((_) => {
            _.select('.domain').remove();
            _.selectAll('.tick').attr('class', 'color-text-50');

            if (negative) {
              _.append('line')
                .attr('y1', 0)
                .attr('y2', this._height)
                .attr('transform', `translate(${x(0)}, -${this._height})`)
                .style('stroke-width', 0.5)
                .style('stroke', 'var(--color-text-50)');
            }

            _.append('line')
              .attr('x1', 0)
              .attr('x2', this.visibleChartWindowWidth)
              .attr('transform', `translate(${translateX}, ${0})`)
              .style('stroke-width', 0.5)
              .style('stroke', 'var(--color-text-50)');
          });
      }
    });

    this._yAxisList.forEach((axis) => {
      const translate = axis.options.opposite
        ? `translate(${this._width - axis.offset}, ${0})`
        : `translate(${axis.offset}, ${0})`;

      const y = this._yScales.get(axis.index);

      const yAxis = axis.options.opposite ? d3.axisRight(y) : d3.axisLeft(y);

      if (axis.options.visible !== false) {
        const labelOffset = axis.options.opposite
          ? this._width - axis.offset + axis.width
          : axis.offset - axis.width;

        axes
          .append('g')
          .attr('class', 'y-axis-label')
          .append('text')
          .style('fill', 'var(--color-text-50)')
          .attr('transform', 'rotate(-90)')
          .attr('y', labelOffset)
          .attr('x', 0 - this._height / 2)
          .attr('dy', axis.options.opposite ? '12px' : '-3px')
          .style('text-anchor', 'middle')
          .text(axis.options.title ?? '');

        axes
          .append('g')
          .attr('class', 'y-axis font-caption')
          .attr('data-y-scale-id', axis.index)
          .attr('transform', translate)
          .call(yAxis)
          .style('pointer-events', 'none')
          .call((_) => {
            _.select('.domain').remove();
            _.selectAll('.tick').attr('class', 'color-text-50');

            if (!negative) {
              _.append('line')
                .attr('y1', 0)
                .attr(
                  'y2',
                  this._height -
                    this._options.bounds.top -
                    this._options.bounds.bottom
                )
                .attr(
                  'transform',
                  `translate(${0}, ${this._options.bounds.top})`
                )
                .style('stroke-width', 0.5)
                .style('stroke', 'var(--color-text-50)');
            }
          });
      }
    });
  }
}
