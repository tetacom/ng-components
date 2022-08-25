import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, NgZone, OnDestroy,
  OnInit,
} from '@angular/core';
import {ChartService} from '../../../service/chart.service';
import {BasePoint} from '../../../model/base-point';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import {LinearSeriesBase} from '../linear-series-base';

@Component({
  selector: 'svg:svg[teta-line-series]',
  templateUrl: './line-series.component.html',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineSeriesComponent<T extends BasePoint>
  extends LinearSeriesBase<T>
  implements OnInit, OnDestroy {

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef,
  ) {
    super(svc, cdr, scaleService, zoomService, element);
  }
}
