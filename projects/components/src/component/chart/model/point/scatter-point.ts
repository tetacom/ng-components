import { BasePoint } from './base-point';

export interface ScatterPoint extends BasePoint {
  radius: number;
  value: number;
}
