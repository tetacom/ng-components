import { Injectable } from '@angular/core';
import { IChartConfig } from './model/i-chart-config';
import { AxesService } from './axes.service';
import { map, Observable, Subject } from 'rxjs';
import { ScaleService } from './scale.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public size: Observable<DOMRect>;
  private _config: IChartConfig;
  private size$ = new Subject<DOMRect>();

  constructor(
    private axesService: AxesService,
    private scaleService: ScaleService
  ) {
    this.size = this.size$.asObservable();

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
}
