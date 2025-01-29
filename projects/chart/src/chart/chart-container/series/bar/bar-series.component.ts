import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { SeriesType } from '../../../model/enum/series-type';
import * as d3 from 'd3';

@Component({
  selector: 'svg:svg[teta-bar-series]',
  templateUrl: './bar-series.component.html',
  styleUrls: ['./bar-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  x1 = computed(() => {
    const x = this.xScales().get(this.series().xAxisIndex)?.scale;
    const range = x.range();
    const domain = this.series().data.map((_) => _.x);

    return d3.scaleBand<number>().range([0, range[1]]).domain(domain).padding(0.1);
  });

  barSeriesCount = computed(() => {
    const count = this.config().series.filter(
      (_) => _.type === SeriesType.bar && _.xAxisIndex === this.series().xAxisIndex,
    );
    return count.length;
  });

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  protected readonly Math = Math;
  protected readonly Number = Number;
}
