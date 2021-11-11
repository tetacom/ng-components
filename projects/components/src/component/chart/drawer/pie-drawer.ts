import { IDrawer } from '../model/i-drawer';
import { BasePoint } from '../model/point/base-point';
import { Series } from '../model/series';
import * as d3 from 'd3';

export class PieDrawer implements IDrawer<BasePoint> {
  draw(
    series: Series<BasePoint>,
    context: d3.Selection<SVGElement, unknown, null, undefined>,
    scaleX: any,
    scaleY: any
  ): void {}
}
