import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartService } from '../service/chart.service';
import { IChartConfig } from '../model/i-chart-config';
import { defaultChartConfig } from '../default/default-chart-config';
import { BasePoint } from '../model/base-point';
import { Series } from '../model/series';

@Component({
  selector: 'teta-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  legendSeries: Array<Series<BasePoint>>;

  @Input() set config(config: IChartConfig) {
    this._config = Object.assign(defaultChartConfig, config);
  }

  get config() {
    return this._config;
  }

  private _config;

  constructor(private _service: ChartService) {}

  ngOnInit(): void {}
}
