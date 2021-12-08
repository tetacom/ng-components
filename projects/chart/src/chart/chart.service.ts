import { Injectable } from '@angular/core';
import { IChartConfig } from './model/i-chart-config';
import { AxesService } from './axes.service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ScaleService } from './scale.service';
import { IPointer } from './model/i-pointer';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public size: Observable<DOMRect>;
  public pointerMove: Observable<IPointer>;
  public tooltips: Observable<any>;

  private _config: IChartConfig;
  private size$ = new Subject<DOMRect>();
  private pointerMove$ = new BehaviorSubject<IPointer>({ event: null });
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

  public setPointerMove(event: IPointer) {
    this.pointerMove$.next({ event });
  }

  public setTooltip(tooltip: any) {
    this.tooltips$.next(tooltip);
  }
}
