import {BasePoint} from "./base-point";

export interface ConstructionPoint<T> extends BasePoint {
  meta: T
}
