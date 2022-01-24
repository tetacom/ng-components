export interface IDragEvent<T> {
  [key: string]: any;
  event: DragEvent;
  target: T;
}
