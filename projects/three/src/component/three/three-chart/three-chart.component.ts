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
import { extend, NgtCanvas, NgtStore } from 'angular-three';
import * as THREE from 'three';
import { OrthographicCamera } from 'three';

import { I3dChartConfig } from './model/i-3d-chart-config';
import { SceneComponent } from './scene/scene.component';
import { Chart3dService } from './service/chart-3d.service';
import { CanvasComponent } from './canvas/canvas.component';
import { Canvas3dHost } from './directive/canvas-3d-host';

extend(THREE);

@Component({
    selector: 'teta-three-chart',
    templateUrl: './three-chart.component.html',
    styleUrls: ['./three-chart.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NgtStore],
    imports: [NgtCanvas, SceneComponent, CommonModule, CanvasComponent, Canvas3dHost]
})
export class ThreeChartComponent implements OnInit, OnChanges {
  @Input() data: I3dChartConfig;
  public scene: typeof SceneComponent;
  public camera: OrthographicCamera;

  protected readonly chartService = inject(Chart3dService);
  protected readonly store = inject(NgtStore);
  protected readonly cdr = inject(ChangeDetectorRef);

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
