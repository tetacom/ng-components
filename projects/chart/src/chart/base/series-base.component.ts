import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import {ChartService} from '../service/chart.service';
import {Series} from '../model/series';
import {BasePoint} from '../model/base-point';
import {ScaleService} from '../service/scale.service';
import {ZoomService} from '../service/zoom.service';
import {Observable, tap} from 'rxjs';
import {IChartConfig} from '../model/i-chart-config';

@Component({
  template: '',
})
export class SeriesBaseComponent<T extends BasePoint> implements OnInit {
  @Input() config: IChartConfig;
  @Input() series: Series<T>;
  @Input() size: DOMRect;
  @Input() rect: any;

  zoom: Observable<any>;

  constructor(
    protected svc: ChartService,
    protected cdr: ChangeDetectorRef,
    protected scaleService: ScaleService,
    protected zoomService: ZoomService,
    protected element: ElementRef
  ) {
    this.zoomService.zoomed
      .pipe(
        tap((_) => {
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
  }
}
