import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { AsyncPipe } from '@angular/common';
import { FillType } from '../../../model/enum/fill-type';

@Component({
  selector: 'svg:svg[teta-block-series]',
  templateUrl: './block-series.component.html',
  styleUrls: ['./block-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class BlockSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  displayPoints = computed(() => {
    return this.series().data.filter((point, index, arr) => {
      const [min, max] = this.y().domain();
      return (
        (point.y >= min || point.y1 >= min || arr[index + 1]?.y >= min || arr[index + 1]?.y1 >= min) &&
        (point.y <= max || point.y1 <= max || arr[index - 1]?.y <= max || arr[index - 1]?.y1 <= max)
      );
    });
  });

  protected readonly Math = Math;
  protected readonly FillType = FillType;
}
