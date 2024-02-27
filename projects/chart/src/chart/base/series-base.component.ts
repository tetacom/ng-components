import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';

import { BasePoint } from '../model/base-point';
import { IChartConfig } from '../model/i-chart-config';
import { Series } from '../model/series';
import { ChartService } from '../service/chart.service';
import { ScaleService } from '../service/scale.service';
import { ZoomService } from '../service/zoom.service';

@Component({
  template: '',
  standalone:true,

})
export class SeriesBaseComponent<T extends BasePoint> implements OnInit {
  @Input()
  set config(config: IChartConfig) {
    this._config = config;
  }

  get config() {
    return this._config;
  }

  @Input()
  set series(series: Series<T>) {
    this._series = series;
  }

  get series() {
    return this._series;
  }

  protected _series: Series<T>;
  protected _config: IChartConfig;

  constructor(
    protected svc: ChartService,
    protected cdr: ChangeDetectorRef,
    protected scaleService: ScaleService,
    protected zoomService: ZoomService,
    protected element: ElementRef,
    protected zone?: NgZone
  ) {}

  ngOnInit(): void {}
}
