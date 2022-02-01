import { Injectable } from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  Observable,
  Subject,
} from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';
import { IDisplayTooltip } from '../model/i-display-tooltip';
import { PlotBand } from '../model/plot-band';
import { PlotLine } from '../model/plot-line';
import { IPointMove } from '../model/i-point-move';
import { defaultChartConfig } from '../default/default-chart-config';
import { defaultAxisConfig } from '../default/default-axis-config';
import { defaultSeriesConfig } from '../default/default-series-config';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public config: Observable<IChartConfig>;
  public size: Observable<DOMRect>;
  public pointerMove: Observable<PointerEvent>;
  public tooltips: Observable<IDisplayTooltip>;
  public plotBandEvent: Observable<IChartEvent<PlotBand>>;
  public plotLineMove: Observable<IChartEvent<PlotLine>>;
  public plotBandClick: Observable<IChartEvent<PlotBand>>;
  public pointMove: Observable<IChartEvent<IPointMove>>;

  private config$ = new BehaviorSubject<IChartConfig>(defaultChartConfig);
  private size$ = new BehaviorSubject<DOMRect>(new DOMRectReadOnly());
  private pointerMove$ = new BehaviorSubject<PointerEvent>(null);
  private tooltips$ = new Subject<IDisplayTooltip>();
  private plotBandEvent$ = new Subject<IChartEvent<PlotBand>>();
  private plotLineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();

  constructor() {
    this.config = this.config$
      .asObservable()
      .pipe(map(this.setDefaults), map(this.setpreparationData));
    this.size = this.size$
      .asObservable()
      .pipe(filter((_) => _.height > 0 && _.width > 0));

    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();
    this.plotBandEvent = this.plotBandEvent$.asObservable();
    this.plotLineMove = this.plotLineMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();
    this.plotBandClick = this.plotBandEvent$
      .asObservable()
      .pipe(filter((_) => _?.event?.type === 'click'));
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
    this.plotBandEvent$.next(event);
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
    config = Object.assign({}, defaultChartConfig, config);
    config.xAxis = config.xAxis.map(defaultConfig(defaultAxisConfig));
    config.yAxis = config.yAxis.map(defaultConfig(defaultAxisConfig));
    config.series = config.series.map(defaultConfig(defaultSeriesConfig));
    return config;
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

    if (config.brush.enable) {
      config.yAxis = config.yAxis.map((_) => ({ ..._, zoom: false }));
      config.xAxis = config.xAxis.map((_) => ({ ..._, zoom: false }));
    }

    return config;
  }
}
