import { IChartConfig } from '../../model/i-chart-config';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import * as d3 from 'd3';
import { AxisOptions } from '../../model/axis-options';
import { AxisSizeBuilder, ExtremesBuilder } from './builders/public-api';
import { AxisType } from '../../model/enum/axis-type';

import { generateTicks } from '../utils/public-api';

export class Axis {
  private chartConfig: IChartConfig;
  private _orientation: AxisOrientation;
  private _index: number | string;
  private _extremes: [number, number] = [0, 0];
  private _selfSize: number;
  private _ticksValues: number[];

  private defaultFormatters = new Map<AxisType, any>()
    .set(AxisType.number, d3.format(',.2f'))
    .set(AxisType.time, d3.timeFormat('%B %d, %Y'))
    .set(AxisType.log, d3.format(',.2f'));

  constructor(config: IChartConfig) {
    this.chartConfig = config;
  }

  /**
   * Factory for creating x,y axes
   * @param {AxisOrientation} orientation
   * Axis type
   * @param {IChartConfig} config
   * Chart config
   * @param {number} index
   * Index axis
   * @return {Axis}
   * New generated axis
   */
  public static createAxis(
    orientation: AxisOrientation,
    config: IChartConfig,
    index: number
  ): Axis {
    const axis = new Axis(config);
    axis.setLocate(orientation);
    axis.setIndex(index);
    axis.setExtremes();
    axis.setTicksValues();
    axis.setSelfSize();

    return axis;
  }

  /**
   *
   * @param {orientation} orientation
   * Set locate axis x or y
   */
  private setLocate(orientation: AxisOrientation): void {
    this._orientation = orientation;
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
    const linkedFilter = (serie: Series<BasePoint>) =>
      serie[
        this._orientation === AxisOrientation.y ? 'yAxisIndex' : 'xAxisIndex'
      ] === this._index;

    return this.chartConfig?.series.filter(linkedFilter);
  }

  private setExtremes(): void {
    const builder = new ExtremesBuilder();
    this._extremes = builder.build(this, this.chartConfig?.inverted);

    this._extremes = d3.nice(this._extremes[0], this._extremes[1], 10);
  }

  private setSelfSize(): void {
    const builder = new AxisSizeBuilder();
    this._selfSize = builder.build(this);
  }

  private setTicksValues(): void {
    const ticks = generateTicks(this._extremes);
    this._ticksValues = ticks;
  }

  get extremes(): Array<number> {
    return this._extremes;
  }

  get orientation(): AxisOrientation {
    return this._orientation;
  }

  get selfSize(): number {
    return this._selfSize;
  }

  get tickValues(): number[] {
    return this._ticksValues;
  }

  get index() {
    return this._index;
  }

  get options(): AxisOptions {
    return this.orientation === AxisOrientation.x
      ? this.chartConfig.xAxis[this.index]
      : this.chartConfig.yAxis[this.index];
  }

  public defaultFormatter() {
    return this.defaultFormatters.get(this.options.type);
  }
}
