import {Injectable} from '@angular/core';
import {IChartConfig} from '../model/i-chart-config';
import {combineLatest, map, Observable, ReplaySubject, Subject} from 'rxjs';
import {ScaleService} from './scale.service';
import {IChartEvent} from '../model/i-chart-event';
import {IDisplayTooltip} from '../model/i-display-tooltip';
import {PlotBand} from '../model/plot-band';
import {PlotLine} from '../model/plot-line';
import {IPointMove} from '../model/i-point-move';
import {defaultConfig} from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public config: Observable<IChartConfig>;
  public size: Observable<DOMRect>;
  public pointerMove: Observable<any>;
  public tooltips: Observable<IDisplayTooltip>;
  public plotBandMove: Observable<IChartEvent<PlotBand>>;
  public plotLineMove: Observable<IChartEvent<PlotLine>>;
  public pointMove: Observable<IChartEvent<IPointMove>>;

  private config$ = new ReplaySubject<IChartConfig>(1);
  private size$ = new ReplaySubject<DOMRect>(1);
  private pointerMove$ = new Subject<any>();
  private tooltips$ = new Subject<IDisplayTooltip>();
  private plotBandMove$ = new Subject<IChartEvent<PlotBand>>();
  private plotLineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();

  private _config: IChartConfig;

  constructor(
    private scaleService: ScaleService
  ) {
    this.config = this.config$.asObservable().pipe(map(this.setDefaults));
    this.size = this.size$.asObservable();
    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();
    this.plotBandMove = this.plotBandMove$.asObservable();
    this.plotLineMove = this.plotLineMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();

    combineLatest([this.size, this.config])
      .pipe(
        map((data: [DOMRect, IChartConfig]) => {
          const [size, config] = data;
          this.scaleService.createScales(size);
          this.scaleService.createAxes(config);
        })
      )
      .subscribe();
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

    this.scaleService.createAxes(this._config);
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

  public setPointerMove(event: any) {
    this.pointerMove$.next({event});
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

    return  Object.assign(defaultConfig, config);
  }
}
