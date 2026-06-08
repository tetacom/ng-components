import { BasePoint } from './base-point';
import { Series } from './series';

export interface ISeriesOffset {
  x: number;
  y: number;
}

export interface ISeriesOffsetItem {
  series: Series<BasePoint>;
  seriesId: number | string;
  offsetPx: ISeriesOffset;
  offsetValue: ISeriesOffset;
}

export interface ISeriesOffsetMove {
  series: Series<BasePoint>;
  seriesList?: Series<BasePoint>[];
  seriesIds?: Array<number | string>;
  offsets?: ISeriesOffsetItem[];
  offsetPx: ISeriesOffset;
  offsetValue: ISeriesOffset;
}
