import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
  effect,
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
  private viewContainerRef = inject(ViewContainerRef);
  config = input<IChartConfig>();
  series = input<Series<T>>();

  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor() {
    effect(() => {
      this._componentRef.setInput('config', this.config());
    });
    effect(() => {
      this._componentRef.setInput('series', this.series());
    });
  }

  ngOnInit(): void {
    if (!Object.prototype.isPrototypeOf.call(SeriesBaseComponent, this.series().component)) {
      this.series().component = defaultSeriesTypeMapping.get(this.series().type) || LineSeriesComponent;
    }

    this._componentRef = this.viewContainerRef.createComponent(this.series().component);
  }

  ngOnDestroy(): void {
    this._componentRef.destroy();
  }
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (
  //     this._init &&
  //     (Object.prototype.hasOwnProperty.call(changes, 'series') ||
  //       Object.prototype.hasOwnProperty.call(changes, 'config'))
  //   ) {
  //     console.log('ngOnChanges');
  //     this._componentRef.setInput('config', this.config());
  //     this._componentRef.setInput('series', this.series());
  //     this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
  //   }
  // }
}
