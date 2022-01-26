import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChartService } from '../service/chart.service';
import { IChartConfig } from '../model/i-chart-config';

import { BasePoint } from '../model/base-point';
import { Series } from '../model/series';
import { ZoomService } from '../service/zoom.service';
import { ScaleService } from '../service/scale.service';
import { BrushService } from '../service/brush.service';
import { AxesService } from '../service/axes.service';
import { ChartBounds } from '../model/chart-bounds';

import { IChartEvent } from '../model/i-chart-event';
import { PlotLine } from '../model/plot-line';
import { PlotBand } from '../model/plot-band';
import { IPointMove } from '../model/i-point-move';
import { TooltipTracking } from '../model/enum/tooltip-tracking';
import { ZoomType } from '../model/enum/zoom-type';

@Component({
  selector: 'teta-svg-chart',
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
  hasSeriesData: boolean;

  @Output()
  plotBandsMove: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<
    IChartEvent<PlotBand>
  >();

  @Output()
  plotLinesMove: EventEmitter<IChartEvent<PlotLine>> = new EventEmitter<
    IChartEvent<PlotLine>
  >();

  @Output()
  pointMove: EventEmitter<IChartEvent<IPointMove>> = new EventEmitter<
    IChartEvent<IPointMove>
  >();

  @Input() set config(config: IChartConfig) {
    const defaultConfig: IChartConfig = {
      zoom: {
        enable: true,
        type: ZoomType.x,
      },
      bounds: new ChartBounds(),
      legend: {
        enable: true,
      },
      tooltip: {
        enable: true,
        showMarkers: true,
        tracking: TooltipTracking.x,
      },
      xAxis: [],
      yAxis: [],
    };

    config?.series?.forEach((_) => {
      if (_.xAxisIndex === null || _.xAxisIndex === undefined) {
        _.xAxisIndex = 0;
      }
      if (_.yAxisIndex === null || _.yAxisIndex === undefined) {
        _.yAxisIndex = 0;
      }
    });

    this._config = Object.assign(defaultConfig, config);

    this.svc.init(this._config);

    this.hasSeriesData = !!this._config?.series?.some((_) => _.data.length);
  }

  get config() {
    return this._config;
  }

  private _config;

  constructor(
    private svc: ChartService,
    private zoomService: ZoomService,
    private axesService: AxesService
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this.svc.plotBandMove.subscribe((_) => {
      this.plotBandsMove.emit(_);
    });

    this.svc.plotLineMove.subscribe((_) => {
      this.plotLinesMove.emit(_);
    });

    this.svc.pointMove.subscribe((_) => {
      this.pointMove.emit(_);
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.zoomService.broadcastSubscribtion?.unsubscribe();
  }
}
