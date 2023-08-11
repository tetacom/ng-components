import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { Euler } from 'three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { CommonModule } from '@angular/common';
import { NgtStore } from 'angular-three';
import { Observable } from 'rxjs';
import { ChartService } from '../service/chart.service';
import { I3dChartConfig } from '../model/i-3d-chart-config';
import { Area3dComponent } from '../area-3d/area-3d.component';
import { Line3dComponent } from '../line-3d/line-3d.component';
import { Axes3dComponent } from '../axes-3d/axes-3d.component';
import { Series3dType } from '../model/enum/series-3d-type';
import { Lithotype3dComponent } from '../lithotype-3d/lithotype-3d.component';
import { Lithotype3dSeries } from '../model/lithotype-3d-series';
import { Line3dSeries } from '../model/line-3d-series';

@Component({
  standalone: true,
  selector: 'teta-scene',
  templateUrl: './scene.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgtsOrbitControls,
    CommonModule,
    Area3dComponent,
    Line3dComponent,
    Axes3dComponent,
    Lithotype3dComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneComponent implements OnInit {
  public data: Observable<I3dChartConfig>;
  public rotation: Euler;
  public readonly store = inject(NgtStore);

  protected readonly Math = Math;
  protected readonly chartService = inject(ChartService);
  protected readonly _cdr = inject(ChangeDetectorRef);
  protected readonly SeriesType = Series3dType;
  constructor() {
    this.data = this.chartService.data;
  }

  setRotation() {
    this.rotation = null;
    this._cdr.detectChanges();
    this.rotation = this.store.get('camera').rotation;
    this._cdr.detectChanges();
  }

  ngOnInit(): void {
    this.rotation = this.store.get('camera').rotation;
  }
  getTypedLithotypeSeries(series: Lithotype3dSeries | Line3dSeries) {
    return series as Lithotype3dSeries;
  }
  getTypedLineSeries(series: Lithotype3dSeries | Line3dSeries) {
    return series as Line3dSeries;
  }
}
