import { IChartConfig } from '../model/i-chart-config';
import { AxisOrientation } from '../model/enum/axis-orientation';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import * as d3 from 'd3';
import { AxisOptions } from '../model/axis-options';

import { getTextWidth } from './utils/get-text-width';

export class Axis {
  private chartConfig: IChartConfig;
  private locate: AxisOrientation;
  private _index: number | string;
  private _extremes: [number, number] = [0, 0];
  private _selfSize: number;
  private _offset: number;

  private _axisSizeMap: Map<AxisOrientation, () => number>;

  constructor(config: IChartConfig) {
    this.chartConfig = config;
    this._axisSizeMap = new Map<AxisOrientation, () => number>()
      .set(AxisOrientation.y, this.getYAxisSize)
      .set(AxisOrientation.x, this.getXAxisSize);
  }

  /**
   * Factory for creating x,y axes
   * @param {AxisOrientation} locate
   * Axis type
   * @param {IChartConfig} config
   * Chart config
   * @param {number} index
   * Index axis
   * @return {Axis}
   * New generated axis
   */
  public static createAxis(
    locate: AxisOrientation,
    config: IChartConfig,
    index: number
  ): Axis {
    const axis = new Axis(config);
    axis.setLocate(locate);
    axis.setIndex(index);
    axis.setExtremes();

    axis.setSelfSize();

    const offset = axis.calculateOffset();
    axis.setOffset(offset);
    return axis;
  }

  /**
   *
   * @param {locate} locate
   * Set locate axis x or y
   */
  private setLocate(locate: AxisOrientation): void {
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
    if (this.locate === AxisOrientation.y) {
      const linkedFilter = (serie: Series<BasePoint>) =>
        serie.yAxisIndex === this._index;
      return this.chartConfig?.series.filter(linkedFilter);
    }

    if (this.locate === AxisOrientation.x) {
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
    return this._extremes;
  }

  private setExtremes() {
    const options =
      this.chartConfig[this.locate === AxisOrientation.y ? 'yAxis' : 'xAxis'][
        this._index
      ];

    const hasMin = options?.min != null;
    const hasMax = options?.max != null;

    if (!hasMin || !hasMax) {
      const linkedSeries = this.linkedSeries();

      const raw = linkedSeries.map((series: Series<BasePoint>) =>
        d3.extent(series?.data, (point: BasePoint) =>
          this.locate === AxisOrientation.x ? point.x : point.y
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
  }

  private setSelfSize() {
    const axisSize = this._axisSizeMap.get(this.locate)();
    this._selfSize = axisSize;
  }

  private setOffset(offset: number) {
    this._offset = offset;
  }

  get selfSize(): number {
    return this._selfSize;
  }

  private getAxesByType(type: AxisOrientation) {
    return type === AxisOrientation.x
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

    return this.locate === AxisOrientation.y
      ? this.calcYOffset(oppositeCount, nonOppositeCount)
      : this.calcXOffset(oppositeCount, nonOppositeCount);
  }

  private calcYOffset(oppositeCount, nonOppositeCount) {
    return this.options.opposite
      ? this.selfSize * oppositeCount
      : this.selfSize * nonOppositeCount;
  }

  private calcXOffset(oppositeCount, nonOppositeCount) {
    return this.options.opposite
      ? this.selfSize * oppositeCount
      : this.selfSize * nonOppositeCount;
  }

  get index() {
    return this._index;
  }

  get options(): AxisOptions {
    return this.locate === AxisOrientation.x
      ? this.chartConfig.xAxis[this.index]
      : this.chartConfig.yAxis[this.index];
  }

  private getYAxisSize = () => {
    const padding = 16;

    const ticks = this.generateTicks(this._extremes);
    const maxElementLengthIndex = d3.maxIndex(
      ticks,
      (_) => _.toString().length
    );
    return padding + getTextWidth(ticks[maxElementLengthIndex], 0.58);
  };

  private getXAxisSize = () => {
    const padding = 16;
    return padding + 20;
  };

  private generateTicks(extremes: [number, number]) {
    const [min, max] = extremes;
    const step = (max - min) / 10;
    const ticks = d3.range(min, max + step, step);
    return ticks;
  }
}
