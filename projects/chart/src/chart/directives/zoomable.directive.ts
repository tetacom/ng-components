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
import {ZoomMessage,} from '../model/i-broadcast-message';
import {takeWhile} from 'rxjs';
import {ChartService} from '../service/chart.service';
import {ZoomBehaviorType} from '../model/enum/zoom-behavior-type';

@Directive({
  selector: '[tetaZoomable]',
})
export class ZoomableDirective implements OnDestroy, AfterViewInit {
  @Input() config: IChartConfig;
  @Input() axis: Axis;
  @Input() size: DOMRect;

  @HostBinding('class.zoomable') private zoomable = false;
  @HostBinding('class.crosshair') private crosshair = false;

  private _element: d3.Selection<SVGElement, any, any, any>;
  private zoom: ZoomBehavior<any, any>;
  private alive = true;

  private currentTransform = zoomIdentity;

  constructor(
    private elementRef: ElementRef,
    private zoomService: ZoomService,
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
      if (this._element && this.elementRef !== zoomed?.element
        && zoomed?.axis?.index === this.axis.index
        && zoomed?.axis?.orientation === this.axis.orientation) {
        const scale = this.axis.scale.copy().domain(this.axis.originDomain);
        let transform;
        if (zoomed.domain === null) {
          transform = zoomIdentity;
        } else {
          transform =
            this.zoomService.getD3Transform(zoomed.domain, this.axis.originDomain, scale, this.axis.orientation, this.axis.options.inverted);
        }
        if (zoomed.style?.transition) {
          this._element.transition().call(this.zoom.transform, transform);
        } else {
          this._element.call(this.zoom.transform, transform);
        }
        this.currentTransform = transform;
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
    this._element.call(this.zoom).on('dblclick.zoom', null);

    if (this.config?.zoom?.zoomBehavior === ZoomBehaviorType.wheel) {
      this.runWheelTranslate();
    }
  }

  zoomed = (event: D3ZoomEvent<any, any>) => {
    if (event.sourceEvent) {
      if (Object.keys(event.sourceEvent).length !== 0) {
        const origin = this.axis.scale.copy().domain(this.axis.originDomain);

        let domain =
          this.axis.orientation === AxisOrientation.y
            ? event.transform.rescaleY(origin).domain()
            : event.transform.rescaleX(origin).domain();
        const message = new ZoomMessage({
          eventType: event.type,
          axis: {
            index: this.axis.index,
            orientation: this.axis.orientation,
          },
          element: this.elementRef,
          domain: domain,
          chartId: this.config.id
        });
        this.zoomService.fireZoom(message);
        this.zoomService.broadcastZoom(message);
      }
      this.currentTransform = event.transform;
    }
  };

  private runWheelTranslate() {
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
          : this.axis.orientation === AxisOrientation.y
            ? event.deltaY
            : event.deltaX;

      if (this.axis.orientation === AxisOrientation.y) {
        transform = transform.translate(
          0,
          this.currentTransform.y - delta / 2
        );
      }

      if (this.axis.orientation === AxisOrientation.x) {
        transform = transform.translate(
          this.currentTransform.x - delta / 2,
          0
        );
      }

      transform = transform.scale(this.currentTransform.k);

      let domain =
        this.axis.orientation === AxisOrientation.y
          ? transform.rescaleY(origin).domain()
          : transform.rescaleX(origin).domain();

      const message = new ZoomMessage({
        eventType: type,
        element: this.elementRef,
        axis: {
          index: this.axis.index,
          orientation: this.axis.orientation
        },
        domain,
        chartId: this.config.id,
      });
      this._element?.call(this.zoom.transform, transform);
      this.zoomService.fireZoom(message);
      this.zoomService.broadcastZoom(message);
      this.currentTransform = transform;
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
