import { ICellCoordinates } from './i-cell-coordinates';

export interface ICellEvent<T> extends ICellCoordinates<T> {
  event: Event;
}
