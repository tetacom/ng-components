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
    const x = this.x();
    const y = this.y();
    const config = this.config();
    const series = this.series();

    if (!x || !y) {
      return '';
    }

    const area = d3
      .area<BasePoint>()
      .defined((point) => point.x !== null && point.y !== null && !isNaN(point.x) && !isNaN(point.y));

    if (config.inverted) {
      area
        .x1((_) => (_.x1 !== null && _.x1 !== undefined ? x(_.x1) : x(0)))
        .x0((_) => x(_.x))
        .y((_) => y(_.y));
    } else {
      area
        .y1((_) => (_.y1 !== null && _.y1 !== undefined ? y(_.y1) : y(0)))
        .y0((_) => y(_.y))
        .x((_) => x(_.x));
    }

    const filter = this.defaultClipPointsMapping.get(series.clipPointsDirection);
    let filteredData = series.data;

    if (series.clipPointsDirection === ClipPointsDirection.x) {
      let [min, max] = x.domain();

      min = min instanceof Date ? min.getTime() : min;
      max = max instanceof Date ? max.getTime() : max;

      filteredData = filteredData?.filter(filter(min, max));
    }

    if (series.clipPointsDirection === ClipPointsDirection.y) {
      let [min, max] = y.domain();

      min = min instanceof Date ? min.getTime() : min;
      max = max instanceof Date ? max.getTime() : max;

      filteredData = filteredData?.filter(filter(min, max));
    }
    return area(filteredData);
  });
  protected readonly FillType = FillType;
  protected readonly FillDirection = FillDirection;
}
