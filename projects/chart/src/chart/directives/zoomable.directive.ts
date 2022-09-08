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
import {BrushMessage, IBroadcastMessage, ZoomMessage,} from '../model/i-broadcast-message';
import {BrushType} from '../model/enum/brush-type';
import {BroadcastService} from '../service/broadcast.service';
import {debounceTime, tap} from 'rxjs/operators';
import {combineLatestWith, filter, takeWhile} from 'rxjs';
import {ChartService} from '../service/chart.service';
import {ZoomBehaviorType} from '../model/enum/zoom-behavior-type';
import objectHash from 'object-hash';
import {IChartEvent} from '../model/i-chart-event';

@Directive({
  selector: '[tetaZoomable]',
})
export class ZoomableDirective implements OnDestroy, AfterViewInit {
  @Input() config: IChartConfig;
  @Input() axis: Axis;
  @Input() size: DOMRect;
  // @Input() brushScale?: any;
  // @Input() scale?: any;

  @HostBinding('class.zoomable') private zoomable = false;
  @HostBinding('class.crosshair') private crosshair = false;

  private _element: d3.Selection<SVGElement, any, any, any>;
  private zoom: ZoomBehavior<any, any>;
  private alive = true;

  private currentTransform = zoomIdentity;
  private currentSelection;
  private hash: string;


  constructor(
    private elementRef: ElementRef,
    private zoomService: ZoomService,
    // private broadcastService: BroadcastService,
    private chartService: ChartService,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
    if (this.axis?.options?.zoom || this.config?.zoom?.enable) {
      this.zoomable = this.config?.zoom?.zoomBehavior === ZoomBehaviorType.move && !this.config?.tooltip?.showCrosshair;
      this.crosshair = this.config?.tooltip?.showCrosshair;
    }
  }

  ngAfterViewInit() {
    this.initZoomListeners();
    this.initZoomSync();
    // Subscribe to zoom events
    // this.broadcastService.subscribeToZoom(this.config?.zoom.syncChannel).pipe(
    //   takeWhile((_) => this.alive),
    //   tap((m: IBroadcastMessage<ZoomMessage>) => {
    //     if (
    //       this.axis.index === m.message?.axis?.axisIndex && this.axis.orientation === m.message?.axis?.orientation
    //     ) {
    //       const currentZoom = d3.zoomTransform(this._element.node());
    //
    //       const axisScale = this.axis.scale?.copy().domain(this.axis.originDomain);
    //       const transform = this.getD3Transform(m.message.domain, this.axis.originDomain, axisScale, m.message.axis.orientation);
    //       if (this.config.id === m.message?.chartId && currentZoom !== transform) {
    //         this._element.call(
    //           this.zoom.transform,
    //           transform
    //         );
    //       }
    //     }
    //   }),
    //   // filter(
    //   //   (m: IBroadcastMessage<ZoomMessage>) =>
    //   //     m.message.event.sourceEvent instanceof MouseEvent ||
    //   //     m.message.event.sourceEvent instanceof WheelEvent ||
    //   //     (window.TouchEvent &&
    //   //       m.message.event.sourceEvent instanceof TouchEvent)
    //   // ),
    //   filter((m: IBroadcastMessage<ZoomMessage>) => {
    //     return (
    //       this.axis.index === m.message?.axis?.axisIndex &&
    //       this.axis.orientation === m.message?.axis?.orientation
    //     );
    //   }),
    //   tap((m: IBroadcastMessage<ZoomMessage>) => {
    //     if (this.config.id !== m.message?.chartId) {
    //
    //       this.brushScale.domain(this.axis.originDomain);
    //
    //       const scale = Math.abs(this.axis.originDomain[1] - this.axis.originDomain[0]) / Math.abs(m.message.domain[1] - m.message.domain[0]);
    //
    //       let transform = zoomIdentity.scale(scale);
    //
    //       if (this.config?.zoom?.type === ZoomType.x) {
    //         if (this.config.xAxis[0]?.inverted) {
    //           transform = transform.translate(this.brushScale(-m.message.domain[1]), 0);
    //         } else {
    //           transform = transform.translate(-this.brushScale(m.message.domain[0]), 0);
    //         }
    //       }
    //
    //       if (this.config?.zoom?.type === ZoomType.y) {
    //         if (this.config.yAxis[0]?.inverted) {
    //           transform = transform.translate(0, -this.brushScale(m.message.domain[0]));
    //         } else {
    //           transform = transform.translate(0, -this.brushScale(m.message.domain[1]));
    //         }
    //       }
    //
    //       this._element.call(
    //         this.zoom.transform,
    //         transform,
    //         null,
    //         {}
    //       );
    //     }
    //   })
    // )
    //   .subscribe();

    // Subscribe to brush events x or y

    // if (
    //   (this.config.brush?.type === BrushType.x &&
    //     this.axis.orientation === AxisOrientation.x) ||
    //   (this.config.brush?.type === BrushType.y &&
    //     this.axis.orientation === AxisOrientation.y)
    // ) {

    // this.broadcastService.subscribeToBrush(this.config?.zoom.syncChannel)
    //   .pipe(
    //     combineLatestWith(this.chartService.size),
    //     takeWhile((_) => this.alive),
    //     filter((data: [IBroadcastMessage<BrushMessage>, DOMRect]) => {
    //       const [m] = data;
    //       return Boolean(m.message.selection);
    //     }),
    //     tap((data: [IBroadcastMessage<BrushMessage>, DOMRect]) => {
    //
    //       const [m] = data;
    //       const currentTransform = d3.zoomTransform(this._element.node());
    //
    //
    //       if (
    //         !m.message.event &&
    //         this.currentSelection &&
    //         currentTransform.k !== 1
    //       ) {
    //         return;
    //       }
    //
    //       const s = m.message.selection;
    //
    //       this.brushScale.domain(this.axis.originDomain);
    //       const domain = this.brushScale.domain();
    //       const range = this.brushScale.range();
    //
    //       const scale = Math.abs(domain[1] - domain[0]) / Math.abs(s[1] - s[0]);
    //       let transform = zoomIdentity.scale(scale);
    //
    //       if (m.message?.brushType === BrushType.x) {
    //
    //         this.brushScale.range([range[0], this.size.width]);
    //
    //
    //         if (this.config.xAxis[0]?.inverted) {
    //           transform = transform.translate(-this.brushScale(s[0]), 0);
    //         } else {
    //           transform = transform.translate(-this.brushScale(s[1]), 0);
    //         }
    //       }
    //
    //       if (m.message?.brushType === BrushType.y) {
    //
    //         this.brushScale.range([range[0], this.size.height]);
    //
    //         if (this.config.yAxis[0]?.inverted) {
    //           transform = transform.translate(0, -this.brushScale(s[0]));
    //         } else {
    //           transform = transform.translate(0, -this.brushScale(s[1]));
    //         }
    //       }
    //
    //       if (m.message?.style?.transition) {
    //         this._element.transition().call(this.zoom.transform, transform, null, {});
    //       } else {
    //         this._element.call(this.zoom.transform, transform, null, {});
    //       }
    //
    //       this.currentSelection = m.message.selection;
    //     })
    //   )
    //   .subscribe();
    // }
  }

  ngOnDestroy(): void {
    this.zoom?.on('start zoom end', null);
    this._element?.on('wheel', null);
    this.alive = false;
  }

  private initZoomSync() {
    this.zoomService.zoomed.pipe(
      takeWhile(() => this.alive)
    ).subscribe((zoomed: ZoomMessage) => {
      if (this.elementRef !== zoomed?.element
        && zoomed?.axis?.index === this.axis.index
        && zoomed?.axis?.orientation === this.axis.orientation) {
        const transform =
          this.zoomService.getD3Transform(zoomed.domain, this.axis.originDomain, this.axis.scale, this.axis.orientation, this.axis.options.inverted);
        console.log('call');
        this._element.call(this.zoom.transform, transform);
      }
    });
  }

  private initZoomListeners() {
    const enable =
      (this.axis?.options?.zoom && this.axis?.options.visible !== false) ||
      this.config?.zoom?.enable;

    if (!enable) {
      return;
    }

    this._element = d3.select(this.elementRef.nativeElement);
    this.hash = objectHash.sha1({index: this.axis.index, orientation: this.axis.orientation});

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

    if (this.config.zoom?.wheelDelta) {
      this.zoom.wheelDelta(this.config.zoom?.wheelDelta);
    }

    const maxZoom = this.config.zoom?.max
      ? (this.axis.extremes[1] - this.axis.extremes[0]) /
      this.config.zoom?.max
      : this.config.zoom?.limitZoomByData
        ? 1
        : 0;

    const minZoom = this.config.zoom?.min
      ? (this.axis.extremes[1] - this.axis.extremes[0]) /
      this.config.zoom?.min
      : Infinity;

    this.zoom.scaleExtent([maxZoom, minZoom]);

    this.zoom.on('zoom end', this.zoomed);
    this._element.call(this.zoom).on('dblclick.zoom', null); // Disable dbclick zoom

    if (this.config?.zoom?.zoomBehavior === ZoomBehaviorType.wheel) {
      // this.runWheelZoom();
    }
  }


  zoomed = (event: D3ZoomEvent<any, any>) => {
    console.log('zoomed', event);
    if (event.sourceEvent) {
      if (Object.keys(event.sourceEvent).length !== 0) {

        // if (this.currentTransform === event.transform) {
        //   return;
        // }

        const origin = this.axis.scale.copy().domain(this.axis.originDomain);

        let domain =
          this.axis.orientation === AxisOrientation.y
            ? event.transform.rescaleY(origin).domain()
            : event.transform.rescaleX(origin).domain();
        const message = new ZoomMessage({
          axis: {
            index: this.axis.index,
            orientation: this.axis.orientation,
          },
          element: this.elementRef,
          domain: domain,
          chartId: this.config.id
        });
        // if (event.sourceEvent instanceof MouseEvent ||
        //   event.sourceEvent instanceof WheelEvent ||
        //   (window.TouchEvent &&
        //     event.sourceEvent instanceof TouchEvent)
        // ) {
        //   console.log('broadcastZoom');
        //   this.broadcastService.broadcastZoom({
        //     channel: this.config?.zoom?.syncChannel,
        //     message,
        //   });
        // }
        this.zoomService.fireZoom(message);
      }
      this.currentTransform = event.transform;
    }
  };

  private runWheelZoom() {
    let type: 'start' | 'zoom' | 'end' = 'start';
    let wheeling;

    this.zoom
      .filter(
        (event) => {
          return (event.ctrlKey && event.type === 'wheel') ||
            Boolean(window.TouchEvent && event.type !== 'wheel');
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
      const origin = this.axis.scale.copy().domain(this.axis.originDomain);
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
        // event: {
        //   sourceEvent: event,
        //   transform,
        //   type,
        // },
        element: this.elementRef,
        axis: {
          index: this.axis.index,
          orientation: this.axis.orientation
        },
        domain,
        chartId: this.config.id,
      });

      this.zoomService.fireZoom(message);

      this._element.call(this.zoom.transform, transform);
      this.currentTransform = transform;

      // this.broadcastService.broadcastZoom({
      //   channel: this.config?.zoom?.syncChannel,
      //   message,
      // });
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

  private getD3Transform(domain: [number, number], originalDomain: [number, number], scale, orientation) {
    const zoomScale = Math.abs(originalDomain[1] - originalDomain[0]) / Math.abs(domain[1] - domain[0]);
    let transform = zoomIdentity.scale(zoomScale);
    if (orientation === AxisOrientation.x) {
      if (this.axis.options?.inverted) {
        transform = transform.translate(-scale(domain[0]), 0);
      } else {
        transform = transform.translate(-scale(domain[1]), 0);
      }
    }

    if (orientation === AxisOrientation.y) {
      if (this.axis.options?.inverted) {
        transform = transform.translate(0, -scale(domain[0]));
      } else {
        transform = transform.translate(0, -scale(domain[1]));
      }
    }
    return transform;
  }
}
