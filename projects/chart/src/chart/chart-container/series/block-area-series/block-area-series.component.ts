import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import {SeriesBaseComponent} from '../../../base/series-base.component';
import {BasePoint} from '../../../model/base-point';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import {map, Observable} from 'rxjs';
import {FillType} from '../../../model/enum/fill-type';

@Component({
  selector: 'svg:svg[teta-block-area-series]',
  templateUrl: './block-area-series.component.html',
  styleUrls: ['./block-area-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockAreaSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit {
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
    protected override element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService, element);
    this.id = (Date.now() + Math.random()).toString(36);
  }

  override ngOnInit(): void {
    const defaultVisiblePixels = 0;

    this.x = this.scaleService.scales.pipe(
      map((_) => _.x.get(this.series.xAxisIndex).scale)
    );
    this.y = this.scaleService.scales.pipe(
      map((_) => _.y.get(this.series.yAxisIndex).scale)
    );

    this.displayPoints = this.y.pipe(
      map((y) => {
        return this.series.data.filter((point, index, arr) => {
          const [min, max] = y.domain();
          return (point.y >= min ||
              point.y1 >= min ||
              arr[index + 1]?.y >= min ||
              arr[index + 1]?.y1 >= min) &&
            (point.y <= max ||
              point.y1 <= max ||
              arr[index - 1]?.y <= max ||
              arr[index - 1]?.y1 <= max);
        });
      })
    );
  }

  ngAfterViewInit() {
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
