export class TableColumnStore {
  width: number;
  flex: number;
  locked: boolean;
  name: string;
  columns: TableColumnStore[];

  constructor(options?: {
    width?: number;
    flex?: number;
    sortOrder?: number;
    locked?: boolean;
    name?: string;
    columns?: any[];
  }) {
    if (options) {
      this.width = options?.width;
      this.flex = options?.flex;
      this.locked = options?.locked;
      this.name = options?.name;
      this.columns = options?.columns?.map((x) => new TableColumnStore(x));
    }
  }
}
