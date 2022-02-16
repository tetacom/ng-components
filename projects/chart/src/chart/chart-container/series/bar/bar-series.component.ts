import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { ChartService } from '../../../service/chart.service';
import { ScaleService } from '../../../service/scale.service';
import { ZoomService } from '../../../service/zoom.service';
import { map, Observable } from 'rxjs';
import { SeriesType } from '../../../model/enum/series-type';
import * as d3 from 'd3';

@Component({
  selector: 'svg:svg[teta-bar-series]',
  templateUrl: './bar-series.component.html',
  styleUrls: ['./bar-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, OnChanges
{
  x: Observable<any>;
  x1: Observable<any>;
  y: Observable<any>;

  barSeriesCount: Observable<number>;

  Math: any = Math;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService, element);
  }

  override ngOnInit(): void {
    this.barSeriesCount = this.svc.config.pipe(
      map((_) => {
        const count = _.series.filter(
          (_) =>
            _.type === SeriesType.bar && _.xAxisIndex === this.series.xAxisIndex
        );

        return count.length;
      })
    );

    this.x1 = this.scaleService.xScaleMap.pipe(
      map((_) => {
        const x = _.get(this.series.xAxisIndex);
        const range = x.range();
        const domain = this.series.data.map((_) => _.x);

        return d3
          .scaleBand<number>()
          .range([0, range[1]])
          .domain(domain)
          .padding(0.1);
      })
    );

    this.x = this.scaleService.xScaleMap.pipe(
      map((_) => _.get(this.series.xAxisIndex))
    );

    this.y = this.scaleService.yScaleMap.pipe(
      map((_) => _.get(this.series.yAxisIndex))
    );
  }

  ngOnChanges(changes: SimpleChanges) {}
}
