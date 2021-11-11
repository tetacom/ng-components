import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [CommonModule],
})
export class ChartModule {}
