import { ChangeDetectorRef, Component, computed, ElementRef, inject, input } from '@angular/core';

import { BasePoint } from '../model/base-point';
import { IChartConfig } from '../model/i-chart-config';
import { Series } from '../model/series';
import { ChartService } from '../service/chart.service';
import { ScaleService } from '../service/scale.service';
import { ZoomService } from '../service/zoom.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  template: '',
  standalone: true,
})
export class SeriesBaseComponent<T extends BasePoint> {
  config = input<IChartConfig>();
  series = input<Series<T>>();

  protected svc = inject(ChartService);
  protected cdr = inject(ChangeDetectorRef);
  protected scaleService = inject(ScaleService);
  protected zoomService = inject(ZoomService);
  protected element = inject(ElementRef);

  id = (Date.now() + Math.random()).toString(36);

  xScales = toSignal(this.scaleService.scales.pipe(map((_) => _.x)));
  yScales = toSignal(this.scaleService.scales.pipe(map((_) => _.y)));

  x = computed(() => {
    return this.xScales().get(this.series().xAxisIndex)?.scale;
  });
  y = computed(() => {
    return this.yScales().get(this.series().yAxisIndex)?.scale;
  });

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
