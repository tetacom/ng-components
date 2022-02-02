import * as d3 from 'd3';
import {AxisType} from '../model/enum/axis-type';
import {Series} from '../model/series';
import {BasePoint} from '../model/point/base-point';
import {ChartOptions} from '../model/chart-options';
import {AxisOptions} from '../model/axis-options';

export class Axis {
  public static offsetFactor = 22;
  public readonly width: number;

  private _type: AxisType;
  private _chartOptions: ChartOptions;
  private _extents: [number, number] = [0, 0];
  private _index: number;
  private _height: number;
  private _offset: number;
  private _ticks: any;

  constructor(options: {
    type: AxisType;
    index: number;
    chartOptions: ChartOptions;
    height?: number;
  }) {
    this._type = options?.type;
    this._index = options?.index || 0;
    this._chartOptions = options?.chartOptions;
    this._height = options?.height;

    if (this._chartOptions == null) {
      throw new Error(`No chartOptions for axis ${AxisType[this._type]}`);
    }

    this.createExtents();
    this.width = this.calculateAxisWidth();
  }

  get index() {
    return this._index;
  }

  get options(): AxisOptions {
    return this._type === AxisType.abscissa
      ? this._chartOptions.xAxis[this.index]
      : this._chartOptions.yAxis[this.index];
  }

  get extent(): [number, number] {
    return this._extents;
  }

  get type(): AxisType {
    return this._type;
  }

  get offset(): number {
    return this._offset;
  }

  get ticks() {
    return this._ticks;
  }

  setOffset(offset: number) {
    this._offset = offset;
  }

  private calculateAxisWidth(): number {
    if (this.type === AxisType.abscissa) {
      return 0;
    }

    const y = d3
      .scaleLinear()
      .domain([this.extent[0], this.extent[1]])
      .range([0, this._height])
      .nice();

    const body = d3
      .select('body')
      .append('svg')
      .attr('class', 'calculate-offset')
      .style('position', 'absolute')
      .style('left', '-9999px');
    const axis = d3.axisRight(y).tickValues(this.ticks);
    const element = body.append('g').attr('class', 'font-caption').call(axis);

    const bBox = element.node().getBBox();

    d3.selectAll('.calculate-offset').remove();

    return bBox.width;
  }

  private createExtents() {
    const hasMin = this.options?.min != null;
    const hasMax = this.options?.max != null;

    if (!hasMin || !hasMax) {
      const filtered = this._chartOptions?.series?.filter(
        (serie: Series<BasePoint>) =>
          this._index ===
          serie[this._type === AxisType.abscissa ? 'xAxisIndex' : 'yAxisIndex']
      );

      const raw = filtered.map((series: Series<BasePoint>) =>
        d3.extent(series?.data, (point: BasePoint) =>
          this._type === AxisType.abscissa ? point.x : point.y
        )
      );

      const merged = [].concat(...(raw ?? []));

      const abs = (num) => Math.abs(num);

      this._extents = this.options.negative
        ? [-Math.abs(d3.max(merged.map(abs))), d3.max(merged.map(abs))]
        : [d3.min(merged), d3.max(merged)];
    }

    if (hasMin) {
      this._extents[0] = this.options?.min;
    }

    if (hasMax) {
      this._extents[1] = this.options?.max;
    }
  }
}
