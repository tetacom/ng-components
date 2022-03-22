import {IChartConfig} from '../model/i-chart-config';
import {ZoomType} from '../model/enum/zoom-type';
import {ChartBounds} from '../model/chart-bounds';
import {TooltipTracking} from '../model/enum/tooltip-tracking';
import {ZoomBehaviorType} from "../model/enum/zoom-behavior-type";

export const defaultChartConfig = (): IChartConfig => ({
  zoom: {
    enable: true,
    type: ZoomType.x,
    zoomBehavior: ZoomBehaviorType.move
  },
  bounds: new ChartBounds(),
  legend: {
    enable: true,
  },
  tooltip: {
    enable: true,
    showMarkers: true,
    tracking: TooltipTracking.x,
    padding: {
      x: 16,
      y: 16
    }
  },
  xAxis: [],
  yAxis: [],
  series: [],
  gridLines: {
    enable: true
  }
});
