import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {ChartComponent} from './chart/chart.component';
import {ChartModule} from './chart.module';
import {IconModule} from '../../../components/src/component/icon/icon.module';
import {ButtonModule} from '../../../components/src/component/button/button.module';
import {IChartConfig} from './model/i-chart-config';
import {SeriesType} from './model/enum/series-type';
import {randomInt} from 'd3-random';
import * as faker from 'faker';
import {ZoomType} from './model/enum/zoom-type';
import {TooltipTracking} from './model/enum/tooltip-tracking';
import {BrushType} from './model/enum/brush-type';
import {Series} from './model/series';
import {BasePoint} from './model/base-point';
import {FillType} from './model/enum/fill-type';
import {AxisOrientation} from "./model/enum/axis-orientation";
import {ChartBounds} from "./model/chart-bounds";

export default {
  title: 'Component/Chart',
  decorators: [withKnobs],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartModule, IconModule, ButtonModule],
  },
} as Meta;

const cssColorNames = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen',
];

const randomColor = randomInt(0, cssColorNames.length - 1);

const seriesType = [SeriesType.line, SeriesType.line];

faker.locale = 'ru';

const createSeries = (size: number) => {
  return seriesType.map(
    (type: SeriesType, index: number): Series<BasePoint> => {
      return {
        id: index,
        type,
        name: faker.address.cityName(),
        yAxisIndex: 0,
        xAxisIndex: 0,
        color: cssColorNames[randomColor()].toLowerCase(),

        fillType: FillType.gradient,
        data: Array.from(Array(size).keys())
          .map((key, index, arr) => {
            const num = faker.datatype.number({min: 0, max: 6000});
            const iconId = faker.datatype.number({min: 1, max: 14});

            const point: BasePoint = {
              x: num,
              y:
                type === SeriesType.block
                  ? 0
                  : faker.datatype.number({min: 0, max: 200}),
              iconId: `icon${iconId}`,
              text: faker.commerce.productMaterial(),
            };

            return point;
          })
          .sort((a, b) => a.x - b.x)
          .map((_, index, arr) => {
            return {
              ..._,
              x: arr[index - 1]?.x,
              x1: _.x,
            };
          }),
      };
    }
  );
};

const createChart = (size: number): IChartConfig => {
  return {
    name: '123123123132',
    inverted: true,
    tooltip: {
      tracking: TooltipTracking.y,
    },
    bounds: new ChartBounds({
      top: 50
    }),
    xAxis: [
      {
        min: 0,
        max: 5000,
        visible: false,
        inverted: true,
        niceTicks: false,
        plotLines: [
          {
            value: 1000,
            draggable: true,
          },
        ],
      },
    ],
    yAxis: [
      {
        visible: false,
      },
    ],
    brush: {
      type: BrushType.y,
    },
    zoom: {
      enable: true,
      type: ZoomType.y,
      syncChannel: 'channelA',
    },
    legend: {
      enable: false,
    },
    series: createSeries(size),
  };
};

const createChart2 = (size: number): IChartConfig => {
  return {
    name: 'sdfgsfgd',
    inverted: true,
    tooltip: {
      tracking: TooltipTracking.x,
    },
    xAxis: [
      {
        visible: true,
        inverted: true,
        min: 0,
        max: faker.datatype.number({min: 5000, max: 6000}),
      },
    ],
    yAxis: [{}],
    brush: {
      enable: true,
      type: BrushType.y,
      max: 100,
      from: faker.datatype.number({min: 500, max: 600}),
      to: faker.datatype.number({min: 650, max: 700}),
    },
    zoom: {
      enable: false,
      type: ZoomType.y,
      syncChannel: 'channelA',
    },
    legend: {
      enable: true,
    },
    series: createSeries(size),
  };
};

export const basicChart = () => ({
  moduleMetadata: {
    imports: [ChartModule, IconModule, ButtonModule],
  },

  props: {
    config: createChart(200),
    config2: createChart2(200),
    createChart: createChart,
    createChart2: createChart2,
    setZoom: function() {
      this.storyComponentElementRef.zoomService.setZoom(1500, 2000, 0, AxisOrientation.y)
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
