import { IconModule } from '../icon/icon.module';
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThreeChartComponent } from './three-chart/three-chart.component';
import { Area3dComponent } from './three-chart/area-3d/area-3d.component';
import { Axes3dComponent } from './three-chart/axes-3d/axes-3d.component';
import { Line3dComponent } from './three-chart/line-3d/line-3d.component';
import { SceneComponent } from './three-chart/scene/scene.component';
import { Series3dType } from './three-chart/model/enum/series-3d-type';

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
    imports: [
      ThreeChartComponent,
      Area3dComponent,
      Axes3dComponent,
      Line3dComponent,
      SceneComponent,
      IconModule,
    ],
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
            { x: 0, y: 1000, z: 0 },
          ],
        },
        {
          type: Series3dType.line,
          color: 'red',
          data: [
            { x: 0, y: 1000, z: 0 },
            { x: 120, y: 820, z: 1200 },
          ],
        },
        {
          type: Series3dType.lithotype,
          data: [
            {
              lithotypeId: 1,
              lithotypeName: 'Гранит',
              x: 0,
              y: 0,
              z: 0,
              z1: 100,
            },
            {
              lithotypeId: 2,
              lithotypeName: 'Глина',
              x: 0,
              z: 100,
              y: 0,
              z1: 500,
            },
            {
              lithotypeId: 3,
              lithotypeName: 'Грунт',
              x: 0,
              z: 500,
              z1: 4000,
              y: 0,
            },
          ],
        },
      ],
      zAxis: {
        min: 0,
        max: 4000,
      },
    },
  },
  template: `<div [tetaIconSprite]="'assets/lithotype-icons.svg'" class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">
                  <teta-three-chart [data]="data"></teta-three-chart>
    </div>`,
});
