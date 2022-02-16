import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ZoomService } from '../service/zoom.service';
import { IChartConfig } from '../model/i-chart-config';
import { Axis } from '../core/axis/axis';
import { ScaleService } from '../service/scale.service';

@Directive({
  selector: '[tetaZoomable]',
})
export class ZoomableDirective {
  @Input() config?: IChartConfig;
  @Input() axis?: Axis;
  @Input() size?: DOMRect;
  @Input() brushScale?: any;

  @HostBinding('class.zoomable') private zoomable = false;

  constructor(private element: ElementRef, private svc: ZoomService) {}

  ngOnInit() {
    let enable = this.axis?.options?.zoom || this.config?.zoom?.enable;

    if (enable) {
      this.zoomable = true;
      this.svc.applyZoom(
        this.element,
        this.config,
        this.size,
        this.axis,
        this.brushScale
      );
    }
  }
  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {}
}
