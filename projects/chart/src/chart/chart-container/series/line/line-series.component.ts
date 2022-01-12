import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { ChartService } from '../../../service/chart.service';
import { BasePoint } from '../../../model/base-point';
import { ScaleService } from '../../../service/scale.service';
import { filter, map, Observable, tap } from 'rxjs';

import { ZoomService } from '../../../service/zoom.service';

@Component({
  selector: 'svg:svg[teta-line-series]',
  templateUrl: './line-series.component.html',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit
{
  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService
  ) {
    super(svc, cdr, scaleService, zoomService);
  }

  override ngOnInit(): void {
    this.display = this.zoomService.zoomed.pipe(
      map(({ event }) => {
        return event?.type === 'end' ? 1 : 0;
      })
    );

    this.transform = this.svc.pointerMove.pipe(
      filter(({ event }) => event),
      map(({ event }) => {
        return this.getTransform(event);
      }),
      tap((_) => this.cdr.detectChanges())
    );
  }

  ngAfterViewInit() {}

  getPath() {
    const x = this.scaleService.xScales.get(this.series.xAxisIndex);
    const y = this.scaleService.yScales.get(this.series.yAxisIndex);

    const line = d3
      .line<BasePoint>()

      .x((point) => x(point.x))
      .y((point) => y(point.y));

    return line(this.series.data);
  }

  getTransform(event: any): Pick<BasePoint, 'x' | 'y'> {
    const mouse = d3.pointer(event);

    const foundX = this.scaleService.xScales.get(this.series.xAxisIndex);
    const foundY = this.scaleService.yScales.get(this.series.yAxisIndex);

    const bisect = d3.bisector((_: BasePoint) => _.x).left;
    const x0 = foundX.invert(mouse[0]);

    const index = bisect(this.series.data, x0, 0);

    const foundPoint = this.series.data[index] ? this.series.data[index] : null;

    if (foundPoint) {
      this.svc.setTooltip(foundPoint);

      return {
        x: foundX(foundPoint?.x),
        y: foundY(foundPoint?.y),
      };
    }

    return null;
  }
}
