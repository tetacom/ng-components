import {DropTarget} from './drop-target';
import {DragInstance} from './drag-instance';
import {DragContainerInstance} from './drag-container-instance';

export interface DropEvent<T> {
  container: DragContainerInstance<T>,
  target: DropTarget<T>,
  data: DragInstance<T>[]
}
