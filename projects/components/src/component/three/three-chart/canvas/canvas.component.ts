import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';

import { NgtCanvas, NgtStore } from 'angular-three';
import { SceneComponent } from '../scene/scene.component';
import { I3dChartConfig } from '../model/i-3d-chart-config';
import { Camera } from 'three';

@Component({
  selector: 'teta-canvas',
  standalone: true,
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtStore],
  imports: [NgtCanvas, SceneComponent],
})
export class CanvasComponent {
  @Input() scene: typeof SceneComponent;
  @Input() camera: Camera;
  @Input() data: I3dChartConfig;
}
