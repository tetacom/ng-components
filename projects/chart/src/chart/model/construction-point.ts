import { BasePoint } from './base-point';

export interface ConstructionPoint extends BasePoint {
  meta: { [key: string]: any };
}
