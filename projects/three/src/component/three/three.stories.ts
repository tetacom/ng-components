import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { ThreeChartComponent } from './three-chart/three-chart.component';
import { Series3dType } from './three-chart/model/enum/series-3d-type';
import { CustomSeriesComponent } from './custom-series/custom-series.component';
import { IconSpriteDirective } from '@tetacom/ng-components';
import { chartData } from './sample-data';

export default {
  title: 'Component/Three',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: ThreeChartComponent,
  moduleMetadata: {
    imports: [ThreeChartComponent, IconSpriteDirective],
  },
} as Meta;

export const lithotypeChart = () => ({
  moduleMetadata: {
    imports: [ThreeChartComponent, IconSpriteDirective],
  },
  props: {
    data: chartData,
  },
  template: `<div [tetaIconSprite]="'assets/lithotype-icons.svg'" class="font-body-3 padding-3 column column_auto gap-20 content-block " style="width: 1000px;height: 600px">
                  <teta-three-chart [data]="data"></teta-three-chart>
    </div>`,
});
export const customSeries = () => ({
  moduleMetadata: {
    imports: [ThreeChartComponent, IconSpriteDirective],
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
