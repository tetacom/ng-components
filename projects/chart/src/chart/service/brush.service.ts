import { ElementRef, Injectable } from '@angular/core';
import { BrushType } from '../model/enum/brush-type';
import * as d3 from 'd3';
import { map, Subscription } from 'rxjs';
import { BroadcastService } from './broadcast.service';
import { IChartConfig } from '../model/i-chart-config';
import { BrushMessage } from '../model/i-broadcast-message';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrushService {
  broadcastSubscribtion: Subscription;

  private brushMap = new Map<BrushType, d3.BrushBehavior<any>>()
    .set(BrushType.x, d3.brushX())
    .set(BrushType.y, d3.brushY());

  constructor(private broadcastService: BroadcastService) {}

  applyBrush(svgElement: ElementRef, config: IChartConfig, brushScale: any) {
    this.broadcastSubscribtion?.unsubscribe();

    if (config.brush?.enable) {
      const brush = this.brushMap.get(config?.brush?.type ?? BrushType.x);

      const container = d3.select(svgElement.nativeElement);

      const brushBehavior = brush.on(
        'start brush end',
        (_: d3.D3BrushEvent<any>) => {
          if (_.sourceEvent) {
            const [from, to] = _.selection as number[];

            if (to - from < 5) {
              container.call(brush.move, [from, to]);
              return;
            }

            const brushMessage: BrushMessage = {
              event: _,
              selection: [brushScale.invert(from), brushScale.invert(to)],
              brushType: config?.brush?.type ?? BrushType.x,
              brushScale,
            };

            this.broadcastService.broadcast({
              channel: config?.zoom?.syncChannel,
              message: brushMessage,
            });
          }
        }
      );

      setTimeout(() => {
        container.call(brushBehavior);

        let domain = brushScale.domain();

        if (config?.brush?.from) {
          domain[0] = config.brush.from;
        }

        if (config?.brush?.to) {
          domain[1] = config.brush.to;
        }

        container.call(brush.move, domain.map(brushScale), {});
      }, 0);

      this.broadcastSubscribtion = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          throttleTime(50, undefined, { trailing: true }),
          map((_) => {
            if ('axis' in _.message) {
              if (
                (_.message.axis.index === 0 &&
                  _.message.axis.orientation === AxisOrientation.x &&
                  config.brush.type === BrushType.x) ||
                (_.message.axis.index === 0 &&
                  _.message.axis.orientation === AxisOrientation.y &&
                  config.brush.type === BrushType.y)
              ) {
                const rescaled =
                  config?.brush?.type === BrushType.x
                    ? _.message.event.transform.rescaleX(brushScale)
                    : _.message.event.transform.rescaleY(brushScale);

                const domain = rescaled.domain();

                container.call(brush.move, [
                  brushScale(domain[0]),
                  brushScale(domain[1]),
                ]);
              }
            }
          })
        )
        .subscribe();
    }
  }
}
