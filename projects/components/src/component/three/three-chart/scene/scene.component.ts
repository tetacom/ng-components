import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { NgtStore} from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { Observable } from 'rxjs';
import { Euler } from 'three';

import { Area3dComponent } from '../area-3d/area-3d.component';
import { Axes3dComponent } from '../axes-3d/axes-3d.component';
import { Block3dComponent } from '../block-3d/block-3d.component';
import { Series3dHost } from '../directive/series-3d-host';
import { Line3dComponent } from '../line-3d/line-3d.component';
import { I3dChartConfig } from '../model/i-3d-chart-config';
import { Chart3dService } from '../service/chart-3d.service';

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
    Block3dComponent,
    Series3dHost,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneComponent implements OnInit {
  public data: Observable<I3dChartConfig>;
  public rotation: Euler;
  public readonly store = inject(NgtStore);
  protected readonly Math = Math;
  protected readonly chartService = inject(Chart3dService);
  protected readonly _cdr = inject(ChangeDetectorRef);
  constructor() {
    this.data = this.chartService.data
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
}
