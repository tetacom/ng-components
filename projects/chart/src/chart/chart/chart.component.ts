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
import {map, Observable, takeWhile} from 'rxjs';
import {Annotation} from "../model/annotation";

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
  plotBandsMove: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<IChartEvent<PlotBand>>();

  @Output()
  plotBandClick: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<IChartEvent<PlotBand>>();

  @Output()
  plotBandContextMenu: EventEmitter<IChartEvent<PlotBand>> = new EventEmitter<IChartEvent<PlotBand>>();


  @Output()
  plotLinesMove: EventEmitter<IChartEvent<PlotLine>> = new EventEmitter<IChartEvent<PlotLine>>();

  @Output()
  pointMove: EventEmitter<IChartEvent<IPointMove>> = new EventEmitter<IChartEvent<IPointMove>>();

  @Output()
  chartClick: EventEmitter<IChartEvent<BasePoint>> = new EventEmitter<IChartEvent<BasePoint>>();

  @Output()
  chartContextMenu: EventEmitter<IChartEvent<BasePoint>> = new EventEmitter<IChartEvent<BasePoint>>();

  @Output()
  annotationContextMenu: EventEmitter<IChartEvent<Annotation>> = new EventEmitter<IChartEvent<Annotation>>();

  @Output()
  annotationClick: EventEmitter<IChartEvent<Annotation>> = new EventEmitter<IChartEvent<Annotation>>();

  @Output()
  annotationMove: EventEmitter<IChartEvent<Annotation>> = new EventEmitter<IChartEvent<Annotation>>();


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

  ngOnChanges(changes: SimpleChanges) {
  }

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

    this._svc.chartClick
      .pipe(
        takeWhile(() => this._alive)
      ).subscribe((_) => {
      this.chartClick.emit(_);
    });

    this._svc.chartContextMenu
      .pipe(
        takeWhile(() => this._alive)
      ).subscribe((_) => {
      this.chartContextMenu.emit(_);
    });

    this._svc.plotBandClick
      .pipe(
        takeWhile(() => this._alive))
      .subscribe((_) => {
        this.plotBandClick.emit(_);
      });

    this._svc.plotBandContextMenu
      .pipe(
        takeWhile(() => this._alive))
      .subscribe((_) => {
        this.plotBandContextMenu.emit(_);
      });

    this._svc.annotationContextMenu
      .pipe(
        takeWhile(() => this._alive))
      .subscribe((_) => {
        this.annotationContextMenu.emit(_);
      });

    this._svc.annotationClick
      .pipe(
        takeWhile(() => this._alive))
      .subscribe((_) => {
        this.annotationClick.emit(_);
      });

    this._svc.annotationMove
      .pipe(
        takeWhile(() => this._alive))
      .subscribe((_) => {
        this.annotationMove.emit(_);
      });


  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this._alive = false;
    this._zoomService.broadcastSubscription?.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
