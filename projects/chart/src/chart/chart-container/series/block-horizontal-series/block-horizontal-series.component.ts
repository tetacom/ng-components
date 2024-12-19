import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { FillType } from '../../../model/enum/fill-type';
import { ChartService } from '../../../service/chart.service';
import { ScaleService } from '../../../service/scale.service';
import { ZoomService } from '../../../service/zoom.service';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
    selector: 'svg:svg[teta-block-horizontal-series]',
    templateUrl: './block-horizontal-series.component.html',
    styleUrls: ['./block-horizontal-series.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, NgStyle]
})
export class BlockHorizontalSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> implements OnInit {
  x: Observable<any>;
  y: Observable<any>;
  displayPoints: Observable<BasePoint[]>;
  fillType = FillType;
  id: string;
  Math = Math;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef,
  ) {
    super(svc, cdr, scaleService, zoomService, element);
    this.id = (Date.now() + Math.random()).toString(36);
  }

  override ngOnInit(): void {
    this.x = this.scaleService.scales.pipe(map((_) => _.x.get(this.series.xAxisIndex)?.scale));
    this.y = this.scaleService.scales.pipe(map((_) => _.y.get(this.series.yAxisIndex)?.scale));

    this.displayPoints = this.x.pipe(
      filter((y) => y),
      map((y) => {
        return this.series.data.filter((point, index, arr) => {
          const [min, max] = y.domain();
          return (
            (point.x >= min || point.x1 >= min || arr[index + 1]?.x >= min || arr[index + 1]?.x1 >= min) &&
            (point.x <= max || point.x1 <= max || arr[index - 1]?.x <= max || arr[index - 1]?.x1 <= max)
          );
        });
      }),
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
}
