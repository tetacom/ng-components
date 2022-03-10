import {ElementRef, Injectable} from '@angular/core';
import {BrushType} from '../model/enum/brush-type';
import * as d3 from 'd3';
import {filter, Subscription, tap} from 'rxjs';
import {BroadcastService} from './broadcast.service';
import {IChartConfig} from '../model/i-chart-config';
import {BrushMessage, IBroadcastMessage, ZoomMessage} from '../model/i-broadcast-message';
import {throttleTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrushService {
  broadcastSubscribtion: Subscription;

  private brush: d3.BrushBehavior<any>;

  private brushMap = new Map<BrushType, d3.BrushBehavior<any>>()
    .set(BrushType.x, d3.brushX())
    .set(BrushType.y, d3.brushY());

  private selection: number[];


  constructor(private broadcastService: BroadcastService) {
  }

  applyBrush(
    svgElement: ElementRef,
    config: IChartConfig,
    brushScale: any
  ) {
    this.broadcastSubscribtion?.unsubscribe();
    this.brush?.on('start brush end', null);
    if (config.brush?.enable) {
      this.brush = this.brushMap.get(config?.brush?.type ?? BrushType.x);

      const container = d3.select(svgElement.nativeElement);

      this.brush.on('start brush end', (_: d3.D3BrushEvent<any>) => {
        if (_.sourceEvent) {
          if (!_.selection) return;

          const [from, to] = _.selection as number[];

          if (to - from === 0) {
            const selection: number[] = this.selection?.map(brushScale) ?? [config.brush?.from, config.brush?.to].map(brushScale);
            const halfBrushHeight = (selection[1] - selection[0]) / 2;
            container.call(this.brush.move, [from - halfBrushHeight, to + halfBrushHeight], {});

            return;
          }


          if (_.type === 'end' && _.sourceEvent instanceof MouseEvent) {
            this.selection = _.selection.map(brushScale.invert);
          }

          const brushMessage = new BrushMessage({
            event: _,
            selection: [brushScale.invert(from), brushScale.invert(to)],
            brushType: config?.brush?.type ?? BrushType.x,
            brushScale,
          });

          this.broadcastService.broadcastBrush({
            channel: config?.zoom?.syncChannel,
            message: brushMessage,
          });
        }
      });


      setTimeout(() => {
        container.call(this.brush);

        let domain = brushScale.domain();


        if (config?.brush?.from) {
          domain[0] = config.brush.from;
        }

        if (config?.brush?.to) {
          domain[1] = config.brush.to;
        }
        container.call(this.brush.move, this.selection ? this.selection.map(brushScale) : domain.map(brushScale), {});

      }, 0);


      this.broadcastSubscribtion = this.broadcastService.subscribeToZoom(config?.zoom?.syncChannel).pipe(
        filter((m: IBroadcastMessage<ZoomMessage>) => {
          return m.message.event.sourceEvent instanceof MouseEvent || m.message.event.sourceEvent instanceof WheelEvent;
        }),
        throttleTime(50, undefined, {trailing: true}),
        tap((m: IBroadcastMessage<ZoomMessage>) => {
          const {message: {brushDomain}} = m;

          container.call(this.brush.move, [
            brushScale(brushDomain[0]),
            brushScale(brushDomain[1]),
          ]);

          console.log('zoom brush', brushDomain)

          this.selection = brushDomain;
        })
      ).subscribe();
    }
  }

  clearPreviousSelection() {
    this.selection = null;
  }
}
