import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ZoomService } from '../service/zoom.service';
import { IChartConfig } from '../model/i-chart-config';
import { Axis } from '../core/axis/axis';
import * as d3 from 'd3';
import { D3ZoomEvent, ZoomBehavior, zoomIdentity } from 'd3';
import { ZoomType } from '../model/enum/zoom-type';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { ZoomMessage } from '../model/i-broadcast-message';
import { combineLatest, takeWhile } from 'rxjs';
import { ZoomBehaviorType } from '../model/enum/zoom-behavior-type';
import { ScaleType } from '../model/enum/scale-type';
import { ScaleService } from '../service/scale.service';

@Directive({
  selector: '[tetaZoomable]',
  standalone: true,
})
export class ZoomableDirective implements OnDestroy, AfterViewInit, OnInit {
  @Input() config: IChartConfig;
  @Input() axis: Axis;
  @Input() size: DOMRect;

  @HostBinding('class.zoomable') private zoomable = false;
  @HostBinding('class.crosshair') private crosshair = false;

  private _element: d3.Selection<SVGElement, any, any, any>;
  private zoom: ZoomBehavior<any, any>;
  private alive = true;

  @HostListener('mouseenter')
  mouseenter() {
    this.zoom?.on('start zoom end', this.zoomed);
    this._element?.call(this.zoom).on('dblclick.zoom', null);
    if (this.config?.zoom?.zoomBehavior === ZoomBehaviorType.wheel) {
      this.runWheelTranslate();
    }
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.zoom?.on('start zoom end', null);
    this._element?.on('wheel', null);
  }

  private currentTransform = zoomIdentity;

  constructor(
    private elementRef: ElementRef,
    private zoomService: ZoomService,
    private scaleService: ScaleService,
    private zone: NgZone,
  ) {}

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
    combineLatest([this.scaleService.scales, this.zoomService.zoomed])
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        const [scales, zoomed] = data;
        if (
          this._element &&
          this.elementRef !== zoomed?.element &&
          zoomed?.axis?.index === this.axis.index &&
          zoomed?.axis?.orientation === this.axis.orientation
        ) {
          const axis =
            this.axis.orientation === AxisOrientation.x ? scales.x.get(this.axis.index) : scales.y.get(this.axis.index);
          const scale = axis.scale.copy().domain(this.axis.originDomain);
          let transform;
          if (zoomed.domain === null) {
            transform = zoomIdentity;
          } else {
            transform = this.zoomService.getD3Transform(
              zoomed.domain,
              axis.originDomain,
              scale,
              axis.orientation,
              axis.options.inverted,
            );
          }

          this.elementRef.nativeElement.__zoom = transform;
          this.currentTransform = transform;
        }
      });
  }

  private initZoomListeners() {
    const enable = (this.axis?.options?.zoom && this.axis?.options.visible !== false) || this.config?.zoom?.enable;

    if (!enable) {
      return;
    }

    this._element = d3.select(this.elementRef.nativeElement);
    this.zoom = d3.zoom().extent([
      [0, 0],
      [this.size.width, this.size.height],
    ]);

    const min = this.config?.zoom?.minTranslate != null ? this.axis.scale(this.config?.zoom?.minTranslate) : -Infinity;
    const max = this.config?.zoom?.maxTranslate != null ? this.axis.scale(this.config?.zoom?.maxTranslate) : Infinity;
    if (this.axis.orientation === AxisOrientation.x && this.config.zoom.type === ZoomType.x) {
      this.zoom.translateExtent([
        [Math.min(min, max), -Infinity],
        [Math.max(min, max), Infinity],
      ]);
    }

    if (this.axis.orientation === AxisOrientation.y && this.config.zoom.type === ZoomType.y) {
      this.zoom.translateExtent([
        [-Infinity, Math.min(min, max)],
        [Infinity, Math.max(min, max)],
      ]);
    }

    if (this.config.zoom?.wheelDelta) {
      this.zoom.wheelDelta(this.config.zoom?.wheelDelta);
    }

    if (this.config?.zoom?.wheelFilter) {
      this.zoom.filter(this.config?.zoom?.wheelFilter);
    }

    if (this.axis.options.scaleType.type !== ScaleType.band) {
      const extremes = this.axis.extremes as number[];
      const maxZoom = this.config.zoom?.max
        ? (extremes[1] - extremes[0]) / this.config.zoom?.max
        : this.config.zoom?.limitZoomByData
          ? 1
          : 0;

      const minZoom = this.config.zoom?.min ? (extremes[1] - extremes[0]) / this.config.zoom?.min : Infinity;

      this.zoom.scaleExtent([maxZoom, minZoom]);
    }

    if (this.config?.zoom?.zoomBehavior === ZoomBehaviorType.wheel) {
      this.runWheelTranslate();
    }
  }

  zoomed = (event: D3ZoomEvent<any, any>) => {
    if (
      event.sourceEvent &&
      (this.elementRef.nativeElement === event.sourceEvent.target ||
        this.elementRef.nativeElement.contains(event.sourceEvent.target))
    ) {
      if (Object.keys(event.sourceEvent).length !== 0) {
        const origin = this.axis.scale.copy().domain(this.axis.originDomain);
        if (this.axis.options.scaleType.type === ScaleType.band) {
          return;
        }

        const domain =
          this.axis.orientation === AxisOrientation.y
            ? event.transform.rescaleY(origin).domain()
            : event.transform.rescaleX(origin).domain();
        if (
          domain[0] === null ||
          domain[0] === undefined ||
          domain[1] === null ||
          domain[1] === undefined ||
          Math.abs(domain[0] - domain[1]) < 0.000001
        ) {
          return;
        }
        const message = new ZoomMessage({
          eventType: event.type,
          axis: {
            index: this.axis.index,
            orientation: this.axis.orientation,
          },
          element: this.elementRef,
          domain,
          chartId: this.config.id,
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

    // For touch events
    this.zoom.on('start zoom end', this.zoomed);
    this._element?.call(this.zoom);

    this.zoom
      .filter((event) => {
        return (event.ctrlKey && event.type === 'wheel') || Boolean(window.TouchEvent && event.type !== 'wheel');
      })
      .wheelDelta((event) => {
        const delta = this.config?.zoom.type === ZoomType.x ? -event.deltaX : -event.deltaY;
        return delta * 0.002;
      });

    const emit = (type: string, event: WheelEvent) => {
      const origin = this.axis.scale.copy().domain(this.axis.originDomain);
      let transform = zoomIdentity;
      const delta = type === 'end' ? 0 : this.axis.orientation === AxisOrientation.y ? event.deltaY : event.deltaX;

      if (this.axis.orientation === AxisOrientation.y) {
        transform = transform.translate(0, this.currentTransform.y - delta / 2);
      }

      if (this.axis.orientation === AxisOrientation.x) {
        transform = transform.translate(this.currentTransform.x - delta / 2, 0);
      }

      transform = transform.scale(this.currentTransform.k);

      const domain =
        this.axis.orientation === AxisOrientation.y
          ? transform.rescaleY(origin).domain()
          : transform.rescaleX(origin).domain();

      const extent = this.axis.options?.inverted ? domain : [...domain].reverse();

      if (extent[0] <= this.config.zoom?.minTranslate) {
        return;
      }

      if (extent[1] >= this.config.zoom?.maxTranslate) {
        return;
      }

      const message = new ZoomMessage({
        eventType: type,
        element: this.elementRef,
        axis: {
          index: this.axis.index,
          orientation: this.axis.orientation,
        },
        domain,
        chartId: this.config.id,
      });

      this.elementRef.nativeElement.__zoom = transform;
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
