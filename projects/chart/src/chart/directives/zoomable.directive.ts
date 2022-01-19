import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { ZoomService } from '../service/zoom.service';
import { ChartService } from '../service/chart.service';
import { IChartConfig } from '../model/i-chart-config';

@Directive({
  selector: 'svg:svg[tetaZoomable]',
})
export class ZoomableDirective {
  @Input() config?: IChartConfig;
  @Input() size?: DOMRect;

  @HostBinding('class.zoomable') private zoomable = false;

  constructor(
    private element: ElementRef,
    private svc: ZoomService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    if (this.config?.zoom?.enable) {
      this.zoomable = true;

      this.svc.applyZoom(this.element, this.chartService.config, this.size);
    }
  }
  ngAfterViewInit() {}
}
