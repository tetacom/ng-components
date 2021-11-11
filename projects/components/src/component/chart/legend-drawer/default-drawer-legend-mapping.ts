import { ILegendDrawer } from '../model/i-drawer-legend';
import { LegendType } from '../model/enum/legend-type';
import { SwatchDrawer } from './swatch-drawer';
import { GradientDrawer } from './gradient-drawer';

export const defaultLegendDrawerMapping = new Map<LegendType, ILegendDrawer>()
  .set(LegendType.swatches, new SwatchDrawer())
  .set(LegendType.gradient, new GradientDrawer());
