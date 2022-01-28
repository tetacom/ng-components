import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ZoomService } from '../service/zoom.service';
import { IChartConfig } from '../model/i-chart-config';
import { Axis } from '../core/axis/axis';
import { ZoomType } from '../model/enum/zoom-type';
import { AxisOrientation } from '../model/enum/axis-orientation';

@Directive({
  selector: '[tetaZoomable]',
})
export class ZoomableDirective {
  @Input() config?: IChartConfig;
  @Input() axis?: Axis;
  @Input() size?: DOMRect;

  @HostBinding('class.zoomable') private zoomable = false;

  constructor(private element: ElementRef, private svc: ZoomService) {}

  ngOnInit() {
    const zoomCountX = Array.from(this.config?.xAxis).reduce(
      (acc, cur) => (cur.zoom ? (acc += 1) : acc),
      0
    );

    const zoomCountY = Array.from(this.config?.yAxis).reduce(
      (acc, cur) => (cur.zoom ? (acc += 1) : acc),
      0
    );

    let enable = this.axis?.options?.zoom || this.config?.zoom?.enable;

    // if (
    //   zoomCountX === 1 &&
    //   this.config?.zoom.type === ZoomType.x &&
    //   this.axis?.orientation === AxisOrientation.x
    // ) {
    //   enable = false;
    // }
    //
    // if (
    //   zoomCountY === 1 &&
    //   this.config?.zoom.type === ZoomType.y &&
    //   this.axis?.orientation === AxisOrientation.y
    // ) {
    //   enable = false;
    // }

    if (enable) {
      this.zoomable = true;
      this.svc.applyZoom(this.element, this.config, this.size, this.axis);
    }
  }
  ngAfterViewInit() {}
}
