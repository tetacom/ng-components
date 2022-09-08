import {randomInt} from 'd3-random';
import {cssColorNames} from './cssColorNames';
import {SeriesType} from '../model/enum/series-type';
import {Series} from '../model/series';
import {BasePoint} from '../model/base-point';
import {FillType} from '../model/enum/fill-type';
import {IChartConfig} from '../model/i-chart-config';
import {TooltipTracking} from '../model/enum/tooltip-tracking';
import {ChartBounds} from '../model/chart-bounds';
import {BrushType} from '../model/enum/brush-type';
import {ZoomType} from '../model/enum/zoom-type';
import * as faker from 'faker';
import {DragPointType} from '../model/enum/drag-point-type';

const randomColor = randomInt(0, cssColorNames.length - 1);

const seriesType = [SeriesType.line, SeriesType.line];

faker.locale = 'ru';

export const createSeries = (size: number) => {
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
export const createDragSeries = (size: number): Series<BasePoint> => {
  return {
    id: 'index',
    type: SeriesType.line,
    name: faker.address.cityName(),
    yAxisIndex: 0,
    xAxisIndex: 0,
    color: cssColorNames[randomColor()].toLowerCase(),
    fillType: FillType.gradient,
    data: Array.from(Array(size).keys())
      .map((key, index, arr) => {
        const point: BasePoint = {
          x: index,
          y: faker.datatype.number({min: 0, max: 200}),
          marker: index % 33 === 0 ? {
            draggable: true,
            dragType: DragPointType.xy,
            style: {
              strokeWidth: 10,
              fill: 'red'
            },
            label: {
              draggable: false,
              text: 'index'
            }
          } : null
        };

        return point;
      }),
  };
};
export const createChart = (size: number, inverted = true): IChartConfig => {
  return {
    name: '123123123132',
    inverted: inverted,
    tooltip: {
      tracking: TooltipTracking.y,
    },
    bounds: new ChartBounds({
      // top: 50
    }),
    xAxis: [
      {
        min: 0,
        max: 5000,
        visible: true,
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
        visible: true,
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

export const createChart2 = (size: number): IChartConfig => {
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
      enable: true,
      type: ZoomType.y,
      syncChannel: 'channelA',
    },
    legend: {
      enable: true,
    },
    series: createSeries(size),
  };
};

export const createDragChart = (size: number): IChartConfig => {
  return {
    name: '123123123132',
    inverted: true,
    tooltip: {
      tracking: TooltipTracking.y,
    },
    bounds: new ChartBounds({
    }),
    xAxis: [
      {
        niceTicks: false,
      },
    ],
    yAxis: [
      {
      },
    ],
    zoom: {
      enable: true,
      type: ZoomType.y
    },
    legend: {
      enable: false,
    },
    series: [createDragSeries(size)],
  };
};
