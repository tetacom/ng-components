import { ElementRef, Injectable } from '@angular/core';
import { BrushType } from '../model/enum/brush-type';
import * as d3 from 'd3';
import { map, Subscription } from 'rxjs';
import { BroadcastService } from './broadcast.service';
import { IChartConfig } from '../model/i-chart-config';
import { ScaleService } from './scale.service';

@Injectable({
  providedIn: 'root',
})
export class BrushService {
  broadcastSubscribtion: Subscription;

  private brushMap = new Map<BrushType, d3.BrushBehavior<any>>()
    .set(BrushType.x, d3.brushX())
    .set(BrushType.y, d3.brushY());

  private scaleMap = new Map<BrushType, string>()
    .set(BrushType.x, 'xScales')
    .set(BrushType.y, 'yScales');

  constructor(
    private broadcastService: BroadcastService,
    private scaleService: ScaleService
  ) {}

  applyBrush(svgElement: ElementRef, config: IChartConfig, size: DOMRect) {
    this.broadcastSubscribtion?.unsubscribe();

    if (config.brush?.enable) {
      const s = this.scaleService[
        this.scaleMap.get(config?.brush?.type ?? BrushType.x)
      ].get(config?.brush?.axisIndex ?? 0);

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

            this.broadcastService.broadcast({
              channel: config?.zoom?.syncChannel,
              message: {
                ..._,
                selection: [s.invert(from), s.invert(to)],
                brushType: config?.brush?.type ?? BrushType.x,
              },
            });
          }
        }
      );

      container.call(brushBehavior);

      setTimeout(() => {
        container.call(brush.move, s.domain().map(s), {});
      });

      this.broadcastSubscribtion = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          map((_) => {
            if (_.message?.transform) {
              const s = this.scaleService[
                this.scaleMap.get(config?.brush?.type ?? BrushType.x)
              ].get(config?.brush?.axisIndex ?? 0);

              const domain = _.domain;

              container.call(brush.move, [s(domain[0]), s(domain[1])]);
            }
          })
        )
        .subscribe();
    }
  }
}
