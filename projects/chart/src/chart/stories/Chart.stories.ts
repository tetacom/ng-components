import { ChartComponent } from '../chart/chart.component';
import {
  createBandChart,
  createChart,
  createDragChart,
  createMultiPathDragChart,
  createPathDragChart,
} from './story-helper';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective, ButtonComponent } from '@tetacom/ng-components';
import { TranslocoDirective } from '@jsverse/transloco';
import { IChartConfig } from '../model/i-chart-config';
import { SeriesType } from '../model/enum/series-type';

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

export const nestedSeriesGroups = () => {
  const curves = [
    { name: 'Обзор', group: 'Измерения', enabled: true },
    { name: 'Давление на устье', group: 'Давление', parentGroup: 'Измерения' },
    { name: 'Давление на забое', group: 'Забой', parentGroup: 'Давление' },
    { name: 'Расчётное давление', group: 'Расчёт', parentGroup: 'Забой' },
    { name: 'Замер давления', group: 'Расчёт', parentGroup: 'Забой' },
    { name: 'Расход жидкости', group: 'Расход', parentGroup: 'Измерения' },
    { name: 'Температура', group: 'Температура' },
    { name: 'Контрольная кривая' },
  ];
  const colors = ['#1976d2', '#e53935', '#8e24aa', '#00897b', '#f4511e', '#3949ab', '#c0a000', '#546e7a'];
  const config: IChartConfig = {
    id: 'nested-series-groups',
    controls: { enable: true },
    xAxis: [{ min: 0, max: 50 }],
    yAxis: [{ min: 0, max: 100 }],
    series: curves.map((curve, index) => ({
      ...curve,
      id: `nested-curve-${index}`,
      type: SeriesType.line,
      enabled: curve.enabled ?? false,
      color: colors[index],
      data: Array.from({ length: 51 }, (_, x) => ({
        x,
        y: 15 + index * 9 + Math.sin(x / 5 + index) * 8,
      })),
    })),
  };

  return {
    moduleMetadata: {
      imports: [ChartComponent, IconSpriteDirective, TranslocoDirective],
    },
    props: { config },
    template: `
      <ng-container *transloco="let t; scope: 'charts';">
        <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
             class="font-body-3 column padding-3 gap-12 bg-global-bgmain"
             style="width: 100%; height: 100vh">
          <div>В настройках кривых нажмите «Добавить кривую» и раскройте
            Измерения → Давление → Забой → Расчёт. Добавьте кривую, затем удалите её,
            чтобы вернуть в группу. Также доступны соседние группы и кривая без группы.</div>
          <teta-svg-chart [config]="config"
                          class="bg-global-bgcard column_auto border border-text-50"></teta-svg-chart>
        </div>
      </ng-container>`,
  };
};

export const basicChart = () => ({
  moduleMetadata: {
    imports: [ChartComponent, IconSpriteDirective, ButtonComponent, TranslocoDirective],
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
        <ng-container *transloco="let t; scope: 'charts';">
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
        </div>
      </ng-container>`,
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

export const draggablePathChart = () => ({
  moduleMetadata: {
    imports: [ChartComponent, IconSpriteDirective, ButtonComponent],
  },

  props: {
    config: createPathDragChart(80),
    offsetPx: 0,
    offsetValue: 0,
    dragType: '',
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-global-bgmain column gap"
            style="width: 100%; height: 100vh">
        <div class="color-text-90">
          {{ dragType }} offset: {{ offsetPx | number:'1.0-2' }}px / {{ offsetValue | number:'1.0-2' }}
        </div>
        <div class="row row_auto gap">
            <teta-svg-chart
              [config]="config"
              (seriesMove)="dragType = $event.event.type; offsetPx = $event.target.offsetPx.x; offsetValue = $event.target.offsetValue.x"
              class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>
        </div>
      </div>`,
});

export const multiDraggablePathChart = () => ({
  moduleMetadata: {
    imports: [ChartComponent, IconSpriteDirective, ButtonComponent],
  },

  props: {
    config: createMultiPathDragChart(50, 5000),
    selectedSeriesIds: [],
    offsetPx: 0,
    offsetValue: 0,
    dragType: '',
    seriesIds: '',
    onSelectedSeriesIdsChange: function (seriesIds) {
      this.selectedSeriesIds = seriesIds;
      console.log('selectedSeriesIdsChange', seriesIds);
    },
    onSeriesMove: function (event) {
      this.dragType = event.event.type;
      this.seriesIds = event.target.seriesIds.join(', ');
      this.offsetPx = event.target.offsetPx.x;
      this.offsetValue = event.target.offsetValue.x;
      console.log('seriesMove', {
        type: event.event.type,
        sourceSeriesId: event.target.series.id,
        seriesIds: event.target.seriesIds,
        offsetPx: event.target.offsetPx,
        offsetValue: event.target.offsetValue,
        offsets: event.target.offsets,
        event,
      });
    },
  },
  template: `
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']"
            class="font-body-3 padding-3 bg-global-bgmain column gap"
            style="width: 100%; height: 100vh">
        <div class="color-text-90">
          {{ dragType }} selected: {{ selectedSeriesIds.join(', ') }} dragged: {{ seriesIds }} offset: {{ offsetPx | number:'1.0-2' }}px / {{ offsetValue | number:'1.0-2' }}
        </div>
        <div class="row row_auto gap">
            <teta-svg-chart
              [config]="config"
              [selectedSeriesIds]="selectedSeriesIds"
              (selectedSeriesIdsChange)="onSelectedSeriesIdsChange($event)"
              (seriesMove)="onSeriesMove($event)"
              class="bg-global-bgcard row_6 border border-text-50"></teta-svg-chart>
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
