import { Injectable } from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { AxesService } from './axes.service';
import { map, Observable, Subject } from 'rxjs';
import { ScaleService } from './scale.service';
import { IChartEvent } from '../model/i-chart-event';
import * as d3 from 'd3';
import { IDisplayTooltip } from '../model/i-display-tooltip';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public size: Observable<DOMRect>;
  public pointerMove: Observable<IChartEvent<any>>;
  public tooltips: Observable<IDisplayTooltip>;
  public sync: d3.Dispatch<any>;

  private _config: IChartConfig;
  private size$ = new Subject<DOMRect>();
  private pointerMove$ = new Subject<IChartEvent<any>>();
  private tooltips$ = new Subject<IDisplayTooltip>();

  constructor(
    private axesService: AxesService,
    private scaleService: ScaleService
  ) {
    this.size = this.size$.asObservable();
    this.pointerMove = this.pointerMove$.asObservable();
    this.tooltips = this.tooltips$.asObservable();

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

  public setPointerMove(event: IChartEvent<any>) {
    this.pointerMove$.next({ event });
  }

  public setTooltip(tooltip: IDisplayTooltip) {
    this.tooltips$.next(tooltip);
  }

  get config(): IChartConfig {
    return this._config;
  }
}
