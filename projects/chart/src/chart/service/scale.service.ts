import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, ZoomTransform } from 'd3';
import { AxisType } from '../model/enum/axis-type';
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

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public yAxisMap: Observable<Map<number, Axis>>;
  public xAxisMap: Observable<Map<number, Axis>>;

  public yScaleMap: Observable<Map<number, any>>;
  public xScaleMap: Observable<Map<number, any>>;

  private transformCacheXMap = new Map<number, ZoomTransform>();
  private transformCacheYMap = new Map<number, ZoomTransform>();

  private scaleMapping = new Map<AxisType, any>()
    .set(AxisType.number, d3.scaleLinear)
    .set(AxisType.time, d3.scaleTime)
    .set(AxisType.category, d3.scaleOrdinal)
    .set(AxisType.log, d3.scaleLog);

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
          data: [[DOMRectReadOnly, IChartConfig, IChartEvent<Axis>], any, any]
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
            const scale = this.scaleMapping
              .get(axis.options.type)()
              .domain(
                axis.orientation === AxisOrientation.y
                  ? [...axis.extremes].reverse()
                  : axis.extremes
              )
              .range([0, finalWidth]);

            map.set(axis.index, scale);

            const hasCached =
              (this.transformCacheXMap.has(axis.index) &&
                zoom?.target?.orientation !== AxisOrientation.x) ||
              (this.transformCacheXMap.has(axis.index) &&
                zoom?.target?.orientation === AxisOrientation.x &&
                axis.index !== zoom?.target?.index);

            if (hasCached) {
              const currentScale = map.get(axis.index);
              const restoredTransform = this.transformCacheXMap.get(axis.index);
              const rescaled = restoredTransform.rescaleX(currentScale);

              map.set(axis.index, rescaled);
            }
          });

          if (zoom) {
            const event = zoom.event as D3ZoomEvent<any, any>;

            if (zoom.target?.orientation === AxisOrientation.x) {
              const currentScale = map.get(zoom.target.index);
              const rescaled = event.transform.rescaleX(currentScale);
              map.set(zoom.target.index, rescaled);
              this.transformCacheXMap.set(zoom.target.index, event.transform);
            }

            if (zoom.target === undefined) {
              if (config.zoom?.type === ZoomType.x) {
                map.forEach((scale, index) => {
                  map.set(index, event.transform.rescaleX(scale));
                });
              }
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
          data: [[DOMRectReadOnly, IChartConfig, IChartEvent<Axis>], any, any]
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
            const scale = this.scaleMapping
              .get(axis.options.type)()
              .domain(
                axis.orientation === AxisOrientation.y
                  ? [...axis.extremes].reverse()
                  : axis.extremes
              )
              .range([0, finalHeight]);

            map.set(axis.index, scale);

            const hasCached =
              (this.transformCacheYMap.has(axis.index) &&
                zoom?.target?.orientation !== AxisOrientation.y) ||
              (this.transformCacheYMap.has(axis.index) &&
                zoom?.target?.orientation === AxisOrientation.y &&
                axis.index !== zoom?.target?.index);

            if (hasCached) {
              const currentScale = map.get(axis.index);
              const restoredTransform = this.transformCacheYMap.get(axis.index);

              const rescaled = restoredTransform.rescaleY(currentScale);
              map.set(axis.index, rescaled);
            }
          });

          if (zoom) {
            const event = zoom.event as D3ZoomEvent<any, any>;

            if (zoom.target?.orientation === AxisOrientation.y) {
              const currentScale = map.get(zoom.target.index);

              const rescaled = event.transform.rescaleY(currentScale);
              map.set(zoom.target.index, rescaled);

              this.transformCacheYMap.set(zoom.target.index, event.transform);
            }

            if (zoom.target === undefined) {
              if (config.zoom?.type === ZoomType.y) {
                map.forEach((scale, index) => {
                  map.set(index, event.transform.rescaleY(scale));
                });
              }
            }
          }

          return map;
        }
      ),
      shareReplay(1)
    );
  }
}
