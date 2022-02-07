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
import {Observable} from 'rxjs';
import {IChartConfig} from '../model/i-chart-config';

@Component({
  template: '',
})
export class SeriesBaseComponent<T extends BasePoint> implements OnInit {
  @Input() config: IChartConfig;

  @Input()
  set series(series: Series<T>) {
    this._series = series;
  }

  get series() {
    return this._series;
  }

  @Input() size: DOMRect;
  @Input() rect: any;
  zoom: Observable<any>;

  protected _series: Series<T>;

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
