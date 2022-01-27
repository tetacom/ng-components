import {Injectable} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import {IChartEvent} from '../model/i-chart-event';
import {IDisplayTooltip} from '../model/i-display-tooltip';
import {PlotBand} from '../model/plot-band';
import {PlotLine} from '../model/plot-line';
import {IPointMove} from '../model/i-point-move';
import {defaultChartConfig} from '../default/default-chart-config';


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
  private pointerMove$ = new Subject<PointerEvent>();
  private tooltips$ = new Subject<IDisplayTooltip>();
  private plotBandMove$ = new Subject<IChartEvent<PlotBand>>();
  private plotLineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();

  private _config: IChartConfig;

  constructor() {
    this.config = this.config$.asObservable().pipe(map(this.setDefaults));
    this.size = this.size$.asObservable();
    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();
    this.plotBandMove = this.plotBandMove$.asObservable();
    this.plotLineMove = this.plotLineMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();
  }

  public init(config: IChartConfig) {
    this._config = config;

    if (config.inverted) {
      this._config.series = this._config?.series?.map((serie) => {
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

    // this.scaleService.createAxes(this._config);
  }

  public setConfig(config: IChartConfig) {
    this.config$.next(config);
  }

  public setSize(size: DOMRect) {
    this.size$.next({
      x: size.x,
      top: size.top,
      width: size.width,
      height: size.height
    } as any);
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

  // get config(): IChartConfig {
  //   return this._config;
  // }

  private setDefaults(config: IChartConfig): IChartConfig {
    config?.series?.forEach((_) => {
      if (_.xAxisIndex === null || _.xAxisIndex === undefined) {
        _.xAxisIndex = 0;
      }
      if (_.yAxisIndex === null || _.yAxisIndex === undefined) {
        _.yAxisIndex = 0;
      }
    });

    return Object.assign(defaultChartConfig, config);
  }
}
