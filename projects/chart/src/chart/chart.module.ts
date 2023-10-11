import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@tetacom/ng-components';

import { SeriesBaseComponent } from './base/series-base.component';
import { ChartComponent } from './chart/chart.component';
import { AnnotationComponent } from './chart-container/annotation/annotation.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { CrosshairComponent } from './chart-container/crosshair/crosshair.component';
import { GridlinesComponent } from './chart-container/gridlines/gridlines.component';
import { PlotBandComponent } from './chart-container/plotband/plot-band.component';
import { PlotlineComponent } from './chart-container/plotline/plotline.component';
import { AreaSeriesComponent } from './chart-container/series/area-series/area-series.component';
import { BarSeriesComponent } from './chart-container/series/bar/bar-series.component';
import { BlockAreaSeriesComponent } from './chart-container/series/block-area-series/block-area-series.component';
import { BlockHorizontalSeriesComponent } from './chart-container/series/block-horizontal-series/block-horizontal-series.component';
import { BlockSeriesComponent } from './chart-container/series/block-series/block-series.component';
import { LineSeriesComponent } from './chart-container/series/line/line-series.component';
import { LinearSeriesBase } from './chart-container/series/linear-series-base';
import { ScatterSeriesComponent } from './chart-container/series/scatter-series/scatter-series.component';
import { SeriesHostComponent } from './chart-container/series-host/series-host.component';
import { TooltipComponent } from './chart-container/tooltip/tooltip.component';
import { XAxisComponent } from './chart-container/x-axis/x-axis.component';
import { YAxisComponent } from './chart-container/y-axis/y-axis.component';
import { BrushableDirective } from './directives/brushable.directive';
import { DraggablePointDirective } from './directives/draggable-point.directive';
import { ZoomableDirective } from './directives/zoomable.directive';
import { LegendComponent } from './legend/legend.component';
import { BandseriesComponent } from './stories/bandseries/bandseries.component';

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
    DraggablePointDirective,
    BandseriesComponent,
    BlockHorizontalSeriesComponent,
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
    BlockHorizontalSeriesComponent,
  ],
  imports: [CommonModule, LetModule],
})
export class ChartModule {}
