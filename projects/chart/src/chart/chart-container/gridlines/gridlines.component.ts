import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, Input,
} from '@angular/core';

import {ScaleService} from "../../service/scale.service";
import {map, Observable, withLatestFrom} from "rxjs";
import {IChartConfig} from "../../model/i-chart-config";
import {ChartService} from "../../service/chart.service";
import {generateTicks} from "../../core/utils/generate-ticks";
import {IScalesMap} from "../../model/i-scales-map";
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: '[teta-gridlines]',
  templateUrl: './gridlines.component.html',
  styleUrls: ['./gridlines.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ]
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

    this.tickYValues = this.svc.scales.pipe(
      withLatestFrom(this.config),
      map((_: [IScalesMap, IChartConfig]) => {
        const [scales, config] = _;
        const ratio = this.size.height / 40;
        return config.gridLines?.y?.ticksCount != null ? generateTicks(scales.y.get(0).scale.domain(), config.gridLines?.y?.ticksCount) : scales.y.get(0)?.scale.ticks(ratio);
      }));

    this.tickXValues = this.svc.scales.pipe(
      withLatestFrom(this.config),
      map((_: [IScalesMap, IChartConfig]) => {
        const [scales, config] = _;
        const ratio = this.size.width / 40;
        return config.gridLines?.x?.ticksCount != null ? generateTicks(scales.x.get(0).originDomain, config.gridLines?.x?.ticksCount) : scales.x.get(0)?.scale.ticks(ratio);
      }));

    this.y = this.svc.scales.pipe(map((_) => _.y.get(0)?.scale));
    this.x = this.svc.scales.pipe(map((_) => _.x.get(0)?.scale));
  }

  ngAfterViewInit() {

  }
}
