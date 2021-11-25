import {IChartConfig} from '../model/i-chart-config';

export const defaultChartConfig: IChartConfig = {
  series: [],
  xAxis: [{
    visible: true
  }],
  yAxis: [{
    visible: true
  }],
  gridLines: true
};
