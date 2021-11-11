import * as hash from 'object-hash';

export class TableRow<T> {
  set edit(value: boolean) {
    if (value !== this._edit) {
      this._edit = value;
      this._hash = null;
    }
  }

  get edit(): boolean {
    return this._edit;
  }

  expanded = false;
  showDetails = false;
  data: T;
  isGroup: boolean;
  level: number;
  path: any[] = [];
  groupColumn: string;
  groupValue: any[] = [];

  // children: GridRow<T>[] = [];
  // parents: GridRow<T>[];
  // private backup: any = {};
  private _edit = false;
  private _hash: string | null;

  constructor(data?: any) {
    if (data) {
      this.data = data;
    }
  }

  public get hash(): string {
    if (!this._hash) {
      const hashObj: any = { ...this.data };
      if (hashObj.children) {
        delete hashObj.children;
      }
      this._hash = hash.sha1(hashObj);
    }
    return this._hash;
  }

  public editData(items?: any): void {
    this.data = items;
    this._hash = null;
  }
}
