import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart/chart.component';
import {SeriesHostComponent} from './chart-container/series-host/series-host.component';
import {ChartContainerComponent} from './chart-container/chart-container.component';
import {LegendComponent} from './legend/legend.component';
import {SeriesBaseComponent} from './base/series-base.component';
import {LineSeriesComponent} from './chart-container/line-series/line-series.component';
import { GridlinesComponent } from './chart-container/gridlines/gridlines.component';
import { XAxisComponent } from './chart-container/x-axis/x-axis.component';
import { YAxisComponent } from './chart-container/y-axis/y-axis.component';

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
    YAxisComponent
  ],
  exports: [
    ChartComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ChartModule {
}
