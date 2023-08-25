import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';

import { Base3dSeries } from '../model/base-3d-series';
import { Base3dThreePoint } from '../model/base-3d-three-point';
import { Series3dType } from '../model/enum/series-3d-type';
import { Base3dSeriesComponent } from './base3d-series.component';
import { Block3dComponent } from './block-3d/block-3d.component';
import { Line3dComponent } from './line-3d/line-3d.component';

@Component({
  selector: 'teta-series-3d-host',
  template: '',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Series3dHostComponent<T extends Base3dThreePoint>
  implements OnInit, OnChanges
{
  @Input() series: Base3dSeries<T>;
  @Input() scales: { x; y; z };
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private injector: Injector = inject(Injector);
  private seriesMap: Map<Series3dType, typeof Base3dSeriesComponent> = new Map()
    .set(Series3dType.line, Line3dComponent)
    .set(Series3dType.block, Block3dComponent);
  private _init = false;
  private _componentRef: ComponentRef<any>;

  ngOnInit(): void {
    if (
      !Object.prototype.isPrototypeOf.call(
        Base3dSeriesComponent,
        this.series.component
      )
    ) {
      this.series.component = this.seriesMap.get(this.series.type);
    }
    this._componentRef = this.viewContainerRef.createComponent(
      this.series.component,
      {
        injector: this.injector,
      }
    );

    this._componentRef.instance.series = this.series;
    this._componentRef.instance.scales = this.scales;
    this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    this._init = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._init && Object.prototype.hasOwnProperty.call(changes, 'series')) {
      this._componentRef.instance.series = this.series;
      this._componentRef.instance.scales = this.scales;
      this._componentRef.injector.get(ChangeDetectorRef).detectChanges();
    }
  }
}
