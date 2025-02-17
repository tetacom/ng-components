import { IChartConfig } from '../model/i-chart-config';
import { ZoomType } from '../model/enum/zoom-type';
import { ChartBounds } from '../model/chart-bounds';
import { TooltipTracking } from '../model/enum/tooltip-tracking';
import { ZoomBehaviorType } from '../model/enum/zoom-behavior-type';

export const defaultChartConfig = (): IChartConfig => ({
  name: null,
  zoom: {
    enable: true,
    type: ZoomType.x,
    syncType: ZoomType.xy,
    zoomBehavior: ZoomBehaviorType.move,
  },
  bounds: new ChartBounds({
    bottom: 12,
    left: 12,
    top: 12,
    right: 12,
  }),
  legend: {
    enable: true,
  },
  controls: {
    enable: false,
  },
  tooltip: {
    enable: true,
    showMarkers: true,
    tracking: TooltipTracking.x,
    showCrosshair: false,
    padding: {
      x: 16,
      y: 16,
    },
  },
  xAxis: [],
  yAxis: [],
  series: [],
  gridLines: {
    enable: true,
  },
});
