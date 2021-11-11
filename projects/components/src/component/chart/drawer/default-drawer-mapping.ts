import { SeriesType } from '../model/enum/series-type';
import { IDrawer } from '../model/i-drawer';
import { BasePoint } from '../model/point/base-point';
import { AreaDrawer } from './area-drawer';
import { BarDrawer } from './bar-drawer';
import { LineDrawer } from './line-drawer';
import { PieDrawer } from './pie-drawer';
import { SplineDrawer } from './spline-drawer';
import { ScatterDrawer } from './scatter-drawer';
import { ContourDrawer } from './contour-drawer';

export const defaultDrawerMapping = new Map<SeriesType, IDrawer<BasePoint>>()
  .set(SeriesType.area, new AreaDrawer())
  .set(SeriesType.bar, new BarDrawer())
  .set(SeriesType.line, new LineDrawer())
  .set(SeriesType.pie, new PieDrawer())
  .set(SeriesType.scatter, new ScatterDrawer())
  .set(SeriesType.spline, new SplineDrawer())
  .set(SeriesType.contour, new ContourDrawer());
