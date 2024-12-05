import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { map, Observable, ReplaySubject, shareReplay } from 'rxjs';

import { Axes3dMinMax } from '../model/axes-3d-min-max';
import { I3dChartConfig } from '../model/i-3d-chart-config';

@Injectable({
  providedIn: 'root',
})
export class Chart3dService {
  public minMax: Observable<Axes3dMinMax>;
  public data: Observable<I3dChartConfig>;
  public scales: Observable<{ x; y; z }>;
  private data$: ReplaySubject<I3dChartConfig> = new ReplaySubject<I3dChartConfig>(1);

  constructor() {
    this.data = this.data$.asObservable();
    this.minMax = this.data.pipe(
      map((_) => {
        return this.getAxesMinMax(_);
      }),
    );
    this.scales = this.minMax.pipe(
      map((minMax) => {
        return this.getScales(minMax);
      }),
      shareReplay(1),
    );
  }

  setData(data) {
    this.data$.next(data);
  }

  private getAxesMinMax(data: I3dChartConfig): Axes3dMinMax {
    const zArr: number[] = data.series
      .map((_) => {
        return _?.data?.map((d) => d?.z);
      })
      .flat()
      .filter((_) => {
        return _ !== null && _ !== undefined;
      });
    const xArr: number[] = data.series
      .map((_) => {
        return _?.data?.map((d) => d?.x);
      })
      .flat()
      .filter((_) => {
        return _ !== null && _ !== undefined;
      });
    const yArr: number[] = data.series
      .map((_) => {
        return _?.data?.map((d) => d?.y);
      })
      .flat()
      .filter((_) => {
        return _ !== null && _ !== undefined;
      });
    const ZMinMaxVal: [number, number] = [Math.min(...zArr), Math.max(...zArr)];
    const XMinMaxVal: [number, number] = [Math.min(...xArr), Math.max(...xArr)];
    const YMinMaxVal: [number, number] = [Math.min(...yArr), Math.max(...yArr)];
    return {
      z: this.getMinMaxRange(ZMinMaxVal, data.zAxis?.min, data.zAxis?.max),
      x: this.getMinMaxRange(XMinMaxVal, data.xAxis?.min, data.xAxis?.max),
      y: this.getMinMaxRange(YMinMaxVal, data.yAxis?.min, data.yAxis?.max),
    };
  }

  private getMinMaxRange(minMax: [number, number], axisMin: number, axisMax: number): [number, number] {
    const min =
      axisMin || (Math.abs(minMax[0] - minMax[1]) < 0.0000001 ? minMax[0] - Math.abs(minMax[0] - 1) * 0.1 : minMax[0]);
    const max =
      axisMax || (Math.abs(minMax[0] - minMax[1]) < 0.0000001 ? minMax[1] + Math.abs(minMax[1] + 1) * 0.1 : minMax[1]);
    return [min, max];
  }

  private getScales(axesMinMax: Axes3dMinMax) {
    const z = d3.scaleLinear().domain(axesMinMax.z).range([50, -50]);
    const x = d3.scaleLinear().domain(axesMinMax.x).range([25, 0]);
    const y = d3.scaleLinear().domain(axesMinMax.y).range([50, -50]);
    return {
      x,
      y,
      z,
    };
  }
}
