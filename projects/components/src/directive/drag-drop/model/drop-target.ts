import { DragInstance } from './drag-instance';
import { DragContainerInstance } from './drag-container-instance';

export type DropTarget<T> = DragInstance<T> | DragContainerInstance<T>;
