import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import {BasePoint} from '../../../model/base-point';
import {SeriesBaseComponent} from '../../../base/series-base.component';
import {map, Observable} from 'rxjs';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import {FillType} from '../../../model/enum/fill-type';

@Component({
  selector: 'svg:svg[teta-block-series]',
  templateUrl: './block-series.component.html',
  styleUrls: ['./block-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit {
  x: Observable<any>;
  y: Observable<any>;
  displayPoints: Observable<BasePoint[]>;
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

  override ngOnInit(): void {
    const defaultVisiblePixels = 1;

    this.x = this.scaleService.xScaleMap.pipe(
      map((_) => _.get(this.series.xAxisIndex))
    );
    this.y = this.scaleService.yScaleMap.pipe(
      map((_) => _.get(this.series.yAxisIndex))
    );

    this.displayPoints = this.y.pipe(
      map((y) => {
        return this.series.data.filter((point, index, arr) => {
          const height = Math.abs(y(point.y1) - y(point.y));
          const [min, max] = y.domain();

          const visibleCondition =
            height > defaultVisiblePixels &&
            (point.y >= min ||
              point.y1 >= min ||
              arr[index + 1]?.y >= min ||
              arr[index + 1]?.y1 >= min) &&
            (point.y <= max ||
              point.y1 <= max ||
              arr[index - 1]?.y <= max ||
              arr[index - 1]?.y1 <= max);

          return visibleCondition;
        });
      })
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
  ngAfterViewInit() {
  }
}
