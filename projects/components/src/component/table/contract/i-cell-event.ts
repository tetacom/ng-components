import {ICellCoordinates} from './i-cell-coordinates';

export interface ICellEvent extends ICellCoordinates {
  event: Event;
}
