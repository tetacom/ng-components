import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePoint } from '../../../model/base-point';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-scatter-series]',
  templateUrl: './scatter-series.component.html',
  styleUrls: ['./scatter-series.component.scss'],
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  x = this.scaleService.scales.pipe(map((_) => _.x.get(this.series().xAxisIndex)?.scale));
  y = this.scaleService.scales.pipe(map((_) => _.y.get(this.series().yAxisIndex)?.scale));
  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;
  path: Observable<string>;
}
