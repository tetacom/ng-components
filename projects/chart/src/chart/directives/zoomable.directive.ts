import {Directive, ElementRef, HostBinding, Input, OnDestroy, SimpleChanges,} from '@angular/core';
import {ZoomService} from '../service/zoom.service';
import {IChartConfig} from '../model/i-chart-config';
import {Axis} from '../core/axis/axis';

import * as d3 from 'd3';
import {D3ZoomEvent, ZoomBehavior, zoomIdentity} from 'd3';
import {ZoomType} from "../model/enum/zoom-type";
import {AxisOrientation} from "../model/enum/axis-orientation";
import {BrushMessage, IBroadcastMessage, ZoomMessage} from "../model/i-broadcast-message";
import {BrushType} from "../model/enum/brush-type";
import {BroadcastService} from "../service/broadcast.service";
import {tap, throttleTime} from "rxjs/operators";
import {filter, takeWhile} from "rxjs";

@Directive({
  selector: '[tetaZoomable]',
})
export class ZoomableDirective implements OnDestroy {
  @Input() config?: IChartConfig;
  @Input() axis?: Axis;
  @Input() size?: DOMRect;
  @Input() brushScale?: any;

  @HostBinding('class.zoomable') private zoomable = false;

  private _element: d3.Selection<SVGElement, any, any, any>;
  private zoomAxis: Axis;
  private zoom: ZoomBehavior<any, any>;
  private alive = true;

  constructor(
    private elementRef: ElementRef,
    private zoomService: ZoomService,
    private broadcastService: BroadcastService
  ) {
  }

  ngOnInit() {
    if (this.axis?.options?.zoom || this.config?.zoom?.enable) {
      this.zoomable = true;
    }
  }

  ngAfterViewInit() {

    const enable = this.axis?.options?.zoom || this.config?.zoom?.enable;

    if (!enable) {
      return;
    }

    this._element = d3.select(this.elementRef.nativeElement);

    this.zoom = d3
      .zoom()
      .scaleExtent([0, Infinity])
      .extent([
        [0, 0],
        [this.size.width, this.size.height],
      ]);


    const commonZoomAxis = Axis.createAxis(
      this.config?.zoom.type === ZoomType.x ? AxisOrientation.x : AxisOrientation.y,
      this.config,
      0,
      true
    );

    this.zoomAxis = this.axis ?? commonZoomAxis;

    const zoomed = (event: D3ZoomEvent<any, any>) => {

      if (enable) {
        if (event.sourceEvent) {

          this.zoomService.setZoom({
            event,
            target: this.zoomAxis
          })

          const message = new ZoomMessage({
            event,
            axis: this.zoomAxis,
            brushDomain:
              this.config.brush?.type === BrushType.x
                ? this.brushScale.domain()
                : this.brushScale.domain(),
          });


          this.broadcastService.broadcastZoom({
            channel: this.config?.zoom?.syncChannel,
            message,
          });


        }
      }
    };

    this.zoom.on('start zoom end', zoomed);
    this._element.call(this.zoom);


    // Subscribe to zoom events
    this.broadcastService.subscribeToZoom(this.config?.zoom.syncChannel).pipe(
      takeWhile((_) => this.alive),
      filter((m: IBroadcastMessage<ZoomMessage>) => m.message.event.sourceEvent instanceof MouseEvent || m.message.event.sourceEvent instanceof WheelEvent),
      throttleTime(50, undefined, {trailing: true}),
      filter((m: IBroadcastMessage<ZoomMessage>) => {
        return this.zoomAxis.index === m.message?.axis?.index && this.zoomAxis.orientation === m.message?.axis?.orientation
      }),
      tap((m: IBroadcastMessage<ZoomMessage>) => {

        if(m.message.event.type !== 'zoom') return;

        const currentTransform = d3.zoomTransform(
          this.elementRef.nativeElement
        );

        if (currentTransform !== m.message.event.transform) {
          this._element.call(this.zoom.transform, m.message.event.transform, null, {})
        }
      })
    ).subscribe()


    // Subscribe to brush events x or y

    if ((this.config.brush?.type === BrushType.x && this.zoomAxis.orientation === AxisOrientation.x) || (this.config.brush?.type === BrushType.y && this.zoomAxis.orientation === AxisOrientation.y)) {
      this.broadcastService.subscribeToBrush(this.config?.zoom.syncChannel).pipe(
        takeWhile((_) => this.alive),
        throttleTime(50, undefined, {trailing: true}),
        filter((m: IBroadcastMessage<BrushMessage>) => Boolean(m.message.selection)),
        tap((m: IBroadcastMessage<BrushMessage>) => {

          const s = m.message.selection;

          this.brushScale.domain(m.message.brushScale.domain());
          const domain = this.brushScale.domain();

          const scale = (domain[1] - domain[0]) / (s[1] - s[0]);
          let transform = zoomIdentity.scale(scale);

          if (m.message?.brushType === BrushType.x) {
            transform = transform.translate(-this.brushScale(s[0]), 0);
          }
          if (m.message?.brushType === BrushType.y) {
            transform = transform.translate(0, -this.brushScale(s[0]));
          }

          this._element.call(
            this.zoom.transform,
            transform,
            null,
            {}
          );

        })
      ).subscribe()
    }


  }


  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
