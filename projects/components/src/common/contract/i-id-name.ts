export interface IIdName<T> {
  [key: string]: any;
  id: T;
  name: string;
  parentId?: T;
}
