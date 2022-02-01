import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, zoomTransform } from 'd3';
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
import { Axis } from '../core/axis/axis';
import { IChartEvent } from '../model/i-chart-event';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { ZoomType } from '../model/enum/zoom-type';

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

    const fakeAxis = Axis.createAxis(
      config?.zoom.type === ZoomType.x ? AxisOrientation.x : AxisOrientation.y,
      config,
      0,
      true
    );

    const _axis = axis ? axis : fakeAxis;

    const zoom = d3
      .zoom()
      .scaleExtent([1, 50])
      .extent([
        [0, 0],
        [size.width, size.height],
      ]);

    if (config?.zoom?.enable || axis === undefined) {
      this.zoomed
        .pipe(
          filter(
            (_) =>
              (_?.target?.orientation === AxisOrientation.x &&
                _?.target.index === 0 &&
                config?.zoom.type === ZoomType.x &&
                _axis.orientation === AxisOrientation.x) ||
              (_?.target?.orientation === AxisOrientation.y &&
                _?.target.index === 0 &&
                config?.zoom.type === ZoomType.y &&
                _axis.orientation === AxisOrientation.y)
          ),
          filter((_) => _?.event?.type === 'end'),
          map((_) => {
            console.log(svgElement);

            const eventTransform = _?.event.transform;
            const currentTransform = zoomTransform(svgElement.nativeElement);

            console.log(currentTransform, eventTransform);

            if (currentTransform !== eventTransform) {
              d3.select(svgElement.nativeElement).call(
                zoom.transform,
                eventTransform
              );
            }
          })
        )
        .subscribe();
    }

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      if (enable) {
        if (event.sourceEvent) {
          this.zoomed$.next({
            event,
            target: _axis,
          });

          // const message: ZoomMessage = {
          //   event: event,
          // };
          //
          // this.broadcastService.broadcast({
          //   channel: config?.zoom?.syncChannel,
          //   message,
          //   // domain: this.scaleService[
          //   //   config?.zoom?.type === ZoomType.x ? 'xScaleMap' : 'yScaleMap'
          //   //   ]
          //   //   .get(config.brush?.axisIndex ?? 0)
          //   //   .domain(),
          // });
        }
      }
    };

    if (enable) {
      const element = d3.select(svgElement.nativeElement);
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
}
