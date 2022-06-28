import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, Input,
} from '@angular/core';

import {ScaleService} from "../../service/scale.service";
import {map, Observable} from "rxjs";
import {IChartConfig} from "../../model/i-chart-config";
import {ChartService} from "../../service/chart.service";

@Component({
  selector: '[teta-gridlines]',
  templateUrl: './gridlines.component.html',
  styleUrls: ['./gridlines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridlinesComponent implements AfterViewInit {

  @Input() size: DOMRect;

  config: Observable<IChartConfig>;
  tickYValues: Observable<number[]>;
  tickXValues: Observable<number[]>;
  x: Observable<any>;
  y: Observable<any>;

  constructor(private svc: ScaleService, private chartService: ChartService) {
    this.config = this.chartService.config;

    this.tickYValues = this.svc.yScaleMap.pipe(map((_) => {
      const ratio = this.size.height / 40;
      return _.get(0).ticks(ratio);
    }));
    this.tickXValues = this.svc.xScaleMap.pipe(map((_) => {
      const ratio = this.size.width / 40;
      return _.get(0).ticks(ratio);
    }));

    this.y = this.svc.yScaleMap.pipe(map((_) => _.get(0)));
    this.x = this.svc.xScaleMap.pipe(map((_) => _.get(0)));
  }

  ngAfterViewInit() {

  }
}
