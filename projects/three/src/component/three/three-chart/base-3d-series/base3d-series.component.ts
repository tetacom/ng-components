import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart3dService } from '../service/chart-3d.service';
import { Base3dThreePoint } from '../model/base-3d-three-point';
import { Base3dSeries } from '../model/base-3d-series';
import { NgtStore } from 'angular-three';

@Component({
  selector: 'teta-base3d-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base3d-series.component.html',
  styleUrls: ['./base3d-series.component.scss'],
})
export class Base3dSeriesComponent<T extends Base3dThreePoint> {
  @Input()
  set series(series: Base3dSeries<T>) {
    this._series = series;
  }

  get series() {
    return this._series;
  }
  protected _series: Base3dSeries<T>;
  constructor(
    protected svc: Chart3dService,
    protected ngtStore: NgtStore,
  ) {}
}
