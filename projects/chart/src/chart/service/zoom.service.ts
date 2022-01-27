import {ElementRef, Injectable} from '@angular/core';
import * as d3 from 'd3';
import {D3ZoomEvent, zoomIdentity} from 'd3';
import {ScaleService} from './scale.service';
import {map, merge, Observable, of, Subject, Subscription, withLatestFrom} from 'rxjs';
import {ZoomType} from '../model/enum/zoom-type';
import {IChartConfig} from '../model/i-chart-config';
import {BroadcastService} from './broadcast.service';
import {ChartService} from './chart.service';
import {BrushType} from '../model/enum/brush-type';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  zoomed: Observable<any>;
  private zoomed$ = new Subject<any>();

  broadcastSubscription: Subscription;

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

    this.chartService.size
      .pipe(
        withLatestFrom(this.scaleService.xScaleMap, this.scaleService.yScaleMap),
        map((data: [DOMRect, Map<string | number, any>, Map<string | number, any>]) => {
          [, this.x, this.y] = data;
          // = new Map(this.scaleService.xScaleMap);
          // = new Map(this.scaleService.yScaleMap);
          if (this.svg) {
            const currentTransform = d3.zoomTransform(this.svg.node());
            this.setZoom(currentTransform);
          }
        })
      )
      .subscribe();
  }

  applyZoom(svgElement: ElementRef, config: IChartConfig, size: DOMRect) {
    this.broadcastSubscription?.unsubscribe();
    this.svg = d3.select(svgElement.nativeElement);

    const zoomType = config?.zoom?.type;
    const enable = config?.zoom?.enable;

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      const {transform} = event;
      /* TODO: calc zoom*/
      // if (zoomType === ZoomType.x || zoomType === ZoomType.xy) {
      //   for (let [index, scale] of this.x.entries()) {
      //     this.scaleService.xScaleMap.set(index, transform.rescaleX(scale));
      //   }
      // }
      //
      // if (zoomType === ZoomType.y || zoomType === ZoomType.xy) {
      //   for (let [index, scale] of this.y.entries()) {
      //     this.scaleService.yScaleMap.set(index, transform.rescaleY(scale));
      //   }
      // }

      // if (enable) {
      //   this.zoomed$.next({event});
      //
      //   if (event.sourceEvent) {
      //     this.broadcastService.broadcast({
      //       channel: config?.zoom?.syncChannel,
      //       message: event,
      //       domain: this.scaleService[
      //         config?.zoom?.type === ZoomType.x ? 'xScaleMap' : 'yScaleMap'
      //         ]
      //         .get(config.brush?.axisIndex ?? 0)
      //         .domain(),
      //     });
      //   }
      // }
    };

    if (enable) {
      this.zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .extent([
          [0, 0],
          [size.width, size.height],
        ]);

      this.zoom.on('start zoom end', zoomed);
      this.svg.call(this.zoom);
      this.svg.call(this.zoom.transform, this.initialZoom);

      const sc =
        config?.zoom?.type === ZoomType.x
          ? this.x.get(config.brush?.axisIndex ?? 0)
          : this.y.get(config.brush?.axisIndex ?? 0);

      this.broadcastSubscription = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          map((_) => {
            const currentTransform = d3.zoomTransform(this.svg.node());

            const {message} = _;
            if (currentTransform !== message?.transform) {
              if (message.selection) {
                const s = message.selection;

                const domain = sc.domain();

                const scale = (domain[1] - domain[0]) / (s[1] - s[0]);

                let transform = zoomIdentity.scale(scale);

                if (message?.brushType === BrushType.x) {
                  transform = transform.translate(-sc(s[0]), 0);
                }
                if (message?.brushType === BrushType.y) {
                  transform = transform.translate(0, -sc(s[0]));
                }

                this.setZoom(transform);

                return;
              }

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
