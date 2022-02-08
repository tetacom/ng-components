import { ElementRef, Injectable } from '@angular/core';
import { BrushType } from '../model/enum/brush-type';
import * as d3 from 'd3';
import { map, Subscription } from 'rxjs';
import { BroadcastService } from './broadcast.service';
import { IChartConfig } from '../model/i-chart-config';
import { BrushMessage, IBroadcastMessage } from '../model/i-broadcast-message';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { throttleTime } from 'rxjs/operators';
import { ChartService } from './chart.service';

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

  constructor(
    private broadcastService: BroadcastService,
    private chartService: ChartService
  ) {}

  applyBrush(svgElement: ElementRef, config: IChartConfig, brushScale: any, size: DOMRect) {
    this.broadcastSubscribtion?.unsubscribe();

    if (config.brush?.enable) {
      this.brush = this.brushMap.get(config?.brush?.type ?? BrushType.x);

      const container = d3.select(svgElement.nativeElement);

      const range = brushScale.range();

      const verticalBound = size.height - range[1];
      const horizontalBound = size.width - range[1];


      this.chartService.size.pipe(
        throttleTime(50, undefined, {trailing: true}),
        map((_: DOMRect) => {

          if(!this.selection) return;

            if (config.brush?.type === BrushType.x) {
              brushScale.range([range[0], _.width - horizontalBound]);
            }
            if (config.brush?.type === BrushType.y) {
              brushScale.range([range[0], _.height - verticalBound]);
            }


          container.call(this.brush.move, this.selection.map(brushScale));

          const brushMessage: BrushMessage = {
            event: null,
            selection: this.selection,
            brushType: config?.brush?.type ?? BrushType.x
          };


          this.broadcastService.broadcast({
            channel: config?.zoom?.syncChannel,
            message: brushMessage,
          });


        })
      ).subscribe()

      this.brush.on(
        'start brush end',
        (_: d3.D3BrushEvent<any>) => {

          if (_.sourceEvent) {
            if (!_.selection) return;

            const [from, to] = _.selection as number[];

            if (to - from < 5) {
              container.call(this.brush.move, [from, to]);
              return;
            }


            const brushMessage: BrushMessage = {
              event: _,
              selection: [brushScale.invert(from), brushScale.invert(to)],
              brushType: config?.brush?.type ?? BrushType.x
            };


            this.selection = [brushScale.invert(from), brushScale.invert(to)];

            this.broadcastService.broadcast({
              channel: config?.zoom?.syncChannel,
              message: brushMessage,
            });
          }
        }
      );

      setTimeout(() => {
        container.call(this.brush);

        let domain = brushScale.domain();

        if (config?.brush?.from) {
          domain[0] = config.brush.from;
        }

        if (config?.brush?.to) {
          domain[1] = config.brush.to;
        }

        container.call(this.brush.move, domain.map(brushScale), {});


        this.chartService.size.subscribe((size) => {
          setTimeout(() => {
            const extent = this.brush?.extent();
            const brush = this.brush.extent(extent);

            container.call(brush);
          })

        });

      }, 0);

      this.broadcastSubscribtion = this.broadcastService
        .subscribeToChannel(config?.zoom?.syncChannel)
        .pipe(
          throttleTime(50, undefined, { trailing: true }),
          map((_: IBroadcastMessage) => {
            if ('axis' in _.message) {
              if (
                (_.message.axis.index === 0 &&
                  _.message.axis.isFake &&
                  _.message.axis.orientation === AxisOrientation.x &&
                  config.brush.type === BrushType.x) ||
                (_.message.axis.index === 0 &&
                  _.message.axis.isFake &&
                  _.message.axis.orientation === AxisOrientation.y &&
                  config.brush.type === BrushType.y)
              ) {
                if (
                  _.message.event.sourceEvent.type === 'brushed' ||
                  _.message.event.sourceEvent.type === 'sync_transform'
                )
                  return;

                const domain = _.message.brushDomain;

                container.call(this.brush.move, [
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
