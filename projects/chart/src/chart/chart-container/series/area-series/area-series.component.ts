import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy,
  OnInit,
} from '@angular/core';
import {BasePoint} from '../../../model/base-point';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import {FillDirection, FillType} from '../../../model/enum/fill-type';
import {LinearSeriesBase} from '../linear-series-base';
import {combineLatest, map, Observable} from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'svg:svg[teta-area-series]',
  templateUrl: './area-series.component.html',
  styleUrls: ['./area-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaSeriesComponent<T extends BasePoint>
  extends LinearSeriesBase<T>
  implements OnInit, AfterViewInit, OnDestroy {
  areaPath: Observable<string>;

  fillDirection = FillDirection;
  fillType = FillType;
  id: string;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService, element);
    this.id = (Date.now() + Math.random()).toString(36);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.areaPath = combineLatest([
      this.scaleService.xScaleMap,
      this.scaleService.yScaleMap,
    ]).pipe(
      map(
        (
          data: [Map<number, any>, Map<number, any>]
        ) => {
          const [x, y] = data;
          this.x = x.get(this.series.xAxisIndex);
          this.y = y.get(this.series.yAxisIndex);
          this.x = x.get(this.series.xAxisIndex);
          this.y = y.get(this.series.yAxisIndex);

          const area = d3
            .area<BasePoint>()
            .defined(
              (point) =>
                point.x !== null &&
                point.y !== null &&
                !isNaN(point.x) &&
                !isNaN(point.y)
            );

          area
            .x1((_) =>
              _.x1 !== null && _.x1 !== undefined ? this.x(_.x1) : this.x(0)
            )
            .x0((_) => this.x(_.x))

            .y((_) =>
              this.y(_.y)
            );
          return area(this.series.data);
        }
      )
    );
  }
}
