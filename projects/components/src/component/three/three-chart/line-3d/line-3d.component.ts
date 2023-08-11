import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtsLine } from 'angular-three-soba/abstractions';
import { extend, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { IconModule } from '@tetacom/ng-components';
import { map, Observable, takeWhile } from 'rxjs';
import { ChartService } from '../service/chart.service';
import { Line3dSeries } from '../model/line-3d-series';

extend(THREE);
@Component({
  selector: 'teta-line-3d',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgtsLine, IconModule, NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './line-3d.component.html',
})
export class Line3dComponent implements OnDestroy {
  @Input() series: Line3dSeries;
  public points: Observable<number[]>;
  private _alive = true;

  protected readonly chartSeries = inject(ChartService);
  protected readonly Math = Math;
  constructor() {
    this.points = this.chartSeries.scales.pipe(
      takeWhile(() => this._alive),
      map((scales) => {
        return this.getPoints(scales);
      })
    );
  }
  getPoints(scales) {
    return this.series.data
      .map((_) => {
        return [
          25 - scales.x(_.x),
          100 - scales.z(_.z) - 50,
          100 - scales.y(_.y) - 50,
        ];
      })
      .flat();
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
