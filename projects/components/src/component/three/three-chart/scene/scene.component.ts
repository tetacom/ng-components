import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { extend, NgtPush, NgtStore } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { Euler } from 'three';
import * as THREE from 'three';

import { Area3dComponent } from '../area-3d/area-3d.component';
import { Axes3dComponent } from '../axes-3d/axes-3d.component';
import { Axes3dMinMax } from '../model/axes-3d-min-max';
import { I3dChartConfig } from '../model/i-3d-chart-config';
import { Block3dComponent } from '../series/block-3d/block-3d.component';
import { Line3dComponent } from '../series/line-3d/line-3d.component';
import { Series3dHostComponent } from '../series/series-3d-host';
import { Chart3dService } from '../service/chart-3d.service';

extend(THREE);

@Component({
  standalone: true,
  selector: 'teta-scene',
  templateUrl: './scene.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgtsOrbitControls,
    CommonModule,
    Area3dComponent,
    Line3dComponent,
    Axes3dComponent,
    Block3dComponent,
    Series3dHostComponent,
    NgtPush,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneComponent implements OnInit {
  private _config: I3dChartConfig;
  @Input() set config(config: I3dChartConfig) {
    this._config = config;
  }

  get config() {
    return this._config;
  }

  private _scales;
  @Input() set scales(scales: { x; y; z }) {
    this._scales = scales;
  }

  get scales() {
    return this._scales;
  }

  private _minMax;
  @Input() set minMax(minMax: Axes3dMinMax) {
    this._minMax = minMax;
  }

  get minMax() {
    return this._minMax;
  }

  public rotation: Euler;
  public readonly store = inject(NgtStore);
  protected readonly Math = Math;
  protected readonly chartService = inject(Chart3dService);
  protected readonly _cdr = inject(ChangeDetectorRef);

  setRotation() {
    this.rotation = null;
    this._cdr.detectChanges();
    this.rotation = this.store.get('camera').rotation;
    this._cdr.detectChanges();
  }

  ngOnInit(): void {
    this.rotation = this.store.get('camera').rotation;
    this._cdr.detectChanges();
  }

  trackSeries(index, series) {
    return series; //index;
  }
}
