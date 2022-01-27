import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, ZoomTransform } from 'd3';
import { AxisType } from '../model/enum/axis-type';
import { Axis } from '../core/axis/axis';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { IChartConfig } from '../model/i-chart-config';
import { ChartService } from './chart.service';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  withLatestFrom,
} from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  public zoomed: Observable<IChartEvent<Axis>>;

  public yAxisMap: Observable<Map<number, Axis>>;
  public xAxisMap: Observable<Map<number, Axis>>;

  public yScaleMap: Observable<Map<number | string, any>>;
  public xScaleMap: Observable<Map<number | string, any>>;

  private scaleMapping = new Map<AxisType, any>()
    .set(AxisType.number, d3.scaleLinear)
    .set(AxisType.time, d3.scaleTime)
    .set(AxisType.category, d3.scaleOrdinal)
    .set(AxisType.log, d3.scaleLog);

  constructor(private readonly chartService: ChartService) {
    this.zoomed = this.zoomed$.asObservable();

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
      this.zoomed$,
    ]).pipe(
      withLatestFrom(this.yAxisMap, this.xAxisMap),
      map(
        (
          data: [[DOMRectReadOnly, IChartConfig, IChartEvent<Axis>], any, any]
        ) => {
          const [[size, _, zoomEvent], yAxes, xAxes] = data;

          const map = new Map<number | string, any>();

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
          });

          if (zoomEvent) {
            if (zoomEvent.target.orientation === AxisOrientation.x) {
              const currentScale = map.get(zoomEvent.target.index);
              const event = zoomEvent.event as D3ZoomEvent<any, any>;
              const rescaled = event.transform.rescaleX(currentScale);
              map.set(zoomEvent.target.index, rescaled);
            }
          }

          return map;
        }
      )
    );

    this.yScaleMap = combineLatest([
      this.chartService.size,
      this.chartService.config,
      this.zoomed$,
    ]).pipe(
      withLatestFrom(this.yAxisMap, this.xAxisMap),
      map(
        (
          data: [[DOMRectReadOnly, IChartConfig, IChartEvent<Axis>], any, any]
        ) => {
          const [[size, _, zoomEvent], yAxes, xAxes] = data;

          const map = new Map<number | string, any>();

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
          });

          console.log(zoomEvent);

          if (zoomEvent) {
            if (zoomEvent.target.orientation === AxisOrientation.y) {
              const currentScale = map.get(zoomEvent.target.index);
              const event = zoomEvent.event as D3ZoomEvent<any, any>;
              const rescaled = event.transform.rescaleY(currentScale);
              map.set(zoomEvent.target.index, rescaled);
            }
          }

          return map;
        }
      )
    );
  }

  setZoomed(zoom: IChartEvent<Axis>) {
    this.zoomed$.next(zoom);
  }
}
