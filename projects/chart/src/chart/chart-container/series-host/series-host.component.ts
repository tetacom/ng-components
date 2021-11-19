import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {SeriesBaseComponent} from '../../base/series-base.component';
import {LineSeriesComponent} from '../line-series/line-series.component';
import {Series} from '../../model/series';
import {BasePoint} from '../../model/base-point';

@Component({
  selector: '[teta-series-host]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesHostComponent<T extends BasePoint> implements OnInit {
  @Input() series: Series<T>;
  @Input() size: DOMRect;

  private _init = false;
  private _componentRef: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    if (!SeriesBaseComponent.isPrototypeOf(this.series.component)) {
      this.series.component = LineSeriesComponent;
    }
    this._componentRef = this.viewContainerRef.createComponent(this.series.component);
    this._componentRef.instance.series = this.series;
    this._init = true;
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this._init &&
      changes.hasOwnProperty('series')
    ) {
      this._componentRef.instance.series = this.series;
      this._componentRef.injector.get(ChangeDetectorRef).markForCheck();
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }
}
