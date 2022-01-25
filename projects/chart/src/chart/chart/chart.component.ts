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
import { defaultAxisConfig } from '../default/default-configs';

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
    const defaultConfig = {
      bounds: new ChartBounds(),
    };

    this._config = Object.assign(defaultConfig, config);
  }

  get config() {
    return this._config;
  }

  private _config;

  constructor(private svc: ChartService, private zoomService: ZoomService) {}

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this.svc.plotbandMove.subscribe((_) => {
      this.plotBandsMove.emit(_);
    });

    this.svc.plotlineMove.subscribe((_) => {
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
