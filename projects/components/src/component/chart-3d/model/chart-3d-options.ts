import { Base3dPoint } from './base-3d-point';
import { Series3d } from './series-3d';

export class Chart3dOptions {
  axes?: {
    min?: number;
    max?: number;
  };

  series: Series3d<Base3dPoint>[];

  constructor(options?: Chart3dOptions) {
    this.axes = { ...options?.axes };
    this.series = options?.series || [];
  }
}
