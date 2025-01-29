import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { FillType } from '../../../model/enum/fill-type';

@Component({
  selector: 'svg:svg[teta-block-area-series]',
  templateUrl: './block-area-series.component.html',
  styleUrls: ['./block-area-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockAreaSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  displayPoints = computed(() => {
    return this.series().data.filter((point, index, arr) => {
      const [min, max] = this.y().domain();
      return (
        (point.y >= min || point.y1 >= min || arr[index + 1]?.y >= min || arr[index + 1]?.y1 >= min) &&
        (point.y <= max || point.y1 <= max || arr[index - 1]?.y <= max || arr[index - 1]?.y1 <= max)
      );
    });
  });
  fillType = FillType;

  protected readonly Math = Math;
}
