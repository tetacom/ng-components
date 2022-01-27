import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { ChartService } from '../../../service/chart.service';
import { ScaleService } from '../../../service/scale.service';
import { ZoomService } from '../../../service/zoom.service';

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
  private scaleBand: d3.ScaleBand<any>;
  private y: any;

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
    // const x = this.scaleService.xScaleMap.get(this.series.xAxisIndex);
    // const y = this.scaleService.yScaleMap.get(this.series.yAxisIndex);
    //
    // const domain = this.series.data?.map((_: BasePoint) => _.x);
    // const range = [x(domain[0]), x(domain[domain?.length - 1])];
    //
    // this.scaleBand = d3.scaleBand<number>().domain(domain).range(range);
    //
    // this.y = y;
  }

  width() {
    return this.scaleBand.bandwidth();
  }

  height(point: BasePoint) {
    return Math.abs(this.y(0) - this.y(point.y));
  }

  getX(point: BasePoint) {
    return this.scaleBand(point.x);
  }

  getY(point: BasePoint) {
    return this.y(point.y);
  }

  ngOnChanges(changes: SimpleChanges) {}
}
