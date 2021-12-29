import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { ZoomService } from '../service/zoom.service';
import { ChartService } from '../service/chart.service';
import { withLatestFrom } from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';
import { IChartConfig } from '../model/i-chart-config';

@Directive({
  selector: 'svg:svg[tetaZoomable]',
})
export class ZoomableDirective {
  @Input() config?: IChartConfig;

  @HostBinding('class.zoomable') private zoomable = false;

  constructor(
    private element: ElementRef,
    private svc: ZoomService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    if (this.config?.zoom?.enable) {
      this.zoomable = true;

      this.svc.applyZoom(this.element, this.chartService.config);

      this.chartService.size
        .pipe(withLatestFrom(this.svc.zoomed))
        .subscribe((_: [DOMRect, IChartEvent]) => {
          const [, { event }] = _;
          this.svc.applyZoom(this.element, this.chartService.config);
          this.svc.setTransform(event?.transform);
        });
    }
  }
  ngAfterViewInit() {}
}
