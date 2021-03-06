import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import {ChartService} from '../service/chart.service';
import {Series} from '../model/series';
import {BasePoint} from '../model/base-point';
import {ScaleService} from '../service/scale.service';
import {ZoomService} from '../service/zoom.service';
import {IChartConfig} from '../model/i-chart-config';

@Component({
  template: '',
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
    protected element: ElementRef
  ) {
  }

  ngOnInit(): void {
  }
}
