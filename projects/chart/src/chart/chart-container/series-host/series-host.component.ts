import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  input,
  OnDestroy,
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
export class SeriesHostComponent<T extends BasePoint> implements OnDestroy {
  private viewContainerRef = inject(ViewContainerRef);
  config = input<IChartConfig>();
  series = input<Series<T>>();

  private _componentRef: ComponentRef<any>;

  private count = 0;

  constructor() {
    effect(() => {
      if (this.series()) {
        this.viewContainerRef.clear();
        this._componentRef?.destroy();
        if (!Object.prototype.isPrototypeOf.call(SeriesBaseComponent, this.series().component)) {
          this.series().component = defaultSeriesTypeMapping.get(this.series().type) || LineSeriesComponent;
        }
        this._componentRef = this.viewContainerRef.createComponent(this.series().component);
        this._componentRef?.setInput('config', this.config());
        this._componentRef?.setInput('series', this.series());
      }
    });
  }

  ngOnDestroy(): void {
    this._componentRef?.destroy();
  }
}
