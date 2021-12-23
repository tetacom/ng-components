import { DragPointType } from '../enum/drag-point-type';

export interface MarkerOptions {
  draggable?: boolean;
  dragType: DragPointType;
  style?: {
    radius?: number;
    stroke?: string;
    strokeWidth?: number;
    color?: string;
  };
}
