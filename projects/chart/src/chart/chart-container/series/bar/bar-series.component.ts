import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {SeriesBaseComponent} from '../../../base/series-base.component';
import {BasePoint} from '../../../model/base-point';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import {map, Observable} from 'rxjs';
import {SeriesType} from '../../../model/enum/series-type';
import * as d3 from 'd3';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'svg:svg[teta-bar-series]',
  templateUrl: './bar-series.component.html',
  styleUrls: ['./bar-series.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
  ]
})
export class BarSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, OnChanges {

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

    this.x1 = this.scaleService.scales.pipe(
      map((_) => {
        const x = _.x.get(this.series.xAxisIndex)?.scale;
        const range = x.range();
        const domain = this.series.data.map((_) => _.x);

        return d3
          .scaleBand<number>()
          .range([0, range[1]])
          .domain(domain)
          .padding(0.1);
      })
    );

    this.x = this.scaleService.scales.pipe(
      map((_) => _.x.get(this.series.xAxisIndex)?.scale)
    );

    this.y = this.scaleService.scales.pipe(
      map((_) => _.y.get(this.series.yAxisIndex)?.scale)
    );
  }

  mouseenter(point: BasePoint) {
    this.svc.setTooltip({
      point: point,
      series: this.series,
    });
  }

  mouseleave(point: BasePoint) {
    this.svc.setTooltip({
      point: null,
      series: this.series,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  isNumber(value: any): value is number {
    return typeof value === 'number'
  }
}
