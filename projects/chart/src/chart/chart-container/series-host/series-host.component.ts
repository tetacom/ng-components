import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { SeriesBaseComponent } from '../../base/series-base.component';
import { LineSeriesComponent } from '../series/line/line-series.component';
import { BarSeriesComponent } from '../series/bar/bar-series.component';

import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import { ChartService } from '../../service/chart.service';
import { tap } from 'rxjs';
import { SeriesType } from '../../model/enum/series-type';
import { IChartConfig } from '../../model/i-chart-config';
import { ScatterSeriesComponent } from '../series/scatter-series/scatter-series.component';
import { AreaSeriesComponent } from '../series/area-series/area-series.component';
import { BlockSeriesComponent } from '../series/block-series/block-series.component';
import { defaultSeriesTypeMapping } from '../../default/defaultSeriesTypeMapping';

@Component({
  selector: '[teta-series-host]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesHostComponent<T extends BasePoint> implements OnInit {
  @Input() config: IChartConfig;
  @Input() series: Series<T>;
  @Input() size: DOMRect;
  @Input() rect: any;

  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private chartService: ChartService
  ) {
    this.chartService.size
      .pipe(
        tap(() => {
          this._componentRef?.injector.get(ChangeDetectorRef).detectChanges();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    if (!SeriesBaseComponent.isPrototypeOf(this.series.component)) {
      this.series.component =
        defaultSeriesTypeMapping.get(this.series.type) || LineSeriesComponent;
    }

    this._componentRef = this.viewContainerRef.createComponent(
      this.series.component
    );
    this._componentRef.instance.config = this.config;
    this._componentRef.instance.series = this.series;
    this._componentRef.instance.size = this.size;
    this._componentRef.instance.rect = this.rect;
    this._init = true;
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this._init && changes.hasOwnProperty('series')) {
      this._componentRef.instance.config = this.config;
      this._componentRef.instance.series = this.series;
      this._componentRef.instance.size = this.size;
      this._componentRef.instance.rect = this.rect;

      this._componentRef.injector.get(ChangeDetectorRef).markForCheck();
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }
}
