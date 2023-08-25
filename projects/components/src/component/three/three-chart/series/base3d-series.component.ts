import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  NgZone,
} from '@angular/core';
import { NgtStore } from 'angular-three';

import { Base3dSeries } from '../model/base-3d-series';
import { Base3dThreePoint } from '../model/base-3d-three-point';
import { Chart3dService } from '../service/chart-3d.service';

@Component({
  selector: 'teta-base3d-series',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class Base3dSeriesComponent<T extends Base3dThreePoint> {
  protected svc: Chart3dService = inject(Chart3dService);
  protected ngtStore: NgtStore = inject(NgtStore);
  zone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);

  protected _series: Base3dSeries<T>;
  @Input()
  set series(series: Base3dSeries<T>) {
    this._series = series;
  }

  get series() {
    return this._series;
  }

  protected _scales: { x; y; z };
  @Input()
  set scales(scales: { x; y; z }) {
    this._scales = scales;
  }

  get scales() {
    return this._scales;
  }
}
