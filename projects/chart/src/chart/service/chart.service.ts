import { Injectable } from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { BehaviorSubject, map, Observable, shareReplay, Subject } from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';
import { IDisplayTooltip } from '../model/i-display-tooltip';
import { PlotBand } from '../model/plot-band';
import { PlotLine } from '../model/plot-line';
import { IPointMove } from '../model/i-point-move';
import { defaultChartConfig } from '../default/default-chart-config';
import { defaultAxisConfig } from '../default/default-axis-config';
import { defaultSeriesConfig } from '../default/default-series-config';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public config: Observable<IChartConfig>;
  public size: Observable<DOMRect>;
  public pointerMove: Observable<PointerEvent>;
  public tooltips: Observable<IDisplayTooltip>;
  public plotBandMove: Observable<IChartEvent<PlotBand>>;
  public plotLineMove: Observable<IChartEvent<PlotLine>>;
  public pointMove: Observable<IChartEvent<IPointMove>>;

  private config$ = new BehaviorSubject<IChartConfig>(defaultChartConfig);
  private size$ = new BehaviorSubject<DOMRect>(new DOMRectReadOnly());
  private pointerMove$ = new BehaviorSubject<PointerEvent>(null);
  private tooltips$ = new Subject<IDisplayTooltip>();
  private plotBandMove$ = new Subject<IChartEvent<PlotBand>>();
  private plotLineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();

  private _config: IChartConfig;

  constructor() {
    this.config = this.config$
      .asObservable()
      .pipe(map(this.setDefaults), map(this.setpreparationData));
    this.size = this.size$.asObservable();
    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();
    this.plotBandMove = this.plotBandMove$.asObservable();
    this.plotLineMove = this.plotLineMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();
  }

  public setConfig(config: IChartConfig) {
    this.config$.next(config);
  }

  public setSize(size: DOMRect) {
    this.size$.next(size);
  }

  public setPointerMove(event: PointerEvent) {
    this.pointerMove$.next(event);
  }

  public setTooltip(tooltip: IDisplayTooltip) {
    this.tooltips$.next(tooltip);
  }

  public emitPlotband(event: IChartEvent<PlotBand>) {
    this.plotBandMove$.next(event);
  }

  public emitPlotline(event: IChartEvent<PlotLine>) {
    this.plotLineMove$.next(event);
  }

  public emitPoint(event: IChartEvent<IPointMove>) {
    this.pointMove$.next(event);
  }

  private setDefaults(config: IChartConfig): IChartConfig {
    const defaultConfig = (defaultConfig) => {
      return (source) => {
        return Object.assign({}, defaultConfig, source);
      };
    };

    config.xAxis = config.xAxis.map(defaultConfig(defaultAxisConfig));
    config.yAxis = config.yAxis.map(defaultConfig(defaultAxisConfig));
    config.series = config.series.map(defaultConfig(defaultSeriesConfig));

    return Object.assign({}, defaultChartConfig, config);
  }

  private setpreparationData(config: IChartConfig): IChartConfig {
    if (config.inverted) {
      config.series = config.series?.map((serie) => {
        return {
          ...serie,
          data: serie?.data?.map((point) => {
            return {
              ...point,
              x: point?.y,
              y: point?.x,
            };
          }),
        };
      });
    }

    return config;
  }
}
