import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ChartService} from '../chart.service';
import {Series} from '../model/series';
import {BasePoint} from '../model/base-point';

@Component({
  template: ''
})
export class SeriesBaseComponent<T extends BasePoint> implements OnInit {
  @Input() series: Series<T>;
  @Input() size: DOMRect;

  constructor(protected svc: ChartService,
              protected cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }
}
