import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ZoomTransform } from 'd3';
import { combineLatest, map, Observable, shareReplay, take, withLatestFrom } from 'rxjs';

import { Axis } from '../core/axis/axis';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { ScaleType } from '../model/enum/scale-type';
import { ZoomType } from '../model/enum/zoom-type';
import { ZoomMessage } from '../model/i-broadcast-message';
import { IChartConfig } from '../model/i-chart-config';
import { IScalesMap } from '../model/i-scales-map';
import { ChartService } from './chart.service';
import { ZoomService } from './zoom.service';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public scales: Observable<IScalesMap>;

  private transformCacheX = new Map<number, ZoomTransform>();
  private transformCacheY = new Map<number, ZoomTransform>();

  private scaleMapping = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.scaleLinear)
    .set(ScaleType.time, d3.scaleTime)
    .set(ScaleType.log, d3.scaleLog)
    .set(ScaleType.symlog, d3.scaleSymlog)
    .set(ScaleType.pow, d3.scalePow)
    .set(ScaleType.sqrt, d3.scaleSqrt)
    .set(ScaleType.band, d3.scaleBand);

  constructor(private chartService: ChartService, private zoomService: ZoomService) {
    this.scales = combineLatest([this.chartService.size, this.chartService.config, this.zoomService.zoomed]).pipe(
      map((data: [DOMRectReadOnly, IChartConfig, ZoomMessage]) => {
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

          const scale = this.scaleMapping
            .get(axis.options.scaleType.type)()
            .domain(domain)
            .range([0, finalWidth - config.bounds.right]);

          if (axis.options.niceTicks) {
            scale.nice();
          }

          if (axis.options.scaleType.type === ScaleType.log) {
            scale.base(axis.options.scaleType.base);
          }

          if (axis.options.scaleType.type === ScaleType.band) {
            scale.paddingInner(0.1);
            scale.paddingOuter(0.1);
            scale.align(0.1);
          }

          axis.setScale(scale);
          axis.setOriginDomain(scale.domain());

          const hasCache = this.transformCacheX.has(axis.index);
          const shouldRestore = zoom?.axis?.orientation !== AxisOrientation.x || zoom.axis?.index !== axis.index;

          if (hasCache && shouldRestore) {
            const restoredTransform = this.transformCacheX.get(axis.index);
            axis.setScale(restoredTransform.rescaleX(scale));
          }
        });

        if (zoom && zoom.domain) {
          if (zoom.axis?.orientation === AxisOrientation.x) {
            if (xAxisMap.has(zoom.axis.index)) {
              const x = xAxisMap.get(zoom.axis.index);
              const transform = this.zoomService.getD3Transform(
                zoom.domain,
                x.originDomain,
                x.scale,
                AxisOrientation.x,
                x.options.inverted
              );
              const rescaled = transform.rescaleX(x.scale.copy());
              x.setScale(rescaled);
              this.transformCacheX.set(x.index, transform);
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

        const finalHeight = (size.height || 0) - top - bottom - config?.bounds?.top - config.bounds?.bottom;

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
            scale.base(axis.options.scaleType.base);
          }

          if (axis.options.scaleType.type === ScaleType.band) {
            scale.paddingInner(0.1);
            scale.paddingOuter(0.1);
            scale.align(0.1);
          }

          axis.setScale(scale);
          axis.setOriginDomain(scale.domain());

          const hasCache = this.transformCacheY.has(axis.index);

          const shouldRestore = zoom?.axis?.orientation !== AxisOrientation.y || zoom.axis?.index !== axis.index;

          if (hasCache && shouldRestore) {
            const restoredTransform = this.transformCacheY.get(axis.index);
            axis.setScale(restoredTransform.rescaleY(scale));
          }
        });

        if (zoom && zoom.domain) {
          if (zoom.axis?.orientation === AxisOrientation.y) {
            if (yAxisMap.has(zoom.axis.index)) {
              const y = yAxisMap.get(zoom.axis.index);
              const transform = this.zoomService.getD3Transform(
                zoom.domain,
                y.originDomain,
                y.scale,
                AxisOrientation.y,
                y.options.inverted
              );
              const rescaled = transform.rescaleY(y.scale.copy());
              y.setScale(rescaled);
              this.transformCacheY.set(y.index, transform);
            }
          }
        }
        return {
          x: xAxisMap,
          y: yAxisMap,
        };
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }

  resetZoom() {
    this.chartService.config
      .pipe(take(1), withLatestFrom(this.scales))
      .subscribe(([config, scales]: [IChartConfig, IScalesMap]) => {
        config.xAxis.forEach((axis, index) => {
          const scale = scales?.x?.get(index)?.originDomain;
          if (scale) {
            const msg = new ZoomMessage({
              eventType: 'end',
              axis: {
                index,
                orientation: AxisOrientation.x,
              },
              domain: scale,
              chartId: config.id,
            });
            this.zoomService.fireZoom(msg);
            if (config.zoom.syncChannel && config.zoom.syncType === ZoomType.x) {
              this.zoomService.broadcastZoom(msg);
            }
          }
        });
        config.yAxis.forEach((axis, index) => {
          const scale = scales?.y?.get(index)?.originDomain;
          if (scale) {
            const msg = new ZoomMessage({
              eventType: 'end',
              axis: {
                index,
                orientation: AxisOrientation.y,
              },
              domain: scale,
              chartId: config.id,
            });
            this.zoomService.fireZoom(msg);
            if (config.zoom.syncChannel && config.zoom.syncType === ZoomType.y) {
              this.zoomService.broadcastZoom(msg);
            }
          }
        });
      });
  }
}
