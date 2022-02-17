import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {BasePoint} from '../../../model/base-point';
import {SeriesBaseComponent} from '../../../base/series-base.component';
import {map, Observable} from 'rxjs';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';

@Component({
  selector: 'svg:svg[teta-scatter-series]',
  templateUrl: './scatter-series.component.html',
  styleUrls: ['./scatter-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit {
  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;
  path: Observable<string>;
  svgElement: SVGGeometryElement;
  x: Observable<any>;
  y: Observable<any>;

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
    this.x = this.scaleService.xScaleMap.pipe(map(_ => _.get(this.series.xAxisIndex)));
    this.y = this.scaleService.yScaleMap.pipe(map(_ => _.get(this.series.yAxisIndex)));
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
