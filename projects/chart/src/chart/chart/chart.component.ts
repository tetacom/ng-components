import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Observable, takeWhile, withLatestFrom } from 'rxjs';

import { Annotation } from '../model/annotation';
import { BasePoint } from '../model/base-point';
import { ScaleType } from '../model/enum/scale-type';
import { TooltipTracking } from '../model/enum/tooltip-tracking';
import { IChartConfig } from '../model/i-chart-config';
import { IChartEvent } from '../model/i-chart-event';
import { IPointMove } from '../model/i-point-move';
import { IScalesMap } from '../model/i-scales-map';
import { PlotBand } from '../model/plot-band';
import { PlotLine } from '../model/plot-line';
import { BrushService } from '../service/brush.service';
import { ChartService } from '../service/chart.service';
import { ScaleService } from '../service/scale.service';
import { ZoomService } from '../service/zoom.service';
import { ChartContainerComponent } from '../chart-container/chart-container.component';
import { AsyncPipe } from '@angular/common';
import { LegendComponent } from '../legend/legend.component';

@Component({
  selector: 'teta-svg-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  providers: [ChartService, ZoomService, ScaleService, BrushService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChartContainerComponent, AsyncPipe, LegendComponent],
})
export class ChartComponent implements OnInit, OnDestroy {
  hasSeriesData: Observable<boolean>;
  svcConfig: Observable<IChartConfig>;
  @Output()
  pointerMove: EventEmitter<IChartEvent<Map<number, number>>> = new EventEmitter<IChartEvent<Map<number, number>>>();

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

  @Output()
  zoomServiceInstance: EventEmitter<ZoomService> = new EventEmitter<ZoomService>();

  @Output()
  brushServiceInstance: EventEmitter<BrushService> = new EventEmitter<BrushService>();

  @Input() set config(config: IChartConfig) {
    this.chartService.setConfig(config);
    this.zoomService.setBroadcastChannel(config?.zoom?.syncChannel);
  }

  private _alive = true;

  constructor(
    public chartService: ChartService,
    public zoomService: ZoomService,
    public brushService: BrushService,
    public scaleService: ScaleService,
  ) {
    this.svcConfig = this.chartService.config;
    this.hasSeriesData = this.svcConfig.pipe(
      map((_) => _.series?.length > 0 && _.series?.some((_) => _.data?.length > 0)),
    );
  }

  resetZoom() {
    this.scaleService.resetZoom();
  }

  ngOnInit(): void {
    this.zoomServiceInstance.emit(this.zoomService);
    this.brushServiceInstance.emit(this.brushService);

    this.chartService.pointerMove
      .pipe(
        takeWhile(() => this._alive),
        withLatestFrom(this.scaleService.scales, this.chartService.config),
      )
      .subscribe((data: [PointerEvent, IScalesMap, IChartConfig]) => {
        const [event, { x, y }, config] = data;
        const tooltipTracking = config?.tooltip?.tracking;
        if (tooltipTracking === TooltipTracking.y) {
          const result = new Map<number, number>();
          y.forEach((value, key) => {
            if (value.options.scaleType.type === ScaleType.band) {
              return;
            }
            result.set(key, value.scale.invert(event.offsetY));
          });
          this.pointerMove.emit({
            event: event,
            target: result,
          });
        } else {
          const result = new Map<number, number>();
          x.forEach((value, key) => {
            if (value.options.scaleType.type === ScaleType.band) {
              return;
            }
            result.set(key, value.scale.invert(event.offsetX));
          });
          this.pointerMove.emit({
            event: event,
            target: result,
          });
        }
      });

    this.chartService.plotBandEvent.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotBandsMove.emit(_);
    });

    this.chartService.plotLineMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotLinesMove.emit(_);
    });

    this.chartService.pointMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.pointMove.emit(_);
    });

    this.chartService.chartClick.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.chartClick.emit(_);
    });

    this.chartService.chartContextMenu.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.chartContextMenu.emit(_);
    });

    this.chartService.plotBandClick.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotBandClick.emit(_);
    });

    this.chartService.plotBandContextMenu.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.plotBandContextMenu.emit(_);
    });

    this.chartService.annotationContextMenu.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.annotationContextMenu.emit(_);
    });

    this.chartService.annotationClick.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.annotationClick.emit(_);
    });

    this.chartService.annotationMove.pipe(takeWhile(() => this._alive)).subscribe((_) => {
      this.annotationMove.emit(_);
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
