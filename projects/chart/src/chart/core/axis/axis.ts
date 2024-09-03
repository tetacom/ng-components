import { IChartConfig } from '../../model/i-chart-config';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import * as d3 from 'd3';
import { AxisOptions } from '../../model/axis-options';
import { AxisSizeBuilder, ExtremesBuilder } from './builders/public-api';
import { ScaleType } from '../../model/enum/scale-type';

export class Axis {
  private chartConfig: IChartConfig;
  private _orientation: AxisOrientation;
  private _index: number;
  private _extremes: number[] | string[] = [0, 0];
  private _selfSize: number;
  private _ticksValues: number[];
  private _options: AxisOptions;
  private _originDomain: [number, number] = [0, 0];

  private _scale: any;

  private defaultFormatters = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.format(',.5~r'))
    .set(ScaleType.time, d3.timeFormat('%d.%m.%Y'))
    .set(ScaleType.log, d3.format('~s'))
    .set(ScaleType.symlog, d3.format('~s'))
    .set(ScaleType.pow, d3.format('~s'))
    .set(ScaleType.sqrt, d3.format('~s'))
    .set(ScaleType.band, (_) => {
      return _;
    });

  private defaultScales = new Map<ScaleType, any>()
    .set(ScaleType.linear, d3.scaleLinear)
    .set(ScaleType.log, d3.scaleLog)
    .set(ScaleType.symlog, d3.scaleSymlog)
    .set(ScaleType.pow, d3.scalePow)
    .set(ScaleType.sqrt, d3.scaleSqrt)
    .set(ScaleType.time, d3.scaleTime)
    .set(ScaleType.band, d3.scaleBand);

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
   * New generated axis
   */
  public static createAxis(orientation: AxisOrientation, config: IChartConfig, index: number): Axis {
    const axis = new Axis(config);
    axis.setLocate(orientation);
    axis.setIndex(index);

    axis.setOptions();
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
      serie[this._orientation === AxisOrientation.y ? 'yAxisIndex' : 'xAxisIndex'] === this._index;

    return this.chartConfig?.series.filter(linkedFilter);
  }

  public setExtremes(): void {
    const builder = new ExtremesBuilder();
    this._extremes = builder.build(this);
  }

  public setOriginDomain(domain: [number, number]) {
    this._originDomain = domain;
  }

  public setScale(scale: any) {
    this._scale = scale;

    if (this.options.scaleType.type === ScaleType.band) {
      this._scale.ticks = () => {
        return this._scale.domain();
      };
    }
  }

  private setSelfSize(): void {
    this._selfSize = new AxisSizeBuilder().build(this);
  }

  private setTicksValues(): void {
    //this._ticksValues = generateTicks(this._extremes);
  }

  private setOptions(): void {
    const options =
      this.orientation === AxisOrientation.x ? this.chartConfig.xAxis[this.index] : this.chartConfig.yAxis[this.index];

    this._options = options;
  }

  get scale(): any {
    return this._scale;
  }

  get extremes(): Array<number | string> {
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

  get originDomain(): [number, number] {
    return this._originDomain;
  }

  public defaultFormatter() {
    return this.defaultFormatters.get(this.options.scaleType.type);
  }

  public defaultScale() {
    return this.defaultScales.get(this.options.scaleType.type);
  }
}
