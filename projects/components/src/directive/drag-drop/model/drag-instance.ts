import {DragContainerInstance} from './drag-container-instance';

export class DragInstance<T> {
  container: DragContainerInstance<T>;
  data: T;

  constructor(options?: {
    container: DragContainerInstance<T>,
    data: T
  }) {
    this.container = options.container;
    this.data = options.data;
  }
}
