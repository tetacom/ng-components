import {DragPointType} from './enum/drag-point-type';
import {SvgAttributes} from './svg-attributes';

export interface DragObjectOptions {
  draggable?: boolean;
  dragType?: DragPointType;
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
}

export interface LabelOptions extends DragObjectOptions {
  style?: SvgAttributes;
  text?: string;
  dx?: number;
  dy?: number;
}

export interface MarkerOptions extends DragObjectOptions {
  style?: SvgAttributes;
  label?: LabelOptions;
}
