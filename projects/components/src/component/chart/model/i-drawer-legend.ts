import { Series } from './series';
import { BasePoint } from './point/base-point';

export interface LegendDrawOptions<T extends BasePoint> {
  context: HTMLElement;
  series: Series<T>[];
  columns?: number;
  width?: number;
  height?: number;
}

export interface ILegendDrawer {
  draw(options: LegendDrawOptions<BasePoint>): void;
}
