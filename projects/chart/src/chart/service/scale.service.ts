import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, ZoomTransform } from 'd3';
import { Axis } from '../core/axis/axis';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { IChartConfig } from '../model/i-chart-config';
import { ChartService } from './chart.service';
import {
  combineLatest,
  map,
  Observable,
  shareReplay,
  withLatestFrom,
} from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';
import { ZoomService } from './zoom.service';
import { ZoomType } from '../model/enum/zoom-type';
import { ScaleType } from '../model/enum/scale-type';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public yAxisMap: Observable<Map<number, Axis>>;
  public xAxisMap: Observable<Map<number, Axis>>;

  public yScaleMap: Observable<Map<number, any>>;
  public xScaleMap: Observable<Map<number, any>>;

  private transformCacheX = new Map<number, ZoomTransform>();
  private transformCacheY = new Map<number, ZoomTransform>();

  private scaleMapping = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.scaleLinear)
    .set(ScaleType.time, d3.scaleTime)
    .set(ScaleType.category, d3.scaleOrdinal)
    .set(ScaleType.log, d3.scaleLog)
    .set(ScaleType.pow, d3.scalePow)
    .set(ScaleType.sqrt, d3.scaleSqrt);

  constructor(
    private chartService: ChartService,
    private zoomService: ZoomService
  ) {
    this.xAxisMap = combineLatest([
      this.chartService.size,
      this.chartService.config,
    ]).pipe(
      map((data: [DOMRectReadOnly, IChartConfig]) => {
        const [, config] = data;
        const map = new Map<number, Axis>();
        config.xAxis.map((_, index) => {
          map.set(index, Axis.createAxis(AxisOrientation.x, config, index));
        });
        return map;
      })
    );

    this.yAxisMap = combineLatest([
      this.chartService.size,
      this.chartService.config,
    ]).pipe(
      map((data: [DOMRectReadOnly, IChartConfig]) => {
        const [, config] = data;
        const map = new Map<number, Axis>();
        config.yAxis.map((_, index) => {
          map.set(index, Axis.createAxis(AxisOrientation.y, config, index));
        });

        return map;
      })
    );

    this.xScaleMap = combineLatest([
      this.chartService.size,
      this.chartService.config,
      this.zoomService.zoomed,
    ]).pipe(
      withLatestFrom(this.yAxisMap, this.xAxisMap),
      map(
        (
          data: [
            [DOMRectReadOnly, IChartConfig, IChartEvent<Axis>],
            Map<number, Axis>,
            Map<number, Axis>
          ]
        ) => {
          const [[size, config, zoom], yAxes, xAxes] = data;

          const map = new Map<number, any>();

          const left = [...yAxes.values()]
            .filter((_) => _.options?.visible && _.options?.opposite)
            .reduce((acc, cur) => acc + cur.selfSize, 0);

          const right = [...yAxes.values()]
            .filter((_) => _.options?.visible && _.options?.opposite !== true)
            .reduce((acc, cur) => acc + cur.selfSize, 0);

          const finalWidth = (size.width || 0) - left - right;

          xAxes.forEach((axis) => {
            let domain = axis.extremes;

            if (axis?.options.inverted) {
              domain = [...axis.extremes].reverse();
            }

            const scale = this.scaleMapping
              .get(axis.options.scaleType.type)()
              .domain(domain)
              .range([0, finalWidth]);

            if (axis.options.scaleType.type === ScaleType.log) {
              scale.base(axis.options.scaleType.base);
            }

            map.set(axis.index, scale);

            const hasCache =
              (this.transformCacheX.has(axis.index) &&
                zoom?.target?.orientation !== AxisOrientation.x) ||
              (this.transformCacheX.has(axis.index) &&
                zoom?.target?.index !== axis.index);

            if (hasCache) {
              const restoredTransform = this.transformCacheX.get(axis.index);
              map.set(axis.index, restoredTransform.rescaleX(scale));
            }
          });

          if (zoom) {
            const event = zoom.event as D3ZoomEvent<any, any>;

            if (zoom.target?.orientation === AxisOrientation.x) {
              const currentScale = map.get(zoom.target.index);
              const rescaled = event.transform.rescaleX(currentScale);
              map.set(zoom.target.index, rescaled);

              const axis = xAxes.get(zoom.target.index);
              this.transformCacheX.set(axis.index, event.transform);
            }

            if (config.zoom.type === ZoomType.x && zoom.target === undefined) {
              this.transformCacheX.set(0, event.transform);
            }
          }

          return map;
        }
      ),
      shareReplay(1)
    );

    this.yScaleMap = combineLatest([
      this.chartService.size,
      this.chartService.config,
      this.zoomService.zoomed,
    ]).pipe(
      withLatestFrom(this.yAxisMap, this.xAxisMap),
      map(
        (
          data: [
            [DOMRectReadOnly, IChartConfig, IChartEvent<Axis>],
            Map<number, Axis>,
            Map<number, Axis>
          ]
        ) => {
          const [[size, config, zoom], yAxes, xAxes] = data;

          const map = new Map<number, any>();

          const top = [...xAxes.values()]
            .filter((_) => _.options?.visible && _.options?.opposite)
            .reduce((acc, cur) => acc + cur.selfSize, 0);

          const bottom = [...xAxes.values()]
            .filter((_) => _.options?.visible && _.options?.opposite !== true)
            .reduce((acc, cur) => acc + cur.selfSize, 0);

          const finalHeight = (size.height || 0) - top - bottom;

          yAxes.forEach((axis) => {
            let domain = axis.extremes;

            if (axis.orientation === AxisOrientation.y) {
              domain = [...axis.extremes].reverse();
            }

            if (axis?.options.inverted) {
              domain = domain.reverse();
            }

            const scale = this.scaleMapping
              .get(axis.options.scaleType.type)()
              .domain(domain)
              .range([0, finalHeight]);

            if (axis.options.scaleType.type === ScaleType.log) {
              scale.base(axis.options.scaleType.base);
            }

            map.set(axis.index, scale);

            const hasCache =
              (this.transformCacheY.has(axis.index) &&
                zoom?.target?.orientation !== AxisOrientation.y) ||
              (this.transformCacheY.has(axis.index) &&
                zoom?.target?.index !== axis.index);

            if (hasCache) {
              const restoredTransform = this.transformCacheY.get(axis.index);
              map.set(axis.index, restoredTransform.rescaleY(scale));
            }
          });

          if (zoom) {
            const event = zoom.event as D3ZoomEvent<any, any>;

            if (zoom.target?.orientation === AxisOrientation.y) {
              const currentScale = map.get(zoom.target.index);
              const rescaled = event.transform.rescaleY(currentScale);
              map.set(zoom.target.index, rescaled);

              const axis = yAxes.get(zoom.target.index);
              this.transformCacheY.set(axis.index, event.transform);
            }

            if (config.zoom.type === ZoomType.y && zoom?.target === undefined) {
              this.transformCacheY.set(0, event.transform);
            }
          }

          return map;
        }
      ),
      shareReplay(1)
    );
  }
}
