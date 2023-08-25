import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { extend, NgtPush } from 'angular-three';
import { NgtsText } from 'angular-three-soba/abstractions';
import * as d3 from 'd3';
import * as THREE from 'three';
import { Euler } from 'three';

import { Axes3dMinMax } from '../model/axes-3d-min-max';
import { Axis3dPoint } from '../model/axis-3d-point';

extend(THREE);

@Component({
  selector: 'teta-axes-3d',
  templateUrl: './axes-3d.component.html',
  standalone: true,
  imports: [CommonModule, NgtsText, NgtPush],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Axes3dComponent {
  @Input() rotation: Euler;
  protected _scales: { x; y; z };

  @Input()
  set scales(scales: { x; y; z }) {
    this._scales = scales;
    this.getAxes();
  }

  get scales() {
    return this._scales;
  }

  protected _minMax: { x; y; z };

  @Input()
  set minMax(minMax: { x; y; z }) {
    this._minMax = minMax;
    this.getAxes();
  }

  get minMax() {
    return this._minMax;
  }

  public axes: {
    z: Axis3dPoint[];
    y: Axis3dPoint[];
    x: Axis3dPoint[];
  };

  getAxes() {
    if (this.scales && this.minMax) {
      this.axes = this.createAxes(this.scales, this.minMax);
    }
  }

  createAxes(scales, minMax: Axes3dMinMax) {
    const axisZ = this.generateTicks(minMax.z, 12).map(_ => {
      return { value: _.toFixed(1), position: scales.z(_) };
    });
    const axisY = this.generateTicks(minMax.y, 12).map(_ => {
      return { value: _.toFixed(1), position: scales.y(_) };
    });
    const axisX = this.generateTicks(minMax.x, 4).map(_ => {
      return { value: _.toFixed(1), position: scales.x(_) };
    });
    return { z: axisZ, y: axisY, x: axisX };
  }

  generateTicks(extremes: number[], count = 10) {
    const [min, max] = extremes;
    const tickStep = (max - min) / count;

    return d3.range(min, max + tickStep, tickStep).filter(step => step <= max);
  }

  trackBy(i) {
    return i;
  }
}
