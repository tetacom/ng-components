export class TableRow<T> {
  valid: boolean;
  row: T;

  constructor(options?:{
    valid?: boolean,
    row: T
  }) {
    this.valid = options?.valid;
    this.row = options?.row
  }
}
