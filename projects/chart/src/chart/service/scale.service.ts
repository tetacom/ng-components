import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {D3ZoomEvent, ZoomTransform} from 'd3';
import {Axis} from '../core/axis/axis';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {IChartConfig} from '../model/i-chart-config';
import {ChartService} from './chart.service';
import {combineLatest, filter, map, Observable, shareReplay, withLatestFrom,} from 'rxjs';
import {IChartEvent} from '../model/i-chart-event';
import {ZoomService} from './zoom.service';
import {ScaleType} from '../model/enum/scale-type';
import {IScalesMap} from "../model/i-scales-map";

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public scales: Observable<IScalesMap>

  private transformCacheX = new Map<number, ZoomTransform>();
  private transformCacheY = new Map<number, ZoomTransform>();

  private scaleMapping = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.scaleLinear)
    .set(ScaleType.time, d3.scaleTime)
    .set(ScaleType.category, d3.scaleOrdinal)
    .set(ScaleType.log, d3.scaleLog)
    .set(ScaleType.symlog, d3.scaleSymlog)
    .set(ScaleType.pow, d3.scalePow)
    .set(ScaleType.sqrt, d3.scaleSqrt);

  constructor(
    private chartService: ChartService,
    private zoomService: ZoomService
  ) {

    this.scales = combineLatest([
      this.chartService.size.pipe(
        filter((rect) => rect.width > 0 && rect.height > 0)
      ),
      this.chartService.config,
      this.zoomService.zoomed,
    ]).pipe(
      map((data: [DOMRectReadOnly, IChartConfig, IChartEvent<Axis>]) => {

        const [size, config, zoom] = data;

        const xAxisMap = new Map<number, Axis>();
        const yAxisMap = new Map<number, Axis>();

        config.yAxis.map((_, index) => {
          yAxisMap.set(index, Axis.createAxis(AxisOrientation.y, config, index));
        });


        config.xAxis.map((_, index) => {
          xAxisMap.set(index, Axis.createAxis(AxisOrientation.x, config, index));
        });

        // Generate x scales
        const left = Array.from(yAxisMap.values())
          .filter((_) => _.options?.visible && _.options?.opposite)
          .reduce((acc, cur) => acc + cur.selfSize, 0);

        const right = Array.from(yAxisMap.values())
          .filter((_) => _.options?.visible && _.options?.opposite !== true)
          .reduce((acc, cur) => acc + cur.selfSize, 0);

        const finalWidth = (size.width || 0) - left - right;

        xAxisMap.forEach((axis) => {
          let domain = axis.extremes;

          if (axis?.options.inverted) {
            domain = [...axis.extremes].reverse();
          }

          let scale = this.scaleMapping
            .get(axis.options.scaleType.type)()
            .domain(domain)
            .range([0, finalWidth - config.bounds.right]);

          if (axis.options.niceTicks) {
            scale.nice();
          }

          if (axis.options.scaleType.type === ScaleType.log) {
            scale.base(axis.options.scaleType.base)
          }

          axis.setScale(scale);
          axis.setOriginDomain(scale.domain());


          const hasCache = this.transformCacheX.has(axis.index);
          const shouldRestore =
            zoom?.target?.orientation !== AxisOrientation.x ||
            zoom.target?.index !== axis.index;

          if (hasCache && shouldRestore) {
            const restoredTransform = this.transformCacheX.get(axis.index);
            axis.setScale(restoredTransform.rescaleX(scale));
          }
        });

        if (zoom) {
          const event = zoom.event as D3ZoomEvent<any, any>;

          if (zoom.target?.orientation === AxisOrientation.x) {

            if (xAxisMap.has(zoom.target.index)) {
              const x = xAxisMap.get(zoom.target.index);
              const rescaled = event.transform.rescaleX(x.scale);
              x.setScale(rescaled);

              const axis = xAxisMap.get(zoom.target.index);
              this.transformCacheX.set(axis.index, event.transform);
            }
          }
        }


        // Generate y axis

        const top = Array.from(xAxisMap.values())
          .filter((_) => _.options?.visible && _.options?.opposite)
          .reduce((acc, cur) => acc + cur.selfSize, 0);

        const bottom = Array.from(xAxisMap.values())
          .filter((_) => _.options?.visible && _.options?.opposite !== true)
          .reduce((acc, cur) => acc + cur.selfSize, 0);

        const finalHeight =
          (size.height || 0) -
          top -
          bottom -
          config?.bounds?.top -
          config.bounds?.bottom;

        yAxisMap.forEach((axis) => {
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
            .range([config.bounds.top, finalHeight]);

          if (axis.options.niceTicks) {
            scale.nice();
          }

          if (axis.options.scaleType.type === ScaleType.log) {
            scale.base(axis.options.scaleType.base)
          }

          axis.setScale(scale);
          axis.setOriginDomain(scale.domain());

          const hasCache = this.transformCacheY.has(axis.index);

          const shouldRestore =
            zoom?.target?.orientation !== AxisOrientation.y ||
            zoom.target?.index !== axis.index;

          if (hasCache && shouldRestore) {
            const restoredTransform = this.transformCacheY.get(axis.index);
            axis.setScale(restoredTransform.rescaleY(scale));
          }
        });

        if (zoom) {
          const event = zoom.event as D3ZoomEvent<any, any>;

          if (zoom.target?.orientation === AxisOrientation.y) {

            if (yAxisMap.has(zoom.target.index)) {
              const y = yAxisMap.get(zoom.target.index);

              const rescaled = event.transform.rescaleY(y.scale);
              y.setScale(rescaled);

              const axis = yAxisMap.get(zoom.target.index);
              this.transformCacheY.set(axis.index, event.transform);
            }
          }
        }

        return {
          x: xAxisMap,
          y: yAxisMap
        }
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    )
  }
}
