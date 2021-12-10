import { DragPointType } from '../enum/drag-point-type';

export interface MarkerOptions {
  draggable?: boolean;
  dragType: DragPointType;
  style?: {
    radius?: number;
    stroke?: number;
    strokeWidth?: number;
    color?: string;
  };
}
