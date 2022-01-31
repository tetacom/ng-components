import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from './chart.module';
import { IconModule } from '../../../components/src/component/icon/icon.module';
import { ButtonModule } from '../../../components/src/component/button/button.module';
import { IChartConfig } from './model/i-chart-config';
import { SeriesType } from './model/enum/series-type';
import { randomInt } from 'd3-random';
import * as faker from 'faker';
import { ZoomType } from './model/enum/zoom-type';
import { PlotBand } from './model/plot-band';
import { PlotLine } from './model/plot-line';
import { TooltipTracking } from './model/enum/tooltip-tracking';
import { BrushType } from './model/enum/brush-type';

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

const seriesType = [SeriesType.line, SeriesType.line, SeriesType.line];

faker.locale = 'ru';

const createSeries = (size: number) => {
  return seriesType.map((type: SeriesType, index: number) => {
    return {
      id: index,
      type,
      name: faker.address.cityName(),
      yAxisIndex: 0,
      xAxisIndex: 0,
      color: cssColorNames[randomColor()].toLowerCase(),
      data: Array.from(Array(size).keys()).map((key, index) => {
        const num = faker.datatype.number({
          min: faker.datatype.number({ min: 0, max: 100 }),
          max: faker.datatype.number({ min: 200, max: 500 }),
        });

        const point = {
          x: key,
          y: num,
        };

        // if (index % 10 === 0) {
        //   point.x = null;
        //   point.y = null;
        // }

        return point;
      }),
    };
  });
};

const plotbands2 = [
  new PlotBand({
    id: 0,
    from: 50,
    to: 80,
    draggable: false,
    resizable: true,
    style: {
      plotBand: {
        opacity: 0.6,
        fill: 'green',
      },
    },
  }),
];

const createChart = (size: number): IChartConfig => {
  return {
    name: '123123123132',
    inverted: false,
    tooltip: {
      tracking: TooltipTracking.x,
    },
    xAxis: [
      {
        plotBands: plotbands2,
      },
    ],
    yAxis: [
      {
        min: faker.datatype.number({ min: -100, max: 100 }),
        max: faker.datatype.number({ min: 400, max: 600 }),
        title: 'атм',
        plotLines: [
          new PlotLine({
            value: 360,
            draggable: true,
            style: {
              stroke: cssColorNames[randomColor()].toLowerCase(),
            },
          }),
        ],
      },
      {
        min: 1000,
        opposite: false,
        inverted: false,
        max: 2000,
      },
    ],
    brush: {
      enable: false,
      type: BrushType.x,
    },
    zoom: {
      enable: true,
      type: ZoomType.x,
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
    config: createChart(100),
    config2: createChart(100),
    createChart: createChart,
    click: (e) => {
      console.log(e);
    },
  },
  template: `
    <div>
      <div [tetaIconSprite]="['assets/icons.svg', 'assets/lithotype-icons.svg']" class="font-body-3 padding-3 bg-background-0" style="width: 100%; height: 80vh;">
        <button teta-button
          [palette]="'primary'"
          (click)="config=createChart(100)">
          Create new Data
        </button>
        <button teta-button
          [palette]="'primary'"
          (click)="config=createChart(0)">
          Create empty data
        </button>
        <div class="row row_auto" style="height: 100%">
            <teta-svg-chart [config]="config" class="bg-background-50 border border-text-50"></teta-svg-chart>
            <teta-svg-chart [config]="config" class="bg-background-50 border border-text-50"></teta-svg-chart>
        </div>

      </div>
    </div>
`,
});
