import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { SeriesBaseComponent } from '../../base/series-base.component';
import { LineSeriesComponent } from '../series/line/line-series.component';
import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import { IChartConfig } from '../../model/i-chart-config';
import { defaultSeriesTypeMapping } from '../../default/defaultSeriesTypeMapping';

@Component({
  selector: '[teta-series-host]',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesHostComponent<T extends BasePoint> implements OnInit, OnDestroy {
  @Input() config: IChartConfig;
  @Input() series: Series<T>;

  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    if (!SeriesBaseComponent.isPrototypeOf(this.series.component)) {
      this.series.component = defaultSeriesTypeMapping.get(this.series.type) || LineSeriesComponent;
    }

    this._componentRef = this.viewContainerRef.createComponent(this.series.component);
    this._componentRef.instance.config = this.config;
    this._componentRef.instance.series = this.series;
    this._init = true;
  }

  ngOnDestroy(): void {
    this._componentRef.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._init && (changes.hasOwnProperty('series') || changes.hasOwnProperty('config'))) {
      this._componentRef.instance.config = this.config;
      this._componentRef.instance.series = this.series;
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }
}
