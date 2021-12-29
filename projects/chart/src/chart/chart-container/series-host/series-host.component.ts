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
import { throttleTime } from 'rxjs/operators';
import { SeriesType } from '../../model/enum/series-type';

@Component({
  selector: '[teta-series-host]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesHostComponent<T extends BasePoint> implements OnInit {
  @Input() series: Series<T>;
  @Input() size: DOMRect;

  private defaultSeriesTypeMapping = new Map<
    SeriesType,
    typeof SeriesBaseComponent
  >()
    .set(SeriesType.line, LineSeriesComponent)
    .set(SeriesType.bar, BarSeriesComponent);

  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private chartService: ChartService
  ) {
    this.chartService.size
      .pipe(
        throttleTime(100, null, { trailing: true }),
        tap(() => {
          this._componentRef?.injector.get(ChangeDetectorRef).markForCheck();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    if (!SeriesBaseComponent.isPrototypeOf(this.series.component)) {
      this.series.component =
        this.defaultSeriesTypeMapping.get(this.series.type) ||
        LineSeriesComponent;
    }

    this._componentRef = this.viewContainerRef.createComponent(
      this.series.component
    );
    this._componentRef.instance.series = this.series;
    this._init = true;
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this._init && changes.hasOwnProperty('series')) {
      this._componentRef.instance.series = this.series;
      this._componentRef.injector.get(ChangeDetectorRef).markForCheck();
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }
}
