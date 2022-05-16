import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart/chart.component';
import {SeriesHostComponent} from './chart-container/series-host/series-host.component';
import {ChartContainerComponent} from './chart-container/chart-container.component';
import {LegendComponent} from './legend/legend.component';
import {SeriesBaseComponent} from './base/series-base.component';
import {LineSeriesComponent} from './chart-container/series/line/line-series.component';
import {GridlinesComponent} from './chart-container/gridlines/gridlines.component';
import {XAxisComponent} from './chart-container/x-axis/x-axis.component';
import {YAxisComponent} from './chart-container/y-axis/y-axis.component';
import {PlotlineComponent} from './chart-container/plotline/plotline.component';
import {PlotBandComponent} from './chart-container/plotband/plot-band.component';
import {BarSeriesComponent} from './chart-container/series/bar/bar-series.component';
import {TooltipComponent} from './chart-container/tooltip/tooltip.component';
import {ZoomableDirective} from './directives/zoomable.directive';
import {BrushableDirective} from './directives/brushable.directive';
import {ScatterSeriesComponent} from './chart-container/series/scatter-series/scatter-series.component';
import {BlockSeriesComponent} from './chart-container/series/block-series/block-series.component';
import {BlockAreaSeriesComponent} from './chart-container/series/block-area-series/block-area-series.component';
import {AreaSeriesComponent} from './chart-container/series/area-series/area-series.component';
import {AnnotationComponent} from './chart-container/annotation/annotation.component';
import {LinearSeriesBase} from './chart-container/series/linear-series-base';
import { CrosshairComponent } from './chart-container/crosshair/crosshair.component';

@NgModule({
  declarations: [
    ChartComponent,
    SeriesHostComponent,
    ChartContainerComponent,
    LegendComponent,
    SeriesBaseComponent,
    LinearSeriesBase,
    LineSeriesComponent,
    GridlinesComponent,
    XAxisComponent,
    YAxisComponent,
    PlotlineComponent,
    PlotBandComponent,
    BarSeriesComponent,
    TooltipComponent,
    ZoomableDirective,
    BrushableDirective,
    AreaSeriesComponent,
    ScatterSeriesComponent,
    BlockSeriesComponent,
    BlockAreaSeriesComponent,
    AnnotationComponent,
    CrosshairComponent,
  ],
  exports: [
    ChartComponent,
    LegendComponent,
    SeriesBaseComponent,
    LineSeriesComponent,
    BarSeriesComponent,
    ScatterSeriesComponent,
    AreaSeriesComponent,
    BlockSeriesComponent,
    BlockAreaSeriesComponent,
  ],
  imports: [CommonModule],
})
export class ChartModule {
}
