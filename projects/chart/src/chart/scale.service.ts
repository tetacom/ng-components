import { Injectable } from '@angular/core';

import { AxesService } from './axes.service';
import * as d3 from 'd3';
import { AxisType } from './model/axis-type';
import { Axis } from './core/axis';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public yScales: Map<number | string, any> = new Map<number | string, any>();
  public xScales: Map<number | string, any> = new Map<number | string, any>();

  constructor(private axesService: AxesService) {}

  public createScales(size: DOMRect) {
    this.yScales.clear();
    this.xScales.clear();

    const topBound = [...this.axesService.xAxis.values()]
      .filter((_) => _.options?.visible && _.options?.opposite)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    const bottomBound = [...this.axesService.xAxis.values()]
      .filter((_) => _.options?.visible && _.options?.opposite !== true)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    this.axesService.yAxis.forEach((value: Axis) => {
      let scale = null;

      const domain = [...value.extremes].reverse();

      if (value.options.type === AxisType.time) {
        scale = d3
          .scaleTime()
          .domain(domain)
          .range([topBound, size.height - bottomBound]);
      }

      if (value.options.type === AxisType.number) {
        scale = d3
          .scaleLinear()
          .domain(domain)
          .range([topBound, size.height - bottomBound]);
      }

      scale.nice(true);

      this.yScales.set(value.index, scale);
    });

    const leftBound = [...this.axesService.yAxis.values()]
      .filter((_) => _.options?.visible && _.options.opposite !== true)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    const rightBound = [...this.axesService.yAxis.values()]
      .filter((_) => _.options?.visible && _.options.opposite)
      .reduce((acc, cur) => acc + cur.selfSize, 0);

    this.axesService.xAxis.forEach((value: Axis) => {
      let scale = null;

      const domain = value.extremes;

      if (value.options.type === AxisType.time) {
        scale = d3
          .scaleTime()
          .domain(domain)
          .range([leftBound, size.width - rightBound]);
      }

      if (value.options.type === AxisType.number) {
        scale = d3
          .scaleLinear()
          .domain(domain)
          .range([leftBound, size.width - rightBound]);
      }

      scale.nice(true);

      this.xScales.set(value.index, scale);
    });
  }
}
