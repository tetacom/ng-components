import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import { SeriesType } from '../model/enum/series-type';
import { FillType } from '../model/enum/fill-type';
import { ClipPointsDirection } from '../model/enum/clip-points-direction';

export const defaultSeriesConfig = (): Series<BasePoint> => ({
  data: [],
  type: SeriesType.line,
  xAxisIndex: 0,
  yAxisIndex: 0,
  fillType: FillType.gradient,
  color: 'coral',
  visible: true,
  enabled: true,
  clipPointsDirection: ClipPointsDirection.x,
});
