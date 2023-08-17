import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { extend, NgtCanvas, NgtStore } from 'angular-three';
import * as THREE from 'three';
import { OrthographicCamera } from 'three';

import { I3dChartConfig } from './model/i-3d-chart-config';
import { SceneComponent } from './scene/scene.component';
import { Chart3dService } from './service/chart-3d.service';

extend(THREE);

@Component({
  selector: 'teta-three-chart',
  templateUrl: './three-chart.component.html',
  styleUrls: ['./three-chart.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtStore],
  imports: [NgtCanvas, SceneComponent, CommonModule],
})
export class ThreeChartComponent implements OnInit, OnChanges {
  @Input() data: I3dChartConfig;
  public scene: typeof SceneComponent;
  public camera: OrthographicCamera;
  protected readonly chartService = inject(Chart3dService);

  ngOnInit(): void {
    this.scene = SceneComponent;
    this.camera = new OrthographicCamera(20, 20, 20, 20, 0.1, 1000);
    this.camera.position.set(100, 20, 70);
    this.camera.zoom = 4.5;
    this.camera.updateProjectionMatrix();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data?.series?.length) {
      this.chartService.setData(this.data);
    }
  }
}
