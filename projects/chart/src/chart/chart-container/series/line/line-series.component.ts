import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { ChartService } from '../../../chart.service';
import { BasePoint } from '../../../model/base-point';
import { ScaleService } from '../../../scale.service';

@Component({
  selector: 'svg:svg[teta-line-series]',
  templateUrl: './line-series.component.html',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit
{
  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService
  ) {
    super(svc, cdr, scaleService);
  }

  override ngOnInit(): void {}

  getPath() {
    const x = this.scaleService.xScales.get(this.series.xAxisIndex);
    const y = this.scaleService.yScales.get(this.series.yAxisIndex);

    const line = d3
      .line<BasePoint>()
      .x((point) => x(point.x))
      .y((point) => y(point.y));

    return line(this.series.data);
  }
}
