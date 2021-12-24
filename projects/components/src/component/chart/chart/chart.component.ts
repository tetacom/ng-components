import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';
import { map, takeWhile, throttleTime } from 'rxjs/operators';
import { TetaChart } from '../core/chart';
import { ChartOptions } from '../model/chart-options';
import { BasePoint } from '../model/point/base-point';
import { Series } from '../model/series';
import { PlotLine } from '../model/plot-line';
import { PlotBand } from '../model/plot-band';
import { IDragEvent } from '../model/i-drag-event';
import { IZoomEvent } from '../model/i-zoom-event';
import { SeriesType } from '../model/enum/series-type';
import { BarPoint } from '../model/point/bar-point';

@Component({
  selector: 'teta-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() zoom: IZoomEvent;

  @Input() config: ChartOptions;

  @Output()
  plotLinesMove: EventEmitter<IDragEvent<PlotLine>> = new EventEmitter<
    IDragEvent<PlotLine>
  >();
  @Output()
  plotBandsMove: EventEmitter<IDragEvent<PlotBand>> = new EventEmitter<
    IDragEvent<PlotBand>
  >();

  @Output()
  seriesMove: EventEmitter<IDragEvent<Series<BasePoint>>> = new EventEmitter<
    IDragEvent<Series<BasePoint>>
  >();

  @Output()
  pointMove: EventEmitter<IDragEvent<Series<BasePoint>>> = new EventEmitter<
    IDragEvent<Series<BasePoint>>
  >();

  @Output()
  zoomChange: EventEmitter<IZoomEvent> = new EventEmitter<IZoomEvent>();

  @ViewChild('chart', {
    static: true,
  })
  chart: ElementRef;
  hasSeriesData: boolean;

  private _config: ChartOptions;
  private _alive = true;
  private size$ = new Subject<any>();
  private _observer: ResizeObserver;
  private _chart: TetaChart;
  private _zoom: IZoomEvent;

  constructor(private _zone: NgZone) {}

  @HostListener('click', ['$event']) click(event: any): void {
    const composedPath = event.composedPath();
    const triggerToken = 'legend';

    const isLegend = composedPath.some((_) =>
      _.classList?.contains(triggerToken)
    );

    if (isLegend) {
      const clickedElement: any = event.target?.__data__;

      if (!clickedElement) {
        return;
      }

      const serieIndex = this._config?.series?.indexOf(clickedElement);

      if (clickedElement.serieType === SeriesType.bar) {
        const foundSerie = this._config.series[clickedElement.serieIndex];

        this._config.series[foundSerie.id].data = this._config.series[
          foundSerie.id
        ].data.map((_: BasePoint & BarPoint) => {
          if (clickedElement.id === _.id) {
            return {
              ..._,
              visible: !_.visible,
            };
          }

          return _;
        });

        this.redraw(this._config);
      }

      if (serieIndex !== -1) {
        const foundSerie = this._config.series[serieIndex];

        const yAxisIndex = foundSerie?.yAxisIndex;

        this._config.series[serieIndex].visible = !foundSerie.visible;

        const attachedYAxes = this._config.series
          ?.filter((_) => _.visible)
          .map((_) => _.yAxisIndex);

        const shouldVisibleYAxis = attachedYAxes?.includes(yAxisIndex);

        this._config.yAxis[yAxisIndex].visible = shouldVisibleYAxis;
        this.redraw(this._config);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.config && changes.hasOwnProperty('config')) {
      this.setConfig(this.config);

      if (this.zoom) {
        this._chart?.setZoom(this.zoom);
      }
    }

    if (this.zoom && changes.hasOwnProperty('zoom')) {
      this._chart?.setZoom(this.zoom);
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._observer = new ResizeObserver((entries) => {
      const { contentRect } = entries[0];
      this.size$.next(contentRect);
    });

    this._observer.observe(this.chart.nativeElement);

    this.size$
      .pipe(throttleTime(100, undefined, { trailing: true }))
      .pipe(
        takeWhile((_) => this._alive),
        map((_) => {
          this.resize(_);
          this.redraw(this._config);
        })
      )
      .subscribe();
  }

  get showLegend(): boolean {
    return this._config?.legend?.visible;
  }

  ngOnDestroy() {
    this._alive = false;
    this._observer?.unobserve(this.chart.nativeElement);
  }

  private redraw(config: any) {
    if (config) {
      this._chart.redraw(config);
    }
  }

  private resize(contentRect: any) {
    const { width, height } = contentRect;
    this._chart.setSize({
      width,
      height,
    });
  }

  private setConfig(config: ChartOptions) {
    if (config) {
      this._config = config;
      this.hasSeriesData = !!this._config?.series?.some((_) => _.data.length);

      if (!this._chart) {
        this._chart = new TetaChart(this._config, this.chart);

        this._chart.plotLinesMove
          .pipe(takeWhile((_) => this._alive))
          .subscribe((_) => this.plotLinesMove.emit(_));

        this._chart.plotBandsMove
          .pipe(takeWhile((_) => this._alive))
          .subscribe((_) => this.plotBandsMove.emit(_));

        this._chart.seriesMove
          .pipe(takeWhile((_) => this._alive))
          .subscribe((_) => this.seriesMove.emit(_));

        this._chart.pointMove
          .pipe(takeWhile((_) => this._alive))
          .subscribe((_) => {
            this.pointMove.emit(_);
          });

        this._chart.zoom
          .pipe(
            takeWhile((_) => this._alive),
            map((_) => {
              this.zoomChange.emit(_);
            })
          )
          .subscribe();
      }

      if (this.chart) {
        if (this.hasSeriesData) {
          if (!this._zoom || this._zoom?.event?.type === 'end') {
            this.redraw(this._config);
          }
        }
      }
    }
  }
}
