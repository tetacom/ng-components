import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { extend, NgtArgs, NgtPush } from 'angular-three';
import * as THREE from 'three';

import { Base3dPoint } from '../../../../chart-3d/model/base-3d-point';
import { Base3dSeriesComponent } from '../base3d-series.component';

extend(THREE);

@Component({
  selector: 'teta-custom-series',
  standalone: true,
  imports: [CommonModule, NgtArgs, NgtPush],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-series.component.html',
})
export class CustomSeriesComponent
  extends Base3dSeriesComponent<Base3dPoint>
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ngtStore.get('camera').zoom = 2;
      this.ngtStore.get('camera').updateProjectionMatrix();
    }, 1000);
  }
}
