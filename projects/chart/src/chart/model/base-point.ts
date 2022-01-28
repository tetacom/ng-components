import { MarkerOptions } from './marker-options';

export interface BasePoint {
  x: number;
  x1?: number;
  y: number;
  y1?: number;
  color?: number;
  marker?: MarkerOptions;
}
