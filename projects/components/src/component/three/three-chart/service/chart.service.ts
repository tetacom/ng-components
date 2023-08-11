import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, shareReplay } from 'rxjs';
import { I3dChartConfig } from '../model/i-3d-chart-config';
import { Axes3dMinMax } from '../model/axes-3d-min-max';
import * as d3 from 'd3';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public minMax: Observable<Axes3dMinMax>;
  public data: Observable<I3dChartConfig>;
  public scales: Observable<{ x; y; z }>;
  private minMax$: ReplaySubject<Axes3dMinMax> =
    new ReplaySubject<Axes3dMinMax>(1);
  private data$: ReplaySubject<I3dChartConfig> =
    new ReplaySubject<I3dChartConfig>(1);
  constructor() {
    this.data = this.data$.asObservable();
    this.minMax = this.minMax$.asObservable();
    this.data
      .pipe(
        tap((_) => {
          this.minMax$.next(this.getAxesMinMax(_));
        })
      )
      .subscribe();

    this.scales = this.minMax.pipe(
      map((minMax) => {
        return this.getScales(minMax);
      }),
      shareReplay(1)
    );
  }
  setData(data) {
    this.data$.next(data);
  }
  getAxesMinMax(data: I3dChartConfig): Axes3dMinMax {
    const zArr: number[] = data.series
      .map((_) => {
        return _.data.map((d) => d.z);
      })
      .flat();
    const xArr: number[] = data.series
      .map((_) => {
        return _.data.map((d) => d.x);
      })
      .flat();
    const yArr: number[] = data.series
      .map((_) => {
        return _.data.map((d) => d.y);
      })
      .flat();

    return {
      z: [
        data.zAxis?.min || Math.min(...zArr),
        data.zAxis?.max || Math.max(...zArr),
      ],
      x: [
        data.xAxis?.min || Math.min(...xArr),
        data.xAxis?.max || Math.max(...xArr),
      ],
      y: [
        data.yAxis?.min || Math.min(...yArr),
        data.yAxis?.max || Math.max(...yArr),
      ],
    };
  }
  getScales(axesMinMax: Axes3dMinMax) {
    const z = d3.scaleLinear().domain(axesMinMax.z).range([0, 100]);
    const x = d3.scaleLinear().domain(axesMinMax.x).range([0, 25]);
    const y = d3.scaleLinear().domain(axesMinMax.y).range([0, 100]);
    return {
      x,
      y,
      z,
    };
  }
}
