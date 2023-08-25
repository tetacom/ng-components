import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  NgZone,
  OnChanges,
} from '@angular/core';
import { extend, NgtCanvas, NgtStore } from 'angular-three';
import * as THREE from 'three';
import { OrthographicCamera } from 'three';

import { Axes3dMinMax } from './model/axes-3d-min-max';
import { I3dChartConfig } from './model/i-3d-chart-config';
import { SceneComponent } from './scene/scene.component';
import { Chart3dService } from './service/chart-3d.service';

extend(THREE);

@Component({
  selector: 'teta-three-chart',
  templateUrl: './three-chart.component.html',
  styleUrls: ['./three-chart.component.scss'],
  standalone: true,
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtStore, Chart3dService],
  imports: [NgtCanvas, SceneComponent, CommonModule],
})
export class ThreeChartComponent {
  protected readonly chartService = inject(Chart3dService);
  protected readonly store = inject(NgtStore);
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly zone = inject(NgZone);
  protected readonly app = inject(ApplicationRef);

  @Input() protected set data(data: I3dChartConfig) {
    this.config = data;
    this.minMax = this.chartService.getAxesMinMax(this.config);
    this.scales = this.chartService.getScales(this.minMax);
    this.cdr.detectChanges();
    // this.cdr.markForCheck();
    // this.zone.run(() => {});
    // this.app.tick();
  }

  config: I3dChartConfig;
  scales: { x; y; z };
  minMax: Axes3dMinMax;

  public scene: typeof SceneComponent;
  public camera: OrthographicCamera;

  constructor() {
    this.scene = SceneComponent;
    this.camera = new OrthographicCamera(20, 20, 20, 20, 0.1, 1000);
    this.camera.position.set(100, 20, 70);
    this.camera.zoom = 4.5;
    this.camera.updateProjectionMatrix();
  }

  // ngOnChanges(): void {
  //   if (this.data?.series?.length) {
  //     this.chartService.setData(this.data);
  //   }
  // }
}
