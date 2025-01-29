import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map } from 'rxjs';

import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { FillType } from '../../../model/enum/fill-type';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-block-horizontal-series]',
  templateUrl: './block-horizontal-series.component.html',
  styleUrls: ['./block-horizontal-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgStyle],
})
export class BlockHorizontalSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  x = this.scaleService.scales.pipe(map((_) => _.x.get(this.series().xAxisIndex)?.scale));
  y = this.scaleService.scales.pipe(map((_) => _.y.get(this.series().yAxisIndex)?.scale));

  displayPoints = this.x.pipe(
    filter((y) => y),
    map((y) => {
      return this.series().data.filter((point, index, arr) => {
        const [min, max] = y.domain();
        return (
          (point.x >= min || point.x1 >= min || arr[index + 1]?.x >= min || arr[index + 1]?.x1 >= min) &&
          (point.x <= max || point.x1 <= max || arr[index - 1]?.x <= max || arr[index - 1]?.x1 <= max)
        );
      });
    }),
  );
  fillType = FillType;

  protected readonly Math = Math;
}
