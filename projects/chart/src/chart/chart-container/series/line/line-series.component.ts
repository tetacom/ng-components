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
import { filter, interval, map, Observable, tap } from 'rxjs';
import { IPointer } from '../../../model/i-pointer';

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
  transform: Observable<string>;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService
  ) {
    super(svc, cdr, scaleService);
  }

  override ngOnInit(): void {
    this.transform = this.svc.pointerMove.pipe(
      filter(({ event }) => event),
      map(({ event }) => {
        return this.getTransform(event);
      }),
      tap((_) => this.cdr.detectChanges())
    );
  }

  getPath() {
    const x = this.scaleService.xScales.get(this.series.xAxisIndex);
    const y = this.scaleService.yScales.get(this.series.yAxisIndex);

    const line = d3
      .line<BasePoint>()
      .x((point) => x(point.x))
      .y((point) => y(point.y));

    return line(this.series.data);
  }

  getTransform(event: any) {
    const mouse = d3.pointer(event);

    const foundX = this.scaleService.xScales.get(this.series.xAxisIndex);
    const foundY = this.scaleService.yScales.get(this.series.yAxisIndex);

    const bisect = d3.bisector((_: BasePoint) => _.x).left;
    const x0 = foundX.invert(mouse[0]);

    const index = bisect(this.series.data, x0, 0);

    const foundPoint = this.series.data[index] ? this.series.data[index] : null;

    this.svc.setTooltip(foundPoint);

    return `translate(${!isNaN(foundPoint?.x) ? foundX(foundPoint.x) : 0}, ${
      !isNaN(foundPoint?.y) ? foundY(foundPoint.y) : 0
    })`;
  }
}
