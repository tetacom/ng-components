export class TableRow<T> {
  valid: boolean;
  data: T;

  constructor(options?: { valid?: boolean; data: T }) {
    this.valid = options?.valid;
    this.data = options?.data;
  }
}
