import { DragContainerInstance } from './drag-container-instance';
import { DragInstance } from './drag-instance';

export interface DragSelection<T> {
  container: DragContainerInstance<T>;
  items: DragInstance<T>[];
}
