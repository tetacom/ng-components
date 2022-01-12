import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartService } from '../service/chart.service';
import { IChartConfig } from '../model/i-chart-config';
import { defaultChartConfig } from '../default/default-chart-config';
import { BasePoint } from '../model/base-point';
import { Series } from '../model/series';
import { ZoomService } from '../service/zoom.service';
import { ScaleService } from '../service/scale.service';
import { AxesService } from '../service/axes.service';

@Component({
  selector: 'teta-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartService, ZoomService, ScaleService, AxesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges {
  legendSeries: Array<Series<BasePoint>>;

  @Input() set config(config: IChartConfig) {
    this._config = Object.assign({}, config);
  }

  get config() {
    return this._config;
  }

  private _config;

  constructor(private _service: ChartService) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {}
}
