import { BasePoint } from './base-point';

export interface BarPoint extends BasePoint {
  id: number;
  label: string;
  visible: boolean;
}
