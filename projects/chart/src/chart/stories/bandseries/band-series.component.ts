import { Component } from '@angular/core';
import { SeriesBaseComponent } from '../../base/series-base.component';
import { BasePoint } from '../../model/base-point';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-band-series]',
  templateUrl: './band-series.component.html',
  imports: [AsyncPipe],
  styleUrls: ['./band-series.component.scss'],
})
export class BandSeriesComponent extends SeriesBaseComponent<BasePoint> {
  x = this.scaleService.scales.pipe(map((_) => _.x.get(this.series().xAxisIndex)?.scale));
  y = this.scaleService.scales.pipe(map((_) => _.y.get(this.series().yAxisIndex)?.scale));
}
