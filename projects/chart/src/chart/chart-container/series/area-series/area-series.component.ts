import { ChangeDetectionStrategy, Component, computed, OnDestroy } from '@angular/core';
import * as d3 from 'd3';

import { BasePoint } from '../../../model/base-point';
import { ClipPointsDirection } from '../../../model/enum/clip-points-direction';
import { LinearSeriesBaseComponent } from '../linear-series-base.component';
import { FillDirection, FillType } from '../../../model/enum/fill-type';

@Component({
  selector: 'svg:svg[teta-area-series]',
  templateUrl: './area-series.component.html',
  styleUrls: ['./area-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaSeriesComponent<T extends BasePoint> extends LinearSeriesBaseComponent<T> implements OnDestroy {
  areaPath = computed(() => {
    if (!this.x() || !this.y()) {
      return '';
    }

    const area = d3
      .area<BasePoint>()
      .defined((point) => point.x !== null && point.y !== null && !isNaN(point.x) && !isNaN(point.y));

    if (this.config().inverted) {
      area
        .x1((_) => (_.x1 !== null && _.x1 !== undefined ? this.x()(_.x1) : this.x()(0)))
        .x0((_) => this.x()(_.x))
        .y((_) => this.y()(_.y));
    } else {
      area
        .y1((_) => (_.y1 !== null && _.y1 !== undefined ? this.y()(_.y1) : this.y()(0)))
        .y0((_) => this.y()(_.y))
        .x((_) => this.x()(_.x));
    }

    const filter = this.defaultClipPointsMapping.get(this.series().clipPointsDirection);
    let filteredData = this.series().data;

    if (this.series().clipPointsDirection === ClipPointsDirection.x) {
      let [min, max] = this.x().domain();

      min = min instanceof Date ? min.getTime() : min;
      max = max instanceof Date ? max.getTime() : max;

      filteredData = filteredData?.filter(filter(min, max));
    }

    if (this.series().clipPointsDirection === ClipPointsDirection.y) {
      let [min, max] = this.y().domain();

      min = min instanceof Date ? min.getTime() : min;
      max = max instanceof Date ? max.getTime() : max;

      filteredData = filteredData?.filter(filter(min, max));
    }
    return area(filteredData);
  });
  protected readonly FillType = FillType;
  protected readonly FillDirection = FillDirection;
}
