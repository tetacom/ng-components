import { TableColumn } from './table-column';

export class ColumnReorderEvent {
  source: TableColumn;
  target: TableColumn;

  constructor(source: TableColumn, target: TableColumn) {
    this.source = source;
    this.target = target;
  }
}
