import { Base3dPoint } from './base-3d-point';

export class Series3d<T extends Base3dPoint> {
  name?: string;
  color?: string;
  points: T[];

  constructor(options?: { name?: string; color?: string; points: T[] }) {
    this.name = options?.name;
    this.color = options?.color;
    this.points = options?.points || [];
  }
}
