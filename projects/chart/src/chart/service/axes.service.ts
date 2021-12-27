import { Injectable } from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { Axis } from '../core/axis/axis';

@Injectable({
  providedIn: 'root',
})
export class AxesService {
  public yAxis: Map<number, Axis> = new Map<number, Axis>();
  public xAxis: Map<number, Axis> = new Map<number, Axis>();

  constructor() {}

  init(config: IChartConfig) {
    config?.yAxis.forEach((_, index) => {
      const axis = Axis.createAxis(AxisOrientation.y, config, index);

      this.yAxis.set(index, axis);
    });
    config?.xAxis.forEach((_, index) => {
      const axis = Axis.createAxis(AxisOrientation.x, config, index);

      this.xAxis.set(index, axis);
    });
  }
}
