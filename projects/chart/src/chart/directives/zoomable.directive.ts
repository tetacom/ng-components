import { Directive, ElementRef, Input } from '@angular/core';
import { ZoomService } from '../service/zoom.service';
import { ChartService } from '../service/chart.service';

@Directive({
  selector: 'svg:svg[tetaZoomable]',
})
export class ZoomableDirective {
  constructor(
    private element: ElementRef,
    private svc: ZoomService,
    private chartService: ChartService
  ) {
    this.svc.applyZoom(element, this.chartService.config);
  }
}
