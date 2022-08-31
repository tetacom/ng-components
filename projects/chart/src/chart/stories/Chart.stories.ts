import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {ChartComponent} from '../chart/chart.component';
import {ChartModule} from '../chart.module';
import {IconModule} from '../../../../components/src/component/icon/icon.module';
import {ButtonModule} from '../../../../components/src/component/button/button.module';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {createChart, createChart2, createDragChart} from './story-helper';

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
    config2: createChart2(200),
    createChart: createChart,
    createChart2: createChart2,
    setZoom: function () {
      this.storyComponentElementRef.zoomService.setZoom(1500, 2000, 0, AxisOrientation.y);
    },
  },
  template: `

      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']" class="font-body-3 padding-3 bg-background-0" style="width: 100%; height: 100vh">
        <button teta-button
          [palette]="'primary'"
          (click)="config=createChart(500); config2=createChart2(200)">
          Create new Data
        </button>
        <button teta-button
          [palette]="'primary'"
          (click)="config2=createChart2(200)">
          Update brush chart
        </button>
        <button teta-button
          [palette]="'primary'"
          (click)="config=createChart(0); config2=createChart(0)">
          Create empty data
       config </button>
        <button teta-button
          [palette]="'primary'"
          (click)="setZoom()">Set zoom</button>

        <div class="row row_auto gap" style="height: 100%; width: 100%">
            <teta-svg-chart [config]="config" class="bg-background-50 row_6 border border-text-50"></teta-svg-chart>

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


