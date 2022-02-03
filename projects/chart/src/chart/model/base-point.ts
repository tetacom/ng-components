import { MarkerOptions } from './marker-options';

export interface BasePoint {
  x: number;
  x1?: number;
  y: number;
  y1?: number;
  iconId?: string;
  color?: number;
  marker?: MarkerOptions;
}
