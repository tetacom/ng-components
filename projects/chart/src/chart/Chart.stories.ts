import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from './chart.module';
import { IChartConfig } from './model/i-chart-config';
import { AxisType } from './model/axis-type';
import { SeriesType } from './model/series-type';
import { randomInt } from 'd3-random';
import { Series } from './model/series';
import { BasePoint } from './model/base-point';
import * as faker from 'faker';
import { ZoomType } from './model/enum/zoom-type';

export default {
  title: 'Component/Chart',
  decorators: [withKnobs],
  component: ChartComponent,
  moduleMetadata: {
    imports: [ChartModule],
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

const series: Series<BasePoint>[] = seriesType.map(
  (type: SeriesType, index: number) => {
    return {
      id: index,
      type,
      name: type.toString(),
      yAxisIndex: 0,
      xAxisIndex: 0,
      color: cssColorNames[randomColor()].toLowerCase(),
      data: Array.from(Array(500).keys()).map((key, index) => {
        const num = faker.datatype.number({ min: 0, max: 100 });
        return {
          x: key,
          y: num,
        };
      }),
    };
  }
);

const config: IChartConfig = {
  name: '123',
  xAxis: [
    {
      type: AxisType.number,
      visible: true,
    },
  ],
  yAxis: [
    {
      type: AxisType.number,
      visible: true,
      title: 'атм',
    },
    {
      type: AxisType.number,
      visible: true,
      title: 'атм',
      opposite: true,
      min: 0,
      max: 2000,
    },
  ],
  zoom: {
    enable: true,
    type: ZoomType.xy,
  },
  series,
};

export const basicChart = () => ({
  moduleMetadata: {
    imports: [ChartModule],
  },
  props: {
    config,
  },
  template: `<div class="font-body-3 padding-3 bg-background-0" style="width: auto; height: 600px;">
      <teta-chart [config]="config" class="bg-background-50 border border-text-50"></teta-chart>
    </div>`,
});
