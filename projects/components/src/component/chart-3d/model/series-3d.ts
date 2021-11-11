import { Base3dPoint } from './base-3d-point';

export class Series3d<T extends Base3dPoint> {
  color?: string;
  points: T[];

  constructor(options?: { color?: string; points: T[] }) {
    this.color = options?.color;
    this.points = options?.points || [];
  }
}
