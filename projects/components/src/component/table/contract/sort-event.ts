import {TableColumn} from './table-column';

export class SortEvent {
  column: TableColumn;
  shiftKey: boolean;

  constructor(column: TableColumn, shiftKey: boolean) {
    this.column = column;
    this.shiftKey = shiftKey;
  }
}
