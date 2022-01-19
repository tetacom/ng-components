import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
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
import { BrushService } from '../service/brush.service';
import { AxesService } from '../service/axes.service';
import { ChartBounds } from '../model/chart-bounds';

@Component({
  selector: 'teta-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [
    ChartService,
    ZoomService,
    ScaleService,
    AxesService,
    BrushService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  legendSeries: Array<Series<BasePoint>>;

  @Input() set config(config: IChartConfig) {
    this._config = Object.assign(
      {
        bounds: new ChartBounds(),
      },
      config
    );

    console.log(this._config);
  }

  get config() {
    return this._config;
  }

  private _config;

  constructor(
    private _service: ChartService,
    private zoomService: ZoomService
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.zoomService.broadcastSubscribtion?.unsubscribe();
  }
}
