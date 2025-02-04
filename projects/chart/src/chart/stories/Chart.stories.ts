import { ChartComponent } from '../chart/chart.component';
import { createBandChart, createChart, createDragChart } from './story-helper';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective, ButtonComponent } from '@tetacom/ng-components';

export default {
  title: 'Component/Chart',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartComponent],
  },
} as Meta;

export const basicChart = () => ({
  moduleMetadata: {
    imports: [ChartComponent, IconSpriteDirective, ButtonComponent],
  },

  props: {
    config: createChart(20, 200),
    createChart: createChart,
    setZoom: function (chart) {
      console.log(chart);
      chart.scaleService.resetZoom();
    },
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 column padding-3 bg-global-bgmain"
            style="width: 100%; height: 100vh">
        <div>
          <button teta-button
            [palette]="'primary'"
            (click)="config=createChart(20, 500);">
            Create new Data
          </button>
          <button teta-button
            [palette]="'primary'"
            (click)="config=createChart(0, 0); config2=createChart(0, 0)">
            Create empty data
            config </button>
          <button teta-button
            [palette]="'primary'"
            (click)="setZoom(chart)">Set zoom</button>
        </div>
        <div class="row row_auto gap">
            <teta-svg-chart #chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>
        </div>
      </div>`,
});

export const draggableChart = () => ({
  moduleMetadata: {
    imports: [ChartComponent, IconSpriteDirective, ButtonComponent],
  },

  props: {
    config: createDragChart(400),
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-global-bgmain column"
            style="width: 100%; height: 100vh">
        <div class="row row_auto gap">
            <teta-svg-chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>
        </div>
      </div>`,
});

export const bandChart = () => ({
  moduleMetadata: {
    imports: [ChartComponent, IconSpriteDirective],
  },

  props: {
    config: createBandChart(50),
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-global-bgmain"
            style="width: 100%; height: 100vh">
        <div class="row row_auto gap" style="height: 100%; width: 100%">
            <teta-svg-chart [config]="config" class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>
        </div>
      </div>`,
});
