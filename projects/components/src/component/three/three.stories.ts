
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThreeChartComponent } from './three-chart/three-chart.component';
import { Series3dType } from './three-chart/model/enum/series-3d-type';
import { CustomSeriesComponent } from './custom-series/custom-series.component';
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Three',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: ThreeChartComponent,
  moduleMetadata: {
    imports: [ThreeChartComponent],
  },
} as Meta;

export const lithotypeChart = () => ({
  moduleMetadata: {
    imports: [ThreeChartComponent,IconSpriteDirective],
  },
  props: {
    data: {
      noDataText: 's',
      series: [
        {
          type: Series3dType.line,
          color: 'red',
          data: [
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 50, z: 2000 },
          ],
        },
        {
          type: Series3dType.line,
          color: 'red',
          data: [
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 70, z: 2000 },
            { x: 50, y: 700, z: 100 },
            { x: 150, y: 1700, z: 1200 },
          ],
        },
        {
          type: Series3dType.block,
          data: [
            {
              iconId: 'icon1',
              name: 'Гранит',
              x: 0,
              y: 0,
              y1: 100,
              z: 0,
            },
            {
              iconId: 'icon2',
              name: 'Глина',
              x: 0,
              y: 100,
              y1: 500,
              z: 0,
            },
            {
              iconId: 'icon3',
              name: 'Грунт',
              x: 0,
              y: 500,
              y1: 4000,
              z: 0,
            },
          ],
        },
      ],
      yAxis: {
        min: 0,
        max: 4000,
      },
      xAxis: {
        min: 0,
        max: 1000,
      },
    },
  },
  template: `<div [tetaIconSprite]="'assets/lithotype-icons.svg'" class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">
                  <teta-three-chart [data]="data"></teta-three-chart>
    </div>`,
});
export const customSeries = () => ({
  moduleMetadata: {
    imports: [ThreeChartComponent,IconSpriteDirective],
  },
  props: {
    data: {
      noDataText: 's',
      series: [
        {
          type: Series3dType.line,
          color: 'red',
          component: CustomSeriesComponent,
          data: [{ x: 500, y: 555, z: 333 }],
        },
      ],
    },
  },
  template: `<div [tetaIconSprite]="'assets/lithotype-icons.svg'"  class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">
                  <teta-three-chart [data]="data"></teta-three-chart>
    </div>`,
});
