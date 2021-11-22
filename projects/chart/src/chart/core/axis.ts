import { IChartConfig } from '../model/i-chart-config';
import { AxisLocate } from '../model/enum/axis-locate';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import * as d3 from 'd3';
import { AxisOptions } from '../model/axis-options';

import { getTextWidth } from './utils/get-text-width';

export class Axis {
  private chartConfig: IChartConfig;
  private locate: AxisLocate;
  private _index: number | string;
  private _extremes: [number, number] = [0, 0];
  private _width: number;
  private _offset: number;

  constructor(config: IChartConfig) {
    this.chartConfig = config;
  }

  /**
   * Factory for creating x,y axes
   * @param {AxisLocate} locate
   * Axis type
   * @param {IChartConfig} config
   * Chart config
   * @param {number} index
   * Index axis
   * @return {Axis}
   * New generated axis
   */
  public static createAxis(
    locate: AxisLocate,
    config: IChartConfig,
    index: number
  ): Axis {
    const axis = new Axis(config);
    axis.setLocate(locate);
    axis.setIndex(index);
    return axis;
  }

  /**
   *
   * @param {locate} locate
   * Set locate axis x or y
   */
  private setLocate(locate: AxisLocate): void {
    this.locate = locate;
  }

  /**
   *
   * @param {number | string} index
   * Index axis
   */
  private setIndex(index: number | string): void {
    this._index = index;
  }

  /**
   * @return {Array<Series<BasePoint>>}
   * Linked series
   */
  public linkedSeries(): Array<Series<BasePoint>> {
    if (this.locate === AxisLocate.ordinatus) {
      const linkedFilter = (serie: Series<BasePoint>) =>
        serie.yAxisIndex === this._index;
      return this.chartConfig?.series.filter(linkedFilter);
    }

    if (this.locate === AxisLocate.abscissa) {
      const linkedFilter = (serie: Series<BasePoint>) =>
        serie.xAxisIndex === this._index;
      return this.chartConfig?.series.filter(linkedFilter);
    }
  }

  /**
   * @return
   * Get axis extremes
   */
  get extremes(): [number, number] {
    const options =
      this.chartConfig[
        this.locate === AxisLocate.ordinatus ? 'yAxis' : 'xAxis'
      ][this._index];

    const hasMin = options?.min != null;
    const hasMax = options?.max != null;

    if (!hasMin || !hasMax) {
      const linkedSeries = this.linkedSeries();

      const raw = linkedSeries.map((series: Series<BasePoint>) =>
        d3.extent(series?.data, (point: BasePoint) =>
          this.locate === AxisLocate.abscissa ? point.x : point.y
        )
      );

      const merged = [].concat(...(raw ?? []));

      const abs = (num) => Math.abs(num);

      this._extremes = options.negative
        ? [-Math.abs(d3.max(merged.map(abs))), d3.max(merged.map(abs))]
        : [d3.min(merged), d3.max(merged)];
    }

    if (hasMin) {
      this._extremes[0] = options?.min;
    }

    if (hasMax) {
      this._extremes[1] = options?.max;
    }
    const padding = 9;
    const axisWidth =
      padding + getTextWidth(this._extremes[1].toString(), 0.58);
    this.setWidth(axisWidth);

    const offset = this.calculateOffset();
    this.setOffset(offset);

    console.log(offset);

    return this._extremes;
  }

  private setWidth(width: number) {
    this._width = width;
  }

  private setOffset(offset: number) {
    this._offset = offset;
  }

  get width(): number {
    return this._width;
  }

  private getAxesByType(type: AxisLocate) {
    return type === AxisLocate.abscissa
      ? this.chartConfig.xAxis
      : this.chartConfig.yAxis;
  }

  get offset(): number {
    return this._offset;
  }

  private calculateOffset(): number {
    let oppositeCount = 0;
    let nonOppositeCount = 0;

    const axesList = this.getAxesByType(this.locate);

    for (let i = 0; i <= axesList.length - 1; i++) {
      if (axesList[i].visible) {
        if (axesList[i]?.opposite) {
          oppositeCount += 1;
        } else {
          nonOppositeCount += 1;
        }
      }

      if (i === this.index) {
        break;
      }
    }

    return this.options.opposite
      ? oppositeCount > 1
        ? this.width * (oppositeCount - 1)
        : 0
      : nonOppositeCount > 1
      ? this.width * (nonOppositeCount - 1)
      : 0;
  }

  get index() {
    return this._index;
  }

  get options(): AxisOptions {
    return this.locate === AxisLocate.abscissa
      ? this.chartConfig.xAxis[this.index]
      : this.chartConfig.yAxis[this.index];
  }
}
