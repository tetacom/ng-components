import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {ChartComponent} from '../chart/chart.component';
import {ChartModule} from '../chart.module';
import {IconModule} from '../../../../components/src/component/icon/icon.module';
import {ButtonModule} from '../../../../components/src/component/button/button.module';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {createBandChart, createChart, createDragChart} from './story-helper';

export default {
  title: 'Component/Chart',
  decorators: [withKnobs],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartModule, IconModule, ButtonModule],
  },
} as Meta;

export const basicChart = () => ({
  moduleMetadata: {
    imports: [ChartModule, IconModule, ButtonModule],
  },

  props: {
    config: createChart(200),
    createChart: createChart,
    setZoom: function (chart) {
      console.log(chart);
      chart.scaleService.resetZoom();
    },
  },
  template: `

      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-background-0"
            style="width: 100%; height: 100vh">
        <button teta-button
          [palette]="'primary'"
          (click)="config=createChart(500);">
          Create new Data
        </button>
        <button teta-button
          [palette]="'primary'"
          (click)="config=createChart(0); config2=createChart(0)">
          Create empty data
          config </button>
        <button teta-button
          [palette]="'primary'"
          (click)="setZoom(chart)">Set zoom</button>

        <div class="row row_auto gap" style="height: 100%; width: 100%">
            <teta-svg-chart #chart [config]="config" class="bg-background-50 row_6 border border-text-50"></teta-svg-chart>

        </div>

      </div>

`,
});


export const draggableChart = () => ({
  moduleMetadata: {
    imports: [ChartModule, IconModule, ButtonModule],
  },

  props: {
    config: createDragChart(400)
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-background-0"
            style="width: 100%; height: 100vh">
        <div class="row row_auto gap" style="height: 100%; width: 100%">
            <teta-svg-chart [config]="config" class="bg-background-50 row_6 border border-text-50"></teta-svg-chart>
        </div>
      </div>`,
});


export const bandChart = () => ({
  moduleMetadata: {
    imports: [ChartModule, IconModule, ButtonModule],
  },

  props: {
    config: createBandChart(50)
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-background-0"
            style="width: 100%; height: 100vh">
        <div class="row row_auto gap" style="height: 100%; width: 100%">
            <teta-svg-chart [config]="config" class="bg-background-50 row_6 border border-text-50"></teta-svg-chart>
        </div>
      </div>`,
});



