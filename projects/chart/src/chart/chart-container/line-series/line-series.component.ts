import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SeriesBaseComponent} from '../../base/series-base.component';
import {ChartService} from '../../chart.service';
import {BasePoint} from '../../model/base-point';

@Component({
  selector: 'svg:svg[teta-line-series]',
  template: '<svg:path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"></svg:path>',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> implements OnInit {
  constructor(protected override svc: ChartService,
              protected override cdr: ChangeDetectorRef
  ) {
    super(svc, cdr);
  }

  override ngOnInit(): void {
  }
}
