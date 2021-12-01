import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { SeriesHostComponent } from './chart-container/series-host/series-host.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { LegendComponent } from './legend/legend.component';
import { SeriesBaseComponent } from './base/series-base.component';
import { LineSeriesComponent } from './chart-container/series/line/line-series.component';
import { GridlinesComponent } from './chart-container/gridlines/gridlines.component';
import { XAxisComponent } from './chart-container/x-axis/x-axis.component';
import { YAxisComponent } from './chart-container/y-axis/y-axis.component';
import { PlotlineComponent } from './chart-container/plotline/plotline.component';
import { PlotbandComponent } from './chart-container/plotband/plotband.component';
import { BarSeriesComponent } from './chart-container/series/bar/bar-series.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    ChartComponent,
    SeriesHostComponent,
    ChartContainerComponent,
    LegendComponent,
    SeriesBaseComponent,
    LineSeriesComponent,
    GridlinesComponent,
    XAxisComponent,
    YAxisComponent,
    PlotlineComponent,
    PlotbandComponent,
    BarSeriesComponent,
    TooltipDirective,
  ],
  exports: [ChartComponent],
  imports: [CommonModule],
})
export class ChartModule {}
