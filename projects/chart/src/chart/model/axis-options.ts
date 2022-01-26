import {AxisType} from './enum/axis-type';
import {PlotBand} from './plot-band';
import {PlotLine} from './plot-line';

export interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
  visible?: boolean;
  tickFormat?: (d: any) => string;
  type?: AxisType;
  zoom?: boolean;
  inverted?: boolean;
  negative?: boolean;
  opposite?: boolean;
  plotBands?: PlotBand[];
  plotLines?: PlotLine[];
}
