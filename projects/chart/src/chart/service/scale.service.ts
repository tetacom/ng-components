import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {AxisType} from '../model/enum/axis-type';
import {Axis} from '../core/axis/axis';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {IChartConfig} from '../model/i-chart-config';
import {ChartService} from './chart.service';
import {combineLatest, map, Observable, withLatestFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  public yAxisMap: Observable<Map<number, Axis>>;
  public xAxisMap: Observable<Map<number, Axis>>;

  public yScaleMap: Observable<Map<number | string, any>>;
  public xScaleMap: Observable<Map<number | string, any>>;

  private scaleMapping = new Map<AxisType, any>()
    .set(AxisType.number, d3.scaleLinear)
    .set(AxisType.time, d3.scaleTime)
    .set(AxisType.category, d3.scaleOrdinal)
    .set(AxisType.log, d3.scaleLog);

  constructor(private readonly chartService: ChartService) {
    this.xAxisMap = combineLatest([this.chartService.size, this.chartService.config]).pipe(
      map((data: [DOMRectReadOnly, IChartConfig]) => {
        const [, config] = data;
        const map = new Map<number, Axis>();
        config.xAxis.map((_, index) => {
          map.set(index, Axis.createAxis(AxisOrientation.x, config, index));
        });
        return map;
      })
    );
    this.yAxisMap = combineLatest([this.chartService.size, this.chartService.config]).pipe(
      map((data: [DOMRectReadOnly, IChartConfig]) => {
        const [, config] = data;
        const map = new Map<number, Axis>();
        config.yAxis.map((_, index) => {
          map.set(index, Axis.createAxis(AxisOrientation.y, config, index));
        });
        return map;
      })
    );

    this.xScaleMap = combineLatest([this.chartService.size, this.chartService.config]).pipe(
      withLatestFrom(this.xAxisMap),
      map((data: [[DOMRectReadOnly, IChartConfig], any]) => {
        const [[size, _], xAxes] = data;
        const map = new Map<number, any>();
        const topBound = [...xAxes.values()]
          .filter((_) => _.options?.visible && _.options?.opposite)
          .reduce((acc, cur) => acc + cur.selfSize, 0);
        const bottomBound = [...xAxes.values()]
          .filter((_) => _.options?.visible && _.options?.opposite !== true)
          .reduce((acc, cur) => acc + cur.selfSize, 0);
        const finalWidth = (size.width || 0) - topBound - bottomBound;
        xAxes.forEach((axis) => {
          const scale = this.scaleMapping
            .get(axis.options.type)()
            .domain(
              axis.orientation === AxisOrientation.y
                ? [...axis.extremes].reverse()
                : axis.extremes
            ).range([0, finalWidth]);
          map.set(axis.index, scale);
        });
        return map;
      })
    );
    this.yScaleMap = combineLatest([this.chartService.size, this.chartService.config]).pipe(
      withLatestFrom(this.yAxisMap),
      map((data: [[DOMRectReadOnly, IChartConfig], any]) => {
        const [[size, _], yAxes] = data;
        const map = new Map<number, any>();
        const topBound = [...yAxes.values()]
          .filter((_) => _.options?.visible && _.options?.opposite)
          .reduce((acc, cur) => acc + cur.selfSize, 0);
        const bottomBound = [...yAxes.values()]
          .filter((_) => _.options?.visible && _.options?.opposite !== true)
          .reduce((acc, cur) => acc + cur.selfSize, 0);
        const finalWidth = (size.height || 0) - topBound - bottomBound;
        yAxes.forEach((axis) => {
          const scale = this.scaleMapping
            .get(axis.options.type)()
            .domain(
              axis.orientation === AxisOrientation.y
                ? [...axis.extremes].reverse()
                : axis.extremes
            ).range([0, finalWidth]);
          map.set(axis.index, scale);
        });
        return map;
      })
    );
  }

  // public createScales(size: DOMRect) {
  //   this.yScaleMap.clear();
  //   this.xScaleMap.clear();
  //
  //   const topBound = [...this.xAxisMap.values()]
  //     .filter((_) => _.options?.visible && _.options?.opposite)
  //     .reduce((acc, cur) => acc + cur.selfSize, 0);
  //
  //   const bottomBound = [...this.xAxisMap.values()]
  //     .filter((_) => _.options?.visible && _.options?.opposite !== true)
  //     .reduce((acc, cur) => acc + cur.selfSize, 0);
  //
  //   const leftBound = [...this.yAxisMap.values()]
  //     .filter((_) => _.options?.visible && _.options.opposite !== true)
  //     .reduce((acc, cur) => acc + cur.selfSize, 0);
  //
  //   const rightBound = [...this.yAxisMap.values()]
  //     .filter((_) => _.options?.visible && _.options.opposite)
  //     .reduce((acc, cur) => acc + cur.selfSize, 0);
  //
  //   this.yAxisMap.forEach((axis: Axis) => {
  //     const scale = this.getScale(axis).range([
  //       0,
  //       size.height - topBound - bottomBound,
  //     ]);
  //
  //     this.yScaleMap.set(axis.index, scale);
  //   });
  //
  //   this.xAxisMap.forEach((axis: Axis) => {
  //     const scale = this.getScale(axis).range([
  //       0,
  //       size.width - leftBound - rightBound,
  //     ]);
  //
  //     this.xScaleMap.set(axis.index, scale);
  //   });
  // }
  //
  // createAxes(config: IChartConfig) {
  //   config?.yAxis.forEach((_, index) => {
  //     const axis = Axis.createAxis(AxisOrientation.y, config, index);
  //     this.yAxisMap.set(index, axis);
  //   });
  //
  //   config?.xAxis.forEach((_, index) => {
  //     const axis = Axis.createAxis(AxisOrientation.x, config, index);
  //     this.xAxisMap.set(index, axis);
  //   });
  // }

  // private getScale(axis: Axis) {
  //   return this.scaleMapping
  //     .get(axis.options?.type)()
  //     .domain(
  //       axis.orientation === AxisOrientation.y
  //         ? [...axis.extremes].reverse()
  //         : axis.extremes
  //     );
  // }
}
