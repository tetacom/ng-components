import { IChartConfig } from '../../model/i-chart-config';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import * as d3 from 'd3';
import { AxisOptions } from '../../model/axis-options';
import { AxisSizeBuilder, ExtremesBuilder } from './builders/public-api';
import { generateTicks } from '../utils/public-api';
import { ScaleType } from '../../model/enum/scale-type';

export class Axis {
  private chartConfig: IChartConfig;
  private _orientation: AxisOrientation;
  private _index: number;
  private _extremes: [number, number] = [0, 0];
  private _selfSize: number;
  private _ticksValues: number[];
  private _options: AxisOptions;
  private _isFake: boolean;

  private defaultFormatters = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.format(',.2f'))
    .set(ScaleType.time, d3.timeFormat('%d.%m.%Y'))
    .set(ScaleType.log, d3.format(',.2f'))
    .set(ScaleType.pow, d3.format(',.2f'))
    .set(ScaleType.sqrt, d3.format(',.2f'));

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
   * @param {boolean} isFake
   * @return {Axis}
   * New generated axis
   */
  public static createAxis(
    orientation: AxisOrientation,
    config: IChartConfig,
    index: number,
    isFake = false
  ): Axis {
    const axis = new Axis(config);
    axis.setLocate(orientation);
    axis.setIndex(index);

    axis.setOptions();
    axis.setExtremes();
    axis.setTicksValues();
    axis.setSelfSize();

    axis._isFake = isFake;

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
   * @param {number} index
   * Index axis
   */
  private setIndex(index: number): void {
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
    this._extremes = builder.build(this);
  }

  private setSelfSize(): void {
    this._selfSize = new AxisSizeBuilder().build(this);
  }

  private setTicksValues(): void {
    this._ticksValues = generateTicks(this._extremes);
  }

  private setOptions(): void {
    const options =
      this.orientation === AxisOrientation.x
        ? this.chartConfig.xAxis[this.index]
        : this.chartConfig.yAxis[this.index];

    this._options = options;
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

  get index(): number {
    return this._index;
  }

  get options(): AxisOptions {
    return this._options;
  }

  get isFake(): boolean {
    return this._isFake;
  }

  public defaultFormatter() {
    return this.defaultFormatters.get(this.options.scaleType.type);
  }
}
