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
import {ChartService} from '../service/chart.service';
import {IChartConfig} from '../model/i-chart-config';
import {BasePoint} from '../model/base-point';
import {Series} from '../model/series';
import {ZoomService} from '../service/zoom.service';
import {ScaleService} from '../service/scale.service';
import {BrushService} from '../service/brush.service';
import {IChartEvent} from '../model/i-chart-event';
import {PlotLine} from '../model/plot-line';
import {PlotBand} from '../model/plot-band';
import {IPointMove} from '../model/i-point-move';
import {takeWhile} from 'rxjs';

@Component({
  selector: 'teta-svg-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [
    ChartService,
    ZoomService,
    ScaleService,
    BrushService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  legendSeries: Array<Series<BasePoint>>;
  hasSeriesData: boolean;

  @Output()
  plotBandsMove: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<IChartEvent<PlotBand>>();

  @Output()
  plotLinesMove: EventEmitter<IChartEvent<PlotLine>> = new EventEmitter<IChartEvent<PlotLine>>();

  @Output()
  pointMove: EventEmitter<IChartEvent<IPointMove>> = new EventEmitter<IChartEvent<IPointMove>>();

  @Input() set config(config: IChartConfig) {
    this._svc.setConfig(config);
    this._config = config;
    this.hasSeriesData = !!config?.series?.every((_) => _.data.length);
  }

  get config() {
    return this._config;
  }

  private _config: IChartConfig;
  private _alive = true;

  constructor(
    private _svc: ChartService,
    private _zoomService: ZoomService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
    this._svc.plotBandMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotBandsMove.emit(_);
    });

    this._svc.plotLineMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotLinesMove.emit(_);
    });

    this._svc.pointMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.pointMove.emit(_);
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this._alive = false;
    this._zoomService.broadcastSubscription?.unsubscribe();
  }
}
