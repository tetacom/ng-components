import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { extend, NgtArgs, NgtPush } from 'angular-three';
import { NgtsLine } from 'angular-three-soba/abstractions';
import * as THREE from 'three';

import { LetModule } from '../../../../../directive/let/let.module';
import { Line3dPoint } from '../../model/line-3d-point';
import { Base3dSeriesComponent } from '../base3d-series.component';

extend(THREE);

@Component({
  selector: 'teta-line-3d',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgtsLine, NgtArgs, LetModule, NgtPush],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './line-3d.component.html',
})
export class Line3dComponent
  extends Base3dSeriesComponent<Line3dPoint>
  implements OnInit, OnDestroy
{
  private _points: number[][] = [];
  set points(points: number[][]) {
    this._points = points;
  }

  get points() {
    console.error('get points', this._points?.length, this._series?.name);
    return this._points;
  }

  @Input()
  override set series(series) {
    this._series = series;
    this.setPoints();
  }

  override get series() {
    return this._series;
  }

  @Input()
  override set scales(scales) {
    this._scales = scales;
    this.setPoints();
  }

  override get scales() {
    return this._scales;
  }

  setPoints() {
    if (this.scales && this.series) {
      this.points = this.getPoints(this.scales, this.series);
    }
    this.cdr.detectChanges();
    // this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    console.error('ngOnDestroy');
  }

  ngOnInit(): void {
    console.error('ngOnInit');
  }

  constructor() {
    console.error('constructor Line3dComponent');
    super();
  }

  getPoints(scales, series) {
    return series?.data?.map(_ => {
      return [scales.x(_?.x), scales.y(_?.y), scales.z(_?.z)];
    });
  }
}
