export class TableContextMenuConfig {
  contextMenu = true;
  copy = true;
  delete = true;
  add = true;

  constructor(options?: {
    contextMenu?: boolean;
    copy?: boolean;
    delete?: boolean;
    add?: boolean;
  }) {
    if (options) {
      this.contextMenu = options?.contextMenu;
      this.copy = options?.copy;
      this.delete = options?.delete;
      this.add = options?.add;
    }
  }
}
