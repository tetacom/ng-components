import { ICellCoordinates } from './i-cell-coordinates';

export interface ICellValue<T> {
  cell: ICellCoordinates<T>;
  value: any;
}
