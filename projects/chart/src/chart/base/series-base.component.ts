import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartService } from '../service/chart.service';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import { ScaleService } from '../service/scale.service';
import { ZoomService } from '../service/zoom.service';
import { Observable, tap } from 'rxjs';

@Component({
  template: '',
})
export class SeriesBaseComponent<T extends BasePoint> implements OnInit {
  @Input() series: Series<T>;
  @Input() size: DOMRect;

  zoom: Observable<any>;

  constructor(
    protected svc: ChartService,
    protected cdr: ChangeDetectorRef,
    protected scaleService: ScaleService,
    protected zoomService: ZoomService
  ) {
    this.zoomService.zoomed
      .pipe(
        tap((_) => {
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
