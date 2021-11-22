import { AxisType } from './axis-type';

export interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
  visible: boolean;
  tickFormat?: (d: any) => string;
  type?: AxisType;
  zoom?: boolean;
  inverted?: boolean;
  negative?: boolean;
  opposite?: boolean;
}
