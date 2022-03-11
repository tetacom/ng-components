import {BasePoint} from './base-point';
import {SvgAttributes} from './svg-attributes';

export interface Annotation {
  id?: number | string;
  point: BasePoint;
  draggable?: boolean;
  yAxisIndex?: number;
  xAxisIndex?: number;
  dx?: number;
  dy?: number;
  className?: string;
  note?: {
    label?: string;
    title?: string;
  };
  style?: SvgAttributes;
  data?: any;
}
