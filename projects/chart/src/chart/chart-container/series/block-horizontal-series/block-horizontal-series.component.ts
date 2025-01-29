import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { FillType } from '../../../model/enum/fill-type';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-block-horizontal-series]',
  templateUrl: './block-horizontal-series.component.html',
  styleUrls: ['./block-horizontal-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle],
})
export class BlockHorizontalSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  displayPoints = computed(() => {
    return this.series().data.filter((point, index, arr) => {
      const [min, max] = this.x().domain();
      return (
        (point.x >= min || point.x1 >= min || arr[index + 1]?.x >= min || arr[index + 1]?.x1 >= min) &&
        (point.x <= max || point.x1 <= max || arr[index - 1]?.x <= max || arr[index - 1]?.x1 <= max)
      );
    });
  });

  protected readonly Math = Math;
  protected readonly FillType = FillType;
}
