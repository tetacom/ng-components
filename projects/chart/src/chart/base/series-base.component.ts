import { ChangeDetectorRef, Component, ElementRef, inject, input } from '@angular/core';

import { BasePoint } from '../model/base-point';
import { IChartConfig } from '../model/i-chart-config';
import { Series } from '../model/series';
import { ChartService } from '../service/chart.service';
import { ScaleService } from '../service/scale.service';
import { ZoomService } from '../service/zoom.service';

@Component({
  template: '',
  standalone: true,
})
export class SeriesBaseComponent<T extends BasePoint> {
  protected svc = inject(ChartService);
  protected cdr = inject(ChangeDetectorRef);
  protected scaleService = inject(ScaleService);
  protected zoomService = inject(ZoomService);
  protected element = inject(ElementRef);
  id = (Date.now() + Math.random()).toString(36);

  config = input<IChartConfig>();
  series = input<Series<T>>();

  mouseenter(point: BasePoint) {
    this.svc.setTooltip({
      point: point,
      series: this.series(),
    });
  }

  mouseleave(point: BasePoint) {
    this.svc.setTooltip({
      point: null,
      series: this.series(),
    });
  }
}
