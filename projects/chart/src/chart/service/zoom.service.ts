import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent, zoomIdentity, zoomTransform } from 'd3';
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
import { IBroadcastMessage, ZoomMessage } from '../model/i-broadcast-message';
import { BrushType } from '../model/enum/brush-type';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription[] = [];

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

    if (config?.zoom?.enable) {
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
            const eventTransform = _?.event.transform;
            const currentTransform = zoomTransform(svgElement.nativeElement);

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

          const message: ZoomMessage = {
            event: event,
            axis: _axis,
          };

          this.broadcastService.broadcast({
            channel: config?.zoom?.syncChannel,
            message,
          });
        }
      }
    };

    if (enable) {
      const element = d3.select(svgElement.nativeElement);
      zoom.on('start zoom end', zoomed);
      element.call(zoom);

      const subscription = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          throttleTime(50, undefined, { trailing: true }),
          filter((_) => {
            if ('axis' in _.message) {
              return (
                _axis.index === _.message?.axis?.index &&
                _axis.orientation === _.message?.axis?.orientation
              );
            }
            if ('selection' in _.message) {
              return (
                (_axis.index === 0 &&
                  _axis.orientation === AxisOrientation.x &&
                  _.message.brushType === BrushType.x) ||
                (_axis.index === 0 &&
                  _axis.orientation === AxisOrientation.y &&
                  _.message.brushType === BrushType.y)
              );
            }
            return false;
          }),
          map((broadcaseMessage: IBroadcastMessage) => {
            if ('axis' in broadcaseMessage.message) {
              const currentTransform = d3.zoomTransform(
                svgElement.nativeElement
              );

              if (
                currentTransform !== broadcaseMessage.message.event?.transform
              ) {
                d3.select(svgElement.nativeElement).call(
                  zoom.transform,
                  broadcaseMessage.message.event?.transform,
                  null,
                  {}
                );
              }
            }

            if ('selection' in broadcaseMessage.message) {
              const s = broadcaseMessage.message.selection;
              const domain = broadcaseMessage.message.brushScale.domain();

              const scale = (domain[1] - domain[0]) / (s[1] - s[0]);
              let transform = zoomIdentity.scale(scale);

              if (broadcaseMessage.message?.brushType === BrushType.x) {
                transform = transform.translate(
                  -broadcaseMessage.message.brushScale(s[0]),
                  0
                );
              }
              if (broadcaseMessage.message?.brushType === BrushType.y) {
                transform = transform.translate(
                  0,
                  -broadcaseMessage.message.brushScale(s[0])
                );
              }

              d3.select(svgElement.nativeElement).call(
                zoom.transform,
                transform,
                null,
                {}
              );
            }

            this.broadcastSubscription.push(subscription);
          })
        )
        .subscribe();
    }
  }
}
