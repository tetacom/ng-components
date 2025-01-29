import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { map, Observable } from 'rxjs';

import { BasePoint } from '../../../model/base-point';
import { ClipPointsDirection } from '../../../model/enum/clip-points-direction';
import { FillDirection, FillType } from '../../../model/enum/fill-type';
import { LinearSeriesBaseComponent } from '../linear-series-base.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-area-series]',
  templateUrl: './area-series.component.html',
  styleUrls: ['./area-series.component.scss'],
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaSeriesComponent<T extends BasePoint>
  extends LinearSeriesBaseComponent<T>
  implements OnInit, OnDestroy
{
  areaPath: Observable<string>;

  fillDirection = FillDirection;
  fillType = FillType;

  override ngOnInit() {
    super.ngOnInit();
    this.areaPath = this.scaleService.scales.pipe(
      map((data) => {
        const { x, y } = data;

        this.x = x.get(this.series().xAxisIndex)?.scale;
        this.y = y.get(this.series().yAxisIndex)?.scale;

        if (!this.x || !this.y) {
          return '';
        }

        const area = d3
          .area<BasePoint>()
          .defined((point) => point.x !== null && point.y !== null && !isNaN(point.x) && !isNaN(point.y));

        area
          .x1((_) => (_.x1 !== null && _.x1 !== undefined ? this.x(_.x1) : this.x(0)))
          .x0((_) => this.x(_.x))

          .y((_) => this.y(_.y));

        const filter = this.defaultClipPointsMapping.get(this.series().clipPointsDirection);
        let filteredData = this.series().data;

        if (this.series().clipPointsDirection === ClipPointsDirection.x) {
          let [min, max] = this.x.domain();

          min = min instanceof Date ? min.getTime() : min;
          max = max instanceof Date ? max.getTime() : max;

          filteredData = filteredData?.filter(filter(min, max));
        }

        if (this.series().clipPointsDirection === ClipPointsDirection.y) {
          let [min, max] = this.y.domain();

          min = min instanceof Date ? min.getTime() : min;
          max = max instanceof Date ? max.getTime() : max;

          filteredData = filteredData?.filter(filter(min, max));
        }

        return area(filteredData);
      }),
    );
  }
}
