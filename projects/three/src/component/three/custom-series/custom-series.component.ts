import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Base3dSeriesComponent } from '../three-chart/base-3d-series/base3d-series.component';
import { Base3dPoint } from '../../../common/model/base-3d-point';
import { extend, NgtArgs } from 'angular-three';
import { Observable } from 'rxjs';
import * as THREE from 'three';

extend(THREE);

@Component({
  selector: 'teta-custom-series',
  imports: [CommonModule, NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-series.component.html',
})
export class CustomSeriesComponent extends Base3dSeriesComponent<Base3dPoint> implements OnInit {
  public scales: Observable<{ x; y; z }>;

  constructor() {
    super();
    this.scales = this.svc.scales;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ngtStore().camera.zoom = 2;
      this.ngtStore().camera.updateProjectionMatrix();
    }, 1000);
  }
}
