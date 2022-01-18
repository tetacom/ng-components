import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import * as d3 from 'd3';
import { BroadcastService } from '../service/broadcast.service';
import { map } from 'rxjs';
import { ScaleService } from '../service/scale.service';

@Directive({
  selector: 'svg:svg[tetaBrushable]',
})
export class BrushableDirective implements OnInit, AfterViewInit {
  @Input() config?: IChartConfig;
  @Input() size?: DOMRect;

  constructor(
    private element: ElementRef,
    private scaleService: ScaleService,
    private broadcastService: BroadcastService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.config.brush?.enable) {
      const x = this.scaleService.xScales.get(0);

      const brush = d3.brushX();
      const container = d3.select(this.element.nativeElement);

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
              channel: this.config?.zoom?.syncChannel,
              message: {
                ..._,
                selection: [x.invert(from), x.invert(to)],
              },
            });
          }
        }
      );

      container.call(brushBehavior);

      container.call(brush.move, x.domain().map(x));

      this.broadcastService
        .subscribeToChannel(this.config?.zoom?.syncChannel)
        .pipe(
          map((_) => {
            if (_.message?.transform) {
              const x = this.scaleService.xScales.get(0);
              const domain = _.domain;

              container.call(brush.move, [x(domain[0]), x(domain[1])]);
            }
          })
        )
        .subscribe();
    }
  }
}
