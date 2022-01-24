import { DragPointType } from './enum/drag-point-type';
import { SvgAttributes } from './svg-attributes';

export interface MarkerOptions {
  draggable?: boolean;
  dragType: DragPointType;
  style?: SvgAttributes;
}
