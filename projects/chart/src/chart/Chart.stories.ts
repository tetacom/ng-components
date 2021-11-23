import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from './chart.module';
import {
  points1,
  points2,
} from '../../../components/src/component/chart/chart-data';
import { IChartConfig } from './model/i-chart-config';
import { AxisType } from './model/axis-type';
import { SeriesType } from './model/series-type';

export default {
  title: 'Component/Chart',
  decorators: [withKnobs],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartModule],
  },
} as Meta;

const config: IChartConfig = {
  name: '123',
  xAxis: [
    {
      type: AxisType.number,
      visible: true,
    },
    {
      type: AxisType.number,
      visible: true,
      opposite: true
    },
  ],
  yAxis: [
    {
      type: AxisType.number,
      visible: true,
    },
    {
      type: AxisType.number,
      visible: true,
      min: 0,
      max: 5000,
    },
    {
      type: AxisType.number,
      visible: true,
      min: 0,
      max: 5000,
    },
    {
      type: AxisType.number,
      visible: true,
      min: 0,
      max: 5000,
      opposite: true,
    },
    {
      type: AxisType.number,
      visible: true,
      min: 0,
      max: 5000,
      opposite: true,
    },
    {
      type: AxisType.number,
      visible: true,
      min: 0,
      max: 5000,
    },
  ],
  series: [
    {
      type: SeriesType.line,
      data: points1,
      name: 'Series 1',
      xAxisIndex: 0,
      yAxisIndex: 0,
      color: 'red',
    },
    {
      type: SeriesType.line,
      data: points2,
      name: 'Series 2',
      xAxisIndex: 1,
      yAxisIndex: 1,
      color: 'blue',
    },
  ],
};

export const basicChart = () => ({
  moduleMetadata: {
    imports: [ChartModule],
  },
  props: {
    config,
  },
  template: `<div class="font-body-3 padding-3 bg-background-0" style="width: auto; height: 600px;">
      <teta-chart [config]="config" class="bg-background-50 border border-text-50"></teta-chart>
    </div>`,
});
