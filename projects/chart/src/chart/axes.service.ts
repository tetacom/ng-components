import { Injectable } from '@angular/core';
import { IChartConfig } from './model/i-chart-config';
import { AxisLocate } from './model/enum/axis-locate';
import { Axis } from './core/axis';
import { BehaviorSubject, Observable } from 'rxjs';
import { number } from '@storybook/addon-knobs';

@Injectable({
  providedIn: 'root',
})
export class AxesService {
  public yAxis: Map<number, Axis> = new Map<number, Axis>();

  constructor() {}

  init(config: IChartConfig) {
    config?.yAxis.forEach((_, index) => {
      const axis = Axis.createAxis(AxisLocate.ordinatus, config, index);

      this.yAxis.set(index, axis);
    });
  }
}
