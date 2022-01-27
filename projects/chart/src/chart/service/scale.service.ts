import { Injectable } from '@angular/core';

import * as d3 from 'd3';
import { AxisType } from '../model/enum/axis-type';
import { Axis } from '../core/axis/axis';
import { AxisOrientation } from '../model/enum/axis-orientation';
import {IChartConfig} from '../model/i-chart-config';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public yAxis: Map<number, Axis> = new Map<number, Axis>();
  public xAxis: Map<number, Axis> = new Map<number, Axis>();

  public yScales: Map<number | string, any> = new Map<number | string, any>();
  public xScales: Map<number | string, any> = new Map<number | string, any>();

  private scaleMapping = new Map<AxisType, any>()
    .set(AxisType.number, d3.scaleLinear)
    .set(AxisType.time, d3.scaleTime)
    .set(AxisType.category, d3.scaleOrdinal)
    .set(AxisType.log, d3.scaleLog);

  constructor() {}

  public createScales(size: DOMRect) {
    this.yScales.clear();
    this.xScales.clear();

    const topBound = [...this.xAxis.values()]
      .filter((_) => _.options?.visible && _.options?.opposite)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    const bottomBound = [...this.xAxis.values()]
      .filter((_) => _.options?.visible && _.options?.opposite !== true)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    const leftBound = [...this.yAxis.values()]
      .filter((_) => _.options?.visible && _.options.opposite !== true)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    const rightBound = [...this.yAxis.values()]
      .filter((_) => _.options?.visible && _.options.opposite)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    this.yAxis.forEach((axis: Axis) => {
      const scale = this.getScale(axis).range([
        0,
        size.height - topBound - bottomBound,
      ]);

      this.yScales.set(axis.index, scale);
    });

    this.xAxis.forEach((axis: Axis) => {
      const scale = this.getScale(axis).range([
        0,
        size.width - leftBound - rightBound,
      ]);

      this.xScales.set(axis.index, scale);
    });
  }

  createAxes(config: IChartConfig) {
    config?.yAxis.forEach((_, index) => {
      const axis = Axis.createAxis(AxisOrientation.y, config, index);
      this.yAxis.set(index, axis);
    });

    config?.xAxis.forEach((_, index) => {
      const axis = Axis.createAxis(AxisOrientation.x, config, index);
      this.xAxis.set(index, axis);
    });
  }

  private getScale(axis: Axis) {
    return this.scaleMapping
      .get(axis.options?.type)()
      .domain(
        axis.orientation === AxisOrientation.y
          ? [...axis.extremes].reverse()
          : axis.extremes
      );
  }
}
