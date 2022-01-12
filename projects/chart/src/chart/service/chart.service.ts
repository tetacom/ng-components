import { Injectable } from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { AxesService } from './axes.service';
import { map, Observable, Subject } from 'rxjs';
import { ScaleService } from './scale.service';
import { IChartEvent } from '../model/i-chart-event';
import * as d3 from 'd3';
import { BroadcastService } from './broadcast.service';
import { ZoomService } from './zoom.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public size: Observable<DOMRect>;
  public pointerMove: Observable<IChartEvent<any>>;
  public tooltips: Observable<any>;
  public sync: d3.Dispatch<any>;

  private _config: IChartConfig;
  private size$ = new Subject<DOMRect>();
  private pointerMove$ = new Subject<IChartEvent<any>>();
  private tooltips$ = new Subject<any>();

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
          this.scaleService.createScales(size);
        })
      )
      .subscribe();
  }

  public init(config: IChartConfig) {
    this._config = config;
    this.axesService.init(this._config);
  }

  public setSize(size: DOMRect) {
    this.size$.next(size);
  }

  public setPointerMove(event: IChartEvent<any>) {
    this.pointerMove$.next({ event });
  }

  public setTooltip(tooltip: any) {
    this.tooltips$.next(tooltip);
  }

  get config(): IChartConfig {
    return this._config;
  }
}
