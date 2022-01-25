import { Injectable } from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { AxesService } from './axes.service';
import { map, Observable, Subject } from 'rxjs';
import { ScaleService } from './scale.service';
import { IChartEvent } from '../model/i-chart-event';
import { IDisplayTooltip } from '../model/i-display-tooltip';
import { Plotband } from '../model/plotband';
import { PlotLine } from '../model/plotline';
import { IPointMove } from '../model/i-point-move';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public size: Observable<DOMRect>;
  public pointerMove: Observable<any>;
  public tooltips: Observable<IDisplayTooltip>;
  public plotbandMove: Observable<IChartEvent<Plotband>>;
  public plotlineMove: Observable<IChartEvent<PlotLine>>;
  public pointMove: Observable<IChartEvent<IPointMove>>;

  private size$ = new Subject<DOMRect>();
  private pointerMove$ = new Subject<any>();
  private tooltips$ = new Subject<IDisplayTooltip>();
  private plotbandMove$ = new Subject<IChartEvent<Plotband>>();
  private plotlineMove$ = new Subject<IChartEvent<PlotLine>>();
  private pointMove$ = new Subject<IChartEvent<IPointMove>>();

  private _config: IChartConfig;

  constructor(
    private axesService: AxesService,
    private scaleService: ScaleService
  ) {
    this.size = this.size$.asObservable();
    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();
    this.plotbandMove = this.plotbandMove$.asObservable();
    this.plotlineMove = this.plotlineMove$.asObservable();
    this.pointMove = this.pointMove$.asObservable();

    this.size
      .pipe(
        map((size) => {
          this.scaleService.createScales(size, this._config);
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

    this.axesService.init(this._config);
  }

  public setSize(size: DOMRect) {
    this.size$.next(size);
  }

  public setPointerMove(event: any) {
    this.pointerMove$.next({ event });
  }

  public setTooltip(tooltip: IDisplayTooltip) {
    this.tooltips$.next(tooltip);
  }

  public emitPlotband(event: IChartEvent<Plotband>) {
    this.plotbandMove$.next(event);
  }

  public emitPlotline(event: IChartEvent<PlotLine>) {
    this.plotlineMove$.next(event);
  }

  public emitPoint(event: IChartEvent<IPointMove>) {
    this.pointMove$.next(event);
  }

  get config(): IChartConfig {
    return this._config;
  }
}