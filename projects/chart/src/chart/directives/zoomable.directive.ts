import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import {ZoomService} from '../service/zoom.service';
import {IChartConfig} from '../model/i-chart-config';
import {Axis} from '../core/axis/axis';
import * as d3 from 'd3';
import {D3ZoomEvent, ZoomBehavior, zoomIdentity} from 'd3';
import {ZoomType} from '../model/enum/zoom-type';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {
  BrushMessage,
  IBroadcastMessage,
  ZoomMessage,
} from '../model/i-broadcast-message';
import {BrushType} from '../model/enum/brush-type';
import {BroadcastService} from '../service/broadcast.service';
import {debounceTime, tap, throttle, throttleTime} from 'rxjs/operators';
import {
  animationFrameScheduler,
  combineLatest,
  filter,
  takeWhile,
} from 'rxjs';
import {ChartService} from '../service/chart.service';
import {ZoomBehaviorType} from '../model/enum/zoom-behavior-type';

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
    private chartService: ChartService,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    if (this.axis?.options?.zoom || this.config?.zoom?.enable) {
      this.zoomable = this.config?.zoom?.zoomBehavior === ZoomBehaviorType.move;
    }
  }

  zoomed = (event: D3ZoomEvent<any, any>) => {
    if (event.sourceEvent) {
      if (Object.keys(event.sourceEvent).length !== 0) {
        if (this.currentTransform === event.transform && event.type !== 'end') {
          return;
        }

        const origin = this.brushScale.copy().domain(this.zoomAxis.extremes);

        let domain =
          this.config.zoom?.type === ZoomType.y
            ? event.transform.rescaleY(origin).domain()
            : event.transform.rescaleX(origin).domain();

        const message = new ZoomMessage({
          event,
          axis: this.zoomAxis,
          brushDomain: domain,
          chartId: this.config.id,
        });

        this.broadcastService.broadcastZoom({
          channel: this.config?.zoom?.syncChannel,
          message,
        });
      }

      this.zoomService.fireZoom({
        event,
        target: this.zoomAxis,
      });

      this.currentTransform = event.transform;
    }
  };

  ngAfterViewInit() {
    const enable =
      (this.axis?.options?.zoom && this.axis?.options.visible !== false) ||
      this.config?.zoom?.enable;

    if (!enable) {
      return;
    }

    this._element = d3.select(this.elementRef.nativeElement);

    if (!this.axis) {
      this.zoomService.setElement(this._element);
    }

    this.zoom = d3.zoom().extent([
      [0, 0],
      [this.size.width, this.size.height],
    ]);

    if (this.config.zoom?.limitTranslateByData) {
      this.zoom.translateExtent([
        [0, 0],
        [this.size.width, this.size.height],
      ]);
    }

    const commonZoomAxis = Axis.createAxis(
      this.config?.zoom.type === ZoomType.x
        ? AxisOrientation.x
        : AxisOrientation.y,
      this.config,
      0,
      true
    );

    this.zoomAxis = this.axis ?? commonZoomAxis;

    if (!this.axis) {
      this.zoomService.setAxis(commonZoomAxis);
    }

    if (enable) {
      const maxZoom = this.config.zoom?.max
        ? (this.zoomAxis.extremes[1] - this.zoomAxis.extremes[0]) /
        this.config.zoom?.max
        : this.config.zoom?.limitZoomByData
          ? 1
          : 0;

      const minZoom = this.config.zoom?.min
        ? (this.zoomAxis.extremes[1] - this.zoomAxis.extremes[0]) /
        this.config.zoom?.min
        : Infinity;

      this.zoom.scaleExtent([maxZoom, minZoom]);

      this.zoom.on('zoom end', this.zoomed);
      this._element.call(this.zoom).on('dblclick.zoom', null);

      this.zoomService.setZoomBehavior(this.zoom);

      if (this.config?.zoom?.zoomBehavior === ZoomBehaviorType.wheel) {
        let type: 'start' | 'zoom' | 'end' = 'start';
        let wheeling;


        this.zoom
          .filter(
            (event) => {
              return (event.ctrlKey && event.type === 'wheel') ||
                Boolean(window.TouchEvent && event.type !== 'wheel')
            }
          )
          .wheelDelta((event) => {
            const delta =
              this.config?.zoom.type === ZoomType.x
                ? -event.deltaX
                : -event.deltaY;
            return delta * 0.002;
          });

        const emit = (type: string, event: WheelEvent) => {
          const origin = this.brushScale.copy().domain(this.zoomAxis.extremes);
          let transform = zoomIdentity;
          const delta =
            type === 'end'
              ? 0
              : this.config.zoom?.type === ZoomType.y
                ? event.deltaY
                : event.deltaX;

          if (this.config.zoom?.type === ZoomType.y) {
            transform = transform.translate(
              0,
              this.currentTransform.y - delta / 2
            );
          }

          if (this.config.zoom?.type === ZoomType.x) {
            transform = transform.translate(
              this.currentTransform.x - delta / 2,
              0
            );
          }

          transform = transform.scale(this.currentTransform.k);

          let domain =
            this.config.zoom?.type === ZoomType.y
              ? transform.rescaleY(origin).domain()
              : transform.rescaleX(origin).domain();

          const message = new ZoomMessage({
            event: {
              sourceEvent: event,
              transform,
              type,
            },
            axis: this.zoomAxis,
            brushDomain: domain,
            chartId: this.config.id,
          });

          this.zoomService.fireZoom({
            event: {
              sourceEvent: event,
              transform,
              type,
            },
            target: this.zoomAxis,
          });

          this._element.call(this.zoom.transform, transform);
          this.currentTransform = transform;

          this.broadcastService.broadcastZoom({
            channel: this.config?.zoom?.syncChannel,
            message,
          });
        };


        this._element.on('wheel', (event: WheelEvent) => {
          event.preventDefault();

          if (event.ctrlKey) {
            return;
          }

          this.zone.runOutsideAngular(() => {
            clearTimeout(wheeling);
            emit(type, event);
            type = 'zoom';

            wheeling = setTimeout(() => {
              emit('end', event);
              
              type = 'start';
            }, 50);
          });
        });


      }
    }

    // Subscribe to zoom events
    this.broadcastService
      .subscribeToZoom(this.config?.zoom.syncChannel)
      .pipe(
        takeWhile((_) => this.alive),

        filter(
          (m: IBroadcastMessage<ZoomMessage>) =>
            m.message.event.sourceEvent instanceof MouseEvent ||
            m.message.event.sourceEvent instanceof WheelEvent ||
            (window.TouchEvent &&
              m.message.event.sourceEvent instanceof TouchEvent)
        ),
        filter((m: IBroadcastMessage<ZoomMessage>) => {
          return (
            this.zoomAxis.index === m.message?.axis?.index &&
            this.zoomAxis.orientation === m.message?.axis?.orientation
          );
        }),
        tap((m: IBroadcastMessage<ZoomMessage>) => {
          if (this.config.id !== m.message.chartId) {
            this._element.call(
              this.zoom.transform,
              m.message.event.transform,
              null,
              {}
            );
          } else {
            if (
              (m.message.axis.isFake && !this.zoomAxis.isFake) ||
              (!m.message.axis.isFake && this.zoomAxis.isFake)
            ) {
              this._element.call(
                this.zoom.transform,
                m.message.event.transform
              );
            }
          }
        })
      )
      .subscribe();

    // Subscribe to brush events x or y

    if (
      (this.config.brush?.type === BrushType.x &&
        this.zoomAxis.orientation === AxisOrientation.x) ||
      (this.config.brush?.type === BrushType.y &&
        this.zoomAxis.orientation === AxisOrientation.y)
    ) {
      combineLatest([
        this.broadcastService.subscribeToBrush(this.config?.zoom.syncChannel),
        this.chartService.size,
      ])
        .pipe(
          takeWhile((_) => this.alive),
          debounceTime(150),
          filter((data: [IBroadcastMessage<BrushMessage>, DOMRect]) =>
            Boolean(data[0].message.selection)
          ),
          tap((data: [IBroadcastMessage<BrushMessage>, DOMRect]) => {
            const [m] = data;

            const currentTransform = d3.zoomTransform(this._element.node());

            if (
              !m.message.event &&
              this.currentSelection &&
              currentTransform.k !== 1
            ) {
              return;
            }

            this.updateZoom(m);
            this.currentSelection = m.message.selection;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.zoom?.on('start zoom end', null);
    this._element?.on('wheel', null);

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

    this._element.call(this.zoom.transform, transform, null, {});
  }
}
