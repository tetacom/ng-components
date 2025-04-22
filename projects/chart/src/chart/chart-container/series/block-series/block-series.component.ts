import { ChangeDetectionStrategy, Component, computed, effect } from '@angular/core';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { FillType } from '../../../model/enum/fill-type';

@Component({
  selector: 'svg:svg[teta-block-series]',
  templateUrl: './block-series.component.html',
  styleUrls: ['./block-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {
  displayPoints = computed(() => {
    const domain = this.config().inverted ? this.y().domain() : this.x().domain();
    const [min, max] = domain;
    return this.series().data.filter((point, index, arr) => {
      const next = arr[index + 1];
      const secondNext = arr[index + 2];

      if (this.config().inverted) {
        if (point.y1 === null || point.y1 === undefined) {
          point.y1 = next?.y ?? point.y;
        }
        if (next && (next.y1 === null || next.y1 === undefined)) {
          next.y1 = secondNext?.y ?? next.y;
        }
        return (
          (point.y >= min || point.y1 >= min || arr[index + 1]?.y >= min || arr[index + 1]?.y1 >= min) &&
          (point.y <= max || point.y1 <= max || arr[index - 1]?.y <= max || arr[index - 1]?.y1 <= max)
        );
      } else {
        if (point.x1 === null || point.x1 === undefined) {
          point.x1 = next?.x ?? point.x;
        }
        if (next && (next.x1 === null || next.x1 === undefined)) {
          next.x1 = secondNext?.x ?? next.x;
        }
        return (
          (point.x >= min || point.x1 >= min || arr[index + 1]?.x >= min || arr[index + 1]?.x1 >= min) &&
          (point.x <= max || point.x1 <= max || arr[index - 1]?.x <= max || arr[index - 1]?.x1 <= max)
        );
      }
    });
  });

  protected readonly Math = Math;
  protected readonly FillType = FillType;
}
