import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, zoomIdentity, ZoomTransform, zoomTransform } from 'd3';
import {
  BehaviorSubject,
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

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription;

  zoomed: Observable<IChartEvent<Axis>>;
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  private x = new Map<number, any>();
  private y = new Map<number, any>();

  private zoom: d3.ZoomBehavior<Element, unknown>;
  private svg;

  constructor(private broadcastService: BroadcastService) {
    this.zoomed = this.zoomed$.asObservable();
  }

  applyZoom(
    svgElement: ElementRef,
    config: IChartConfig,
    size: DOMRect,
    axis?: Axis
  ) {
    this.broadcastSubscription?.unsubscribe();
    this.svg = d3.select(svgElement.nativeElement);

    const enable = axis?.options?.zoom || config?.zoom?.enable;

    this.zoomed
      .pipe(
        map((_) => {
          const transform = _?.event?.transform;

          if (transform === undefined) {
            return;
          }

          const currentTransform = this.svg
            ? d3.zoomTransform(svgElement.nativeElement)
            : zoomIdentity;

          if (currentTransform !== transform && _?.event?.type === 'end') {
            this.setZoom(_?.event?.transform, { type: 'syncNodes' });
          }

          console.log(currentTransform, svgElement);
        })
      )
      .subscribe();

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      if (enable) {
        if (event.sourceEvent?.type === 'syncNodes') {
          return;
        }

        this.zoomed$.next({
          event,
          target: axis,
        });

        if (event.sourceEvent) {
          // this.broadcastService.broadcast({
          //   channel: config?.zoom?.syncChannel,
          //   message: event,
          //   domain: this.scaleService[
          //     config?.zoom?.type === ZoomType.x ? 'xScaleMap' : 'yScaleMap'
          //     ]
          //     .get(config.brush?.axisIndex ?? 0)
          //     .domain(),
          // });
        }
      }
    };

    if (enable) {
      this.zoom = d3
        .zoom()
        .scaleExtent([1, 50])
        .extent([
          [0, 0],
          [size.width, size.height],
        ]);

      this.zoom.on('start zoom end', zoomed);
      this.svg.call(this.zoom);

      // const sc =
      //   config?.zoom?.type === ZoomType.x
      //     ? this.x.get(config.brush?.axisIndex ?? 0)
      //     : this.y.get(config.brush?.axisIndex ?? 0);

      this.broadcastSubscription = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          map((_) => {
            const currentTransform = d3.zoomTransform(this.svg.node());

            const { message } = _;
            if (currentTransform !== message?.transform) {
              if (message.selection) {
                const s = message.selection;

                // const domain = sc.domain();

                // const scale = (domain[1] - domain[0]) / (s[1] - s[0]);

                // let transform = zoomIdentity.scale(scale);

                if (message?.brushType === BrushType.x) {
                  // transform = transform.translate(-sc(s[0]), 0);
                }
                if (message?.brushType === BrushType.y) {
                  // transform = transform.translate(0, -sc(s[0]));
                }

                // this.setZoom(transform);

                return;
              }

              // this.setZoom(message?.transform);
            }
          })
        )
        .subscribe();
    }
  }

  setZoom(transform: ZoomTransform, args?: any) {
    // requestAnimationFrame(() => {
    //
    // });

    if (args) {
      this.svg?.call(this.zoom.transform, transform, null, args);
    } else {
      this.svg?.call(this.zoom.transform, transform);
    }
  }
}
