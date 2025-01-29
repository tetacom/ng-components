import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map } from 'rxjs';

import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { FillType } from '../../../model/enum/fill-type';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-block-area-series]',
  templateUrl: './block-area-series.component.html',
  styleUrls: ['./block-area-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class BlockAreaSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  x = this.scaleService.scales.pipe(map((_) => _.x.get(this.series().xAxisIndex)?.scale));
  y = this.scaleService.scales.pipe(map((_) => _.y.get(this.series().yAxisIndex)?.scale));
  displayPoints = this.y.pipe(
    filter((y) => y),
    map((y) => {
      return this.series().data.filter((point, index, arr) => {
        const [min, max] = y.domain();
        return (
          (point.y >= min || point.y1 >= min || arr[index + 1]?.y >= min || arr[index + 1]?.y1 >= min) &&
          (point.y <= max || point.y1 <= max || arr[index - 1]?.y <= max || arr[index - 1]?.y1 <= max)
        );
      });
    }),
  );
  fillType = FillType;

  protected readonly Math = Math;
}
