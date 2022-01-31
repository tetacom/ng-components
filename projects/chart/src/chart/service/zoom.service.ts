import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, zoomTransform, ZoomTransform } from 'd3';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  shareReplay,
  Subscription,
} from 'rxjs';
import { IChartConfig } from '../model/i-chart-config';
import { BroadcastService } from './broadcast.service';
import { BrushType } from '../model/enum/brush-type';
import { Axis } from '../core/axis/axis';
import { IChartEvent } from '../model/i-chart-event';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { ZoomType } from '../model/enum/zoom-type';
import { ZoomMessage } from '../model/i-broadcast-message';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription;

  zoomed: Observable<IChartEvent<Axis>>;
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  constructor(private broadcastService: BroadcastService) {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay(1));
  }

  applyZoom(
    svgElement: ElementRef,
    config: IChartConfig,
    size: DOMRect,
    axis?: Axis
  ) {
    // this.broadcastSubscription?.unsubscribe();
    const enable = axis?.options?.zoom || config?.zoom?.enable;

    if (config?.zoom?.enable || axis === undefined) {
      this.zoomed
        .pipe(
          filter(
            (_) =>
              (_?.target?.orientation === AxisOrientation.x &&
                axis === undefined &&
                config?.zoom.type === ZoomType.x) ||
              (_?.target === undefined &&
                axis?.orientation === AxisOrientation.x &&
                axis?.index === 0 &&
                config?.zoom.type === ZoomType.x) ||
              (_?.target?.orientation === AxisOrientation.y &&
                config?.zoom.type === ZoomType.y &&
                axis === undefined) ||
              (_?.target === undefined &&
                axis?.orientation === AxisOrientation.y &&
                axis?.index === 0 &&
                config?.zoom.type === ZoomType.y)
          ),
          filter((_) => _?.event?.type === 'end'),
          map((_) => {
            const eventTransform = _?.event.transform;
            const currentTransform = zoomTransform(svgElement.nativeElement);

            if (currentTransform !== eventTransform) {
              d3.select(svgElement.nativeElement).call(
                d3.zoom().transform,
                eventTransform
              );
            }
          })
        )
        .subscribe();
    }

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      if (enable) {
        this.zoomed$.next({
          event,
          target: axis,
        });

        if (event.sourceEvent) {
          const message: ZoomMessage = {
            event: event,
          };

          this.broadcastService.broadcast({
            channel: config?.zoom?.syncChannel,
            message,
            // domain: this.scaleService[
            //   config?.zoom?.type === ZoomType.x ? 'xScaleMap' : 'yScaleMap'
            //   ]
            //   .get(config.brush?.axisIndex ?? 0)
            //   .domain(),
          });
        }
      }
    };

    if (enable) {
      const element = d3.select(svgElement.nativeElement);
      const zoom = d3
        .zoom()
        .scaleExtent([1, 50])
        .extent([
          [0, 0],
          [size.width, size.height],
        ]);

      zoom.on('start zoom end', zoomed);
      element.call(zoom);

      // const sc =
      //   config?.zoom?.type === ZoomType.x
      //     ? this.x.get(config.brush?.axisIndex ?? 0)
      //     : this.y.get(config.brush?.axisIndex ?? 0);

      this.broadcastSubscription = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          map((broadcaseMessage) => {
            const currentTransform = d3.zoomTransform(svgElement.nativeElement);

            // if (currentTransform !== message?.transform) {
            //   if (message.selection) {
            //     const s = message.selection;
            //
            //     // const domain = sc.domain();
            //
            //     // const scale = (domain[1] - domain[0]) / (s[1] - s[0]);
            //
            //     // let transform = zoomIdentity.scale(scale);
            //
            //     if (message?.brushType === BrushType.x) {
            //       // transform = transform.translate(-sc(s[0]), 0);
            //     }
            //     if (message?.brushType === BrushType.y) {
            //       // transform = transform.translate(0, -sc(s[0]));
            //     }
            //
            //     return;
            //   }
            //   d3.select(svgElement.nativeElement).call(
            //     zoom?.transform,
            //     message?.transform
            //   );
            //   // this.setZoom(message?.transform);
            // }
          })
        )
        .subscribe();
    }
  }

  setZoom(transform: ZoomTransform, args?: any) {
    // requestAnimationFrame(() => {
    //
    //
    // });
    // if (args) {
    //   this.svg?.call(this.zoom.transform, transform, null, args);
    // } else {
    //   this.svg?.call(this.zoom.transform, transform);
    // }
  }
}
