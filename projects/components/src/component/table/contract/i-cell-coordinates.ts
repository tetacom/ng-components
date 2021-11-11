import {TableRow} from './table-row';
import {TableColumn} from './table-column';

export interface ICellCoordinates<T> {
  row: TableRow<T>;
  column: TableColumn;
}

