import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtsLine } from 'angular-three-soba/abstractions';
import { extend, NgtArgs, NgtStore } from 'angular-three';
import * as THREE from 'three';
import { map, Observable, takeWhile } from 'rxjs';
import { Chart3dService } from '../service/chart-3d.service';
import { Base3dSeriesComponent } from '../base-3d-series/base3d-series.component';
import { Line3dPoint } from '../model/line-3d-point';

extend(THREE);
@Component({
  selector: 'teta-line-3d',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgtsLine, NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './line-3d.component.html',
})
export class Line3dComponent
  extends Base3dSeriesComponent<Line3dPoint>
  implements OnDestroy
{
  public points: Observable<[number,number,number]>;
  private _alive = true;

  protected readonly Math = Math;
  constructor(override svc: Chart3dService, override ngtStore: NgtStore) {
    super(svc, ngtStore);
    this.points = this.svc.scales.pipe(
      takeWhile(() => this._alive),
      map(scales => {
        return this.getPoints(scales);
      })
    );
  }
  getPoints(scales) {
    return this.series?.data?.map(_ => {
      return [scales.x(_?.x), scales.y(_?.y), scales.z(_?.z)];
    }).flat() as [number,number,number];
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
