import { Injectable } from '@angular/core';

import { AxesService } from './axes.service';
import * as d3 from 'd3';
import { AxisType } from './model/axis-type';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public yScales: Map<number | string, any> = new Map<number | string, any>();

  constructor(private axesService: AxesService) {}

  public createScales(size: DOMRect) {
    this.yScales.clear();

    for (const [, value] of this.axesService.yAxis) {
      let scale = null;

      if (value.options.type === AxisType.time) {
        scale = d3.scaleTime().domain(value.extremes).range([0, size.height]);
      }

      if (value.options.type === AxisType.number) {
        scale = d3.scaleLinear().domain(value.extremes).range([0, size.height]);
      }

      this.yScales.set(value.index, scale);
    }
  }
}
