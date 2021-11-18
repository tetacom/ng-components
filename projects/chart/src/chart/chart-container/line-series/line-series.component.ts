import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SeriesBaseComponent} from '../../base/series-base.component';
import {ChartService} from '../../chart.service';
import {BasePoint} from '../../model/base-point';

@Component({
  selector: 'g [teta-line-series]',
  templateUrl: './line-series.component.html',
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
