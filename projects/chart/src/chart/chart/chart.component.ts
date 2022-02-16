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
import { IChartEvent } from '../model/i-chart-event';
import { PlotLine } from '../model/plot-line';
import { PlotBand } from '../model/plot-band';
import { IPointMove } from '../model/i-point-move';
import { map, Observable, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'teta-svg-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartService, ZoomService, ScaleService, BrushService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  legendSeries: Array<Series<BasePoint>>;
  hasSeriesData: Observable<boolean>;
  svcConfig: Observable<IChartConfig>;
  @Output()
  plotBandsMove: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<
    IChartEvent<PlotBand>
  >();

  @Output()
  plotBandsClick: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<
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

  @Output()
  chartClick: EventEmitter<IChartEvent<BasePoint>> = new EventEmitter<
    IChartEvent<BasePoint>
    >();

  @Output()
  chartContextMenu: EventEmitter<IChartEvent<BasePoint>> = new EventEmitter<
    IChartEvent<BasePoint>
    >();

  @Input() set config(config: IChartConfig) {
    this._svc.setConfig(config);
  }

  private _alive = true;

  constructor(private _svc: ChartService, private _zoomService: ZoomService) {
    this.svcConfig = this._svc.config;
    this.hasSeriesData = this.svcConfig.pipe(
      map(
        (_) => _.series?.length > 0 && _.series?.some((_) => _.data?.length > 0)
      )
    );
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this._svc.plotBandEvent
      .pipe(takeWhile(() => this._alive))
      .subscribe((_) => {
        this.plotBandsMove.emit(_);
      });

    this._svc.plotLineMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotLinesMove.emit(_);
    });

    this._svc.pointMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.pointMove.emit(_);
    });

    this._svc.chartClick.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.chartClick.emit(_);
    });

    this._svc.chartContextMenu.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.chartContextMenu.emit(_);
    });

    this._svc.plotBandClick
      .pipe(takeWhile(() => this._alive))
      .subscribe((_) => {
        this.plotBandsClick.emit(_);
      });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this._alive = false;
    this._zoomService.broadcastSubscription?.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
