import { Meta } from '@storybook/angular/types-6-0';

import { ChartComponent } from './chart/chart.component';
import { ChartModule } from './chart.module';
import {
  AxisOptions,
  BasePoint,
  ChartOptions,
  PlotBand,
  Series,
  SeriesType,
} from './model/public-api';
import * as faker from 'faker';
import { colorList } from './color-list';
import { IconModule } from '../icon/icon.module';
import { DragPointType } from './model/enum/drag-point-type';

export default {
  title: 'Component/Chart',
  decorators: [],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartModule, IconModule],
  },
} as Meta;

const seriesType = [SeriesType.line, SeriesType.line];

const series: Series<BasePoint>[] = seriesType.map(
  (type: SeriesType, index: number) => {
    return new Series<BasePoint>({
      id: index,
      type,
      name: type.toString(),
      color: colorList[index],

      data: Array.from(Array(50).keys()).map((key, index) => {
        const num = faker.datatype.number({ min: 0, max: 100 });
        return {
          x: key,
          y: num > 50 && num < 60 ? null : num,
          marker: {
            draggable: true,
            dragType: DragPointType.y,
            style: {
              radius: 5,
              color: 'steelblue',
            },
          },
        };
      }),
    });
  }
);

const plotBands = [
  new PlotBand({
    id: 0,
    from: 10,
    to: 12,
    color: 'green',
    opacity: 0.2,
  }),
  new PlotBand({
    id: 1,
    from: 20,
    to: 25,
    color: 'red',
    image: 'patternintersect',
    opacity: 0.3,
  }),
];

const config: ChartOptions = new ChartOptions({
  name: '123',
  zoom: { enable: true },
  xAxis: [
    new AxisOptions({
      type: 'number',
      plotBands,
    }),
  ],
  yAxis: [new AxisOptions()],
  series,
});

export const line = () => ({
  moduleMetadata: {
    imports: [ChartModule, IconModule],
  },
  props: {
    config,
  },
  template: `<div style="height: 100vh" [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']" >
  <teta-chart [config]="config"></teta-chart>
</div>`,
});
