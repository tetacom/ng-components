import { AxisType } from './enum/axis-type';
import { Plotband } from './plotband';
import { PlotLine } from './plotline';

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
  plotbands?: Plotband[];
  plotlines?: PlotLine[];
}
