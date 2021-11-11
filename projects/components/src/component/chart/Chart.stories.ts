import { Meta } from '@storybook/angular/types-6-0';

import { ChartComponent } from './chart/chart.component';
import { ChartModule } from './chart.module';
import {
  AxisOptions,
  BasePoint,
  ChartOptions,
  Series,
  SeriesType,
} from './model/public-api';
import { points1, points2 } from './chart-data';

export default {
  title: 'Component/Chart',
  decorators: [],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartModule],
  },
} as Meta;

const config: ChartOptions = new ChartOptions({
  name: '123',
  zoom: { enable: true },
  xAxis: [
    new AxisOptions({
      type: 'time',
    }),
  ],
  yAxis: [new AxisOptions()],
  series: [
    new Series<BasePoint>({
      type: SeriesType.line,
      data: points1,
      name: 'Serie 1',
      xAxisIndex: 0,
      yAxisIndex: 0,
      color: 'red',
    }),
    new Series<BasePoint>({
      type: SeriesType.line,
      data: points2,
      name: 'Serie 2',
      xAxisIndex: 0,
      yAxisIndex: 0,
      color: 'steelblue',
    }),
  ],
});

export const line = () => ({
  moduleMetadata: {
    imports: [ChartModule],
  },
  props: {
    config,
  },
  template: `<div style="height: 100vh"><teta-chart [config]="config"></teta-chart></div>`,
});
