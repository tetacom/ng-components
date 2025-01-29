import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { map } from 'rxjs';
import { SeriesType } from '../../../model/enum/series-type';
import * as d3 from 'd3';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-bar-series]',
  templateUrl: './bar-series.component.html',
  styleUrls: ['./bar-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class BarSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  x = this.scaleService.scales.pipe(map((_) => _.x.get(this.series().xAxisIndex)?.scale));
  y = this.scaleService.scales.pipe(map((_) => _.y.get(this.series().yAxisIndex)?.scale));
  x1 = this.scaleService.scales.pipe(
    map((_) => {
      const x = _.x.get(this.series().xAxisIndex)?.scale;
      const range = x.range();
      const domain = this.series().data.map((_) => _.x);

      return d3.scaleBand<number>().range([0, range[1]]).domain(domain).padding(0.1);
    }),
  );

  barSeriesCount = this.svc.config.pipe(
    map((_) => {
      const count = _.series.filter((_) => _.type === SeriesType.bar && _.xAxisIndex === this.series().xAxisIndex);

      return count.length;
    }),
  );

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  protected readonly Math = Math;
}
