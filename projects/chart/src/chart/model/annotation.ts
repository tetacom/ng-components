import {BasePoint} from './base-point';
import {SvgAttributes} from './svg-attributes';
import {TemplateRef} from '@angular/core';

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
    hint?: string;
  };
  style?: SvgAttributes;
  data?: any;
  template?: TemplateRef<any>;
}
