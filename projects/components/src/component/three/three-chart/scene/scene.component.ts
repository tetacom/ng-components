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
import { Chart3dService } from '../service/chart-3d.service';
import { I3dChartConfig } from '../model/i-3d-chart-config';
import { Area3dComponent } from '../area-3d/area-3d.component';
import { Line3dComponent } from '../line-3d/line-3d.component';
import { Axes3dComponent } from '../axes-3d/axes-3d.component';
import { Lithotype3dComponent } from '../lithotype-3d/lithotype-3d.component';
import { Series3dHost } from '../directive/series-3d-host';

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
}
