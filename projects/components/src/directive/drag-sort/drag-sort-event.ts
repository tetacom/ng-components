export interface DragSortEvent<T> {
  previousIndex: number;
  newIndex: number;
  source: T;
  target: T;
  list: T[];
}
