import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtCamera, NgtCanvas } from 'angular-three';
import { SceneComponent } from '../scene/scene.component';
import { I3dChartConfig } from '../model/i-3d-chart-config';

@Component({
    selector: 'teta-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgtCanvas, SceneComponent, CommonModule]
})
export class CanvasComponent {
  @Input() scene: typeof SceneComponent;
  @Input() camera: NgtCamera;
  @Input() data: I3dChartConfig;
}
