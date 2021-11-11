import { TableColumn } from './table-column';

export class ColumnResizeEvent {
  column: TableColumn;
  newWidth: number;

  constructor(column: TableColumn, newWidth: number) {
    this.column = column;
    this.newWidth = newWidth;
  }
}
