import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgtsText} from 'angular-three-soba/abstractions';
import * as d3 from 'd3';
import * as THREE from 'three';
import {Euler} from 'three';
import {extend} from 'angular-three';
import {Axis3dPoint} from '../model/axis-3d-point';
import {Chart3dService} from '../service/chart-3d.service';
import {combineLatest, map, Observable, takeWhile} from 'rxjs';
import {Axes3dMinMax} from '../model/axes-3d-min-max';

extend(THREE);

@Component({
  selector: 'teta-axes-3d',
  templateUrl: './axes-3d.component.html',
  standalone: true,
  imports: [CommonModule, NgtsText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Axes3dComponent implements OnDestroy {
  @Input() rotation: Euler;
  public axes: Observable<{
    z: Axis3dPoint[];
    y: Axis3dPoint[];
    x: Axis3dPoint[];
  }>;
  private _alive = true;

  protected readonly chartService = inject(Chart3dService);

  constructor() {
    this.axes = combineLatest([
      this.chartService.scales,
      this.chartService.minMax,
    ]).pipe(
      takeWhile(() => this._alive),
      map(([scales, minMax]) => {
        return this.createAxes(scales, minMax);
      })
    );
  }

  createAxes(scales, minMax: Axes3dMinMax) {
    const axisZ = this.generateTicks(minMax.z, 12).map(_ => {
      return {value: _.toFixed(1), position: scales.z(_)};
    });
    const axisY = this.generateTicks(minMax.y, 12).map(_ => {
      return {value: _.toFixed(1), position: scales.y(_)};
    });
    const axisX = this.generateTicks(minMax.x, 4).map(_ => {
      return {value: _.toFixed(1), position: scales.x(_)};
    });
    return {z: axisZ, y: axisY, x: axisX};
  }

  generateTicks(extremes: number[], count = 10) {
    const [min, max] = extremes;
    const tickStep = (max - min) / count;

    const ticks = d3
      .range(min, max + tickStep, tickStep)
      .filter(step => step <= max);

    return ticks;
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
