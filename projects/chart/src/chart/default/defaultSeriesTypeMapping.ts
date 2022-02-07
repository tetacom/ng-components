import { SeriesType } from '../model/enum/series-type';
import { SeriesBaseComponent } from '../base/series-base.component';
import { LineSeriesComponent } from '../chart-container/series/line/line-series.component';
import { BarSeriesComponent } from '../chart-container/series/bar/bar-series.component';
import { ScatterSeriesComponent } from '../chart-container/series/scatter-series/scatter-series.component';
import { BlockSeriesComponent } from '../chart-container/series/block-series/block-series.component';
import { BlockAreaSeriesComponent } from '../chart-container/series/block-area-series/block-area-series.component';

export const defaultSeriesTypeMapping = new Map<
  SeriesType,
  typeof SeriesBaseComponent
>()
  .set(SeriesType.line, LineSeriesComponent)
  .set(SeriesType.bar, BarSeriesComponent)
  .set(SeriesType.scatter, ScatterSeriesComponent)
  .set(SeriesType.block, BlockSeriesComponent)
  .set(SeriesType.blockArea, BlockAreaSeriesComponent);
