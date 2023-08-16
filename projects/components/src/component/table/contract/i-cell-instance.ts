import { TableColumn } from './table-column';
import { TableRow } from './table-row';

export interface ICellInstance<T> {
  row: TableRow<T>;
  column: TableColumn;
}

export interface ICellInstanceEvent<T> extends ICellInstance<T> {
  event: Event;
}

export interface ICellInstanceValue<T> extends ICellInstance<T> {
  value: any;
}
