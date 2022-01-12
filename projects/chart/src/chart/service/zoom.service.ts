import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, zoomIdentity, ZoomTransform } from 'd3';
import { ScaleService } from './scale.service';
import { map, merge, Observable, of, Subject, withLatestFrom } from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';
import { ZoomType } from '../model/enum/zoom-type';
import { IChartConfig } from '../model/i-chart-config';
import { BroadcastService } from './broadcast.service';
import { ChartService } from './chart.service';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  zoomed: Observable<IChartEvent<D3ZoomEvent<any, any>>>;
  private zoomed$ = new Subject<IChartEvent<D3ZoomEvent<any, any>>>();

  private x = new Map<number | string, any>();
  private y = new Map<number | string, any>();

  private zoom;
  private svg;
  private initialZoom = zoomIdentity;

  constructor(
    private scaleService: ScaleService,
    private broadcastService: BroadcastService,
    private chartService: ChartService
  ) {
    this.zoomed = this.zoomed$.asObservable();

    merge(of(1), this.chartService.size)
      .pipe(
        map((_) => {
          this.x = new Map(this.scaleService.xScales);
          this.y = new Map(this.scaleService.yScales);

          if (this.svg) {
            const currentTransform = d3.zoomTransform(this.svg.node());
            this.setZoom(currentTransform);
          }
        })
      )
      .subscribe();
  }

  applyZoom(svgElement: ElementRef, config: IChartConfig, size: DOMRect) {
    this.svg = d3.select(svgElement.nativeElement);

    const zoomType = config?.zoom?.type;
    const enable = config?.zoom?.enable;

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      const { transform } = event;

      if (zoomType === ZoomType.x || zoomType === ZoomType.xy) {
        for (let [index, scale] of this.x.entries()) {
          this.scaleService.xScales.set(index, transform.rescaleX(scale));
        }
      }

      if (zoomType === ZoomType.y || zoomType === ZoomType.xy) {
        for (let [index, scale] of this.y.entries()) {
          this.scaleService.yScales.set(index, transform.rescaleY(scale));
        }
      }

      if (enable) {
        this.zoomed$.next({ event });

        if (event.sourceEvent) {
          this.broadcastService.broadcast({
            channel: config?.zoom?.syncChannel,
            message: event,
          });
        }
      }
    };

    if (enable) {
      this.zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .extent([
          [0, 0],
          [size.width, size.height],
        ])
        .translateExtent([
          [0, 0],
          [size.width, size.height],
        ]);

      this.zoom.on('start zoom end', zoomed);
      this.svg.call(this.zoom);
      this.svg.call(this.zoom.transform, this.initialZoom);

      this.broadcastService
        .subscribe(config?.zoom?.syncChannel)
        .pipe(
          map((_) => {
            const currentTransform = d3.zoomTransform(this.svg.node());

            const { message } = _;
            if (currentTransform !== message?.transform) {
              this.setZoom(message?.transform);
            }
          })
        )
        .subscribe();
    }
  }

  setZoom(transform: any) {
    // requestAnimationFrame(() => {
    //
    // });

    this.svg?.call(this.zoom.transform, transform);
  }
}
