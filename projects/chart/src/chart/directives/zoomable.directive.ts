import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {ZoomService} from '../service/zoom.service';
import {IChartConfig} from '../model/i-chart-config';
import {Axis} from '../core/axis/axis';
import * as d3 from 'd3';
import {D3ZoomEvent, ZoomBehavior, zoomIdentity} from 'd3';
import {ZoomType} from '../model/enum/zoom-type';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {BrushMessage, IBroadcastMessage, ZoomMessage} from '../model/i-broadcast-message';
import {BrushType} from '../model/enum/brush-type';
import {BroadcastService} from '../service/broadcast.service';
import {debounceTime, tap, throttleTime} from 'rxjs/operators';
import {animationFrameScheduler, filter, takeWhile, withLatestFrom} from 'rxjs';
import {ChartService} from "../service/chart.service";

@Directive({
  selector: '[tetaZoomable]',
})
export class ZoomableDirective implements OnDestroy, AfterViewInit {
  @Input() config: IChartConfig;
  @Input() axis?: Axis;
  @Input() size: DOMRect;
  @Input() brushScale?: any;


  @HostBinding('class.zoomable') private zoomable = false;

  private _element: d3.Selection<SVGElement, any, any, any>;
  private zoomAxis: Axis;
  private zoom: ZoomBehavior<any, any>;
  private alive = true;

  private currentTransform = zoomIdentity;
  private currentSelection;

  constructor(
    private elementRef: ElementRef,
    private zoomService: ZoomService,
    private broadcastService: BroadcastService,
    private chartService: ChartService
  ) {
  }

  ngOnInit() {
    if (this.axis?.options?.zoom || this.config?.zoom?.enable) {
      this.zoomable = true;
    }
  }


  zoomed = (event: D3ZoomEvent<any, any>) => {
    if (event.sourceEvent) {
      if (Object.keys(event.sourceEvent).length !== 0) {
        if (this.currentTransform === event.transform && event.type !== 'end') {
          return;
        }

        const origin = this.brushScale.copy().domain(this.zoomAxis.extremes);

        let domain = this.config.zoom?.type === ZoomType.y ?
          event.transform.rescaleY(origin).domain() :
          event.transform.rescaleX(origin).domain();

        const message = new ZoomMessage({
          event,
          axis: this.zoomAxis,
          brushDomain: domain,
          chartId: this.config.id
        });

        this.broadcastService.broadcastZoom({
          channel: this.config?.zoom?.syncChannel,
          message,
        });

      }

      this.zoomService.setZoom({
        event,
        target: this.zoomAxis
      });

      this.currentTransform = event.transform;
    }
  };

  ngAfterViewInit() {

    const enable = this.axis?.options?.zoom && this.axis?.options.visible !== false  || this.config?.zoom?.enable;

    if (!enable) {
      return;
    }

    this._element = d3.select(this.elementRef.nativeElement);
    this.zoom = d3
      .zoom()
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

    if (enable) {
      const maxZoom = this.config.zoom?.max ? (this.zoomAxis.extremes[1] - this.zoomAxis.extremes[0]) / this.config.zoom?.max : 0;
      const minZoom = this.config.zoom?.min ? (this.zoomAxis.extremes[1] - this.zoomAxis.extremes[0]) / this.config.zoom?.min : Infinity;


      this.zoom.scaleExtent([maxZoom, minZoom]);

      this.zoom.on('start zoom end', this.zoomed);
      this._element.call(this.zoom);
    }



    // Subscribe to zoom events
    this.broadcastService.subscribeToZoom(this.config?.zoom.syncChannel).pipe(
      takeWhile((_) => this.alive),
      filter((m: IBroadcastMessage<ZoomMessage>) => m.message.event.sourceEvent instanceof MouseEvent || m.message.event.sourceEvent instanceof WheelEvent),
      throttleTime(0, animationFrameScheduler, {trailing: true}),
      filter((m: IBroadcastMessage<ZoomMessage>) => {
        return this.zoomAxis.index === m.message?.axis?.index && this.zoomAxis.orientation === m.message?.axis?.orientation;
      }),
      tap((m: IBroadcastMessage<ZoomMessage>) => {

        const currentTransform = d3.zoomTransform(
          this._element.node()
        );

        if (currentTransform !== m.message.event.transform) {
          this._element.call(this.zoom.transform, m.message.event.transform);
        }

        if(this.config.id !== m.message.chartId) {

          this.zoomService.setZoom({
            event: m.message.event,
            target: this.zoomAxis
          });

          this.currentTransform = m.message.event.transform;
        }

      })
    ).subscribe();


    // Subscribe to brush events x or y

    if ((this.config.brush?.type === BrushType.x && this.zoomAxis.orientation === AxisOrientation.x) ||
      (this.config.brush?.type === BrushType.y && this.zoomAxis.orientation === AxisOrientation.y)) {
      this.broadcastService.subscribeToBrush(this.config?.zoom.syncChannel).pipe(
        takeWhile((_) => this.alive),
        debounceTime(150),
        filter((m: IBroadcastMessage<BrushMessage>) => Boolean(m.message.selection)),
        tap((m: IBroadcastMessage<BrushMessage>) => {

          const currentTransform = d3.zoomTransform(
            this.elementRef.nativeElement
          );

          if (!m.message.event && this.currentSelection && currentTransform.k !== 1) {
            return;
          }

          this.currentSelection = m.message.selection;

          this.updateZoom(m);

        }),
      ).subscribe();
    }
  }


  ngOnDestroy(): void {
    this.zoom?.on('start zoom end', null);
    this.alive = false;
  }

  private updateZoom(m: IBroadcastMessage<BrushMessage>) {



    const s = m.message.selection;
    this.brushScale.domain(this.zoomAxis.extremes);
    const domain = this.brushScale.domain();

    const scale = (domain[1] - domain[0]) / (s[1] - s[0]);

    let transform = zoomIdentity.scale(scale);

    if (m.message?.brushType === BrushType.x) {
      transform = transform.translate(-this.brushScale(s[0]), 0);
    }
    if (m.message?.brushType === BrushType.y) {
      transform = transform.translate(0, -this.brushScale(s[0]));
    }

    this._element.transition().duration(150).call(
      this.zoom.transform,
      transform,
      null,
      {}
    );
  }
}
