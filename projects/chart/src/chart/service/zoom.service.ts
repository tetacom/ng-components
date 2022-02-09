import {ElementRef, Injectable} from '@angular/core';
import * as d3 from 'd3';
import {D3ZoomEvent, zoomIdentity} from 'd3';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  shareReplay,
  Subscription, withLatestFrom,
} from 'rxjs';
import {IChartConfig} from '../model/i-chart-config';
import {BroadcastService} from './broadcast.service';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {ZoomType} from '../model/enum/zoom-type';
import {IBroadcastMessage, ZoomMessage} from '../model/i-broadcast-message';
import {BrushType} from '../model/enum/brush-type';
import {throttleTime} from 'rxjs/operators';
import {ChartService} from "./chart.service";
import {ScaleService} from "./scale.service";

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription[] = [];

  zoomed: Observable<IChartEvent<Axis>>;
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  constructor(private broadcastService: BroadcastService, private chartService: ChartService) {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay(1));
  }

  applyZoom(
    svgElement: ElementRef,
    config: IChartConfig,
    size: DOMRect,
    axis?: Axis,
    brushScale?: any
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
      .scaleExtent([0, 500])
      .extent([
        [0, 0],
        [size.width, size.height],
      ]);


    let brushDomain;

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      if (enable) {
        if (event.sourceEvent) {
          this.zoomed$.next({
            event,
            target: _axis,
          });

          if(event.sourceEvent?.type === 'restore_resize_zoom') {
            return;
          }

          brushDomain = config.brush?.type === BrushType.x
            ? event.transform.rescaleX(brushScale).domain()
            : event.transform.rescaleY(brushScale).domain();


          const message: ZoomMessage = {
            event: event,
            axis: _axis,
            brushDomain:
              config.brush?.type === BrushType.x
                ? event.transform.rescaleX(brushScale).domain()
                : event.transform.rescaleY(brushScale).domain(),
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


      const range = brushScale.range();
      const domain = brushScale.domain();

      const verticalBound = size.height - range[1];
      const horizontalBound = size.width - range[1];


      this.chartService.size.pipe(
        throttleTime(50, undefined, {trailing: true}),
        map((_: DOMRect) => {

          if (_axis.isFake) {
            if (config.brush?.type === BrushType.x) {
              brushScale.range([range[0], _.width - horizontalBound]);
            }
            if (config.brush?.type === BrushType.y) {
              brushScale.range([range[0], _.height - verticalBound]);
            }
          }

        })
      ).subscribe()

      const subscription = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          throttleTime(50, undefined, {trailing: true}),
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
                  {type: 'sync_transform'}
                );
              }
            }

            if ('selection' in broadcaseMessage.message) {

              if (!_axis.isFake) return;
              if (!broadcaseMessage.message.selection) return;

              const s = broadcaseMessage.message.selection;
              const domain = brushScale.domain();

              const scale = (domain[1] - domain[0]) / (s[1] - s[0]);
              let transform = zoomIdentity.scale(scale);

              if (broadcaseMessage.message?.brushType === BrushType.x) {
                transform = transform.translate(-brushScale(s[0]), 0);
              }
              if (broadcaseMessage.message?.brushType === BrushType.y) {
                transform = transform.translate(0, -brushScale(s[0]));
              }

              d3.select(svgElement.nativeElement).call(
                zoom.transform,
                transform,
                null,
                {type: 'brushed'}
              );
            }

            this.broadcastSubscription.push(subscription);
          })
        )
        .subscribe();
    }
  }
}
