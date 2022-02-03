import { PlotBand } from './plot-band';
import { PlotLine } from './plot-line';
import { ScaleType } from './enum/scale-type';

export interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
  scaleType?: {
    type?: ScaleType;
    base?: number;
  };
  visible?: boolean;
  tickFormat?: (d: any) => string;
  zoom?: boolean;
  inverted?: boolean;
  opposite?: boolean;
  niceTicks?: boolean;
  plotBands?: PlotBand[];
  plotLines?: PlotLine[];
}
