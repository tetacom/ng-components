import {
  // ContentChildren,
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  // QueryList,
} from '@angular/core';

import { DragSortEvent } from './drag-sort-event';

// import {DragSortItemDirective} from './drag-sort-item.directive';

@Directive({
    selector: '[tetaDragSortContainer]',
    standalone: true,
})
export class DragSortContainerDirective<T> {
  @Input() dragSortList: T[] = [];
  @Output() dragSorted: EventEmitter<DragSortEvent<T>> = new EventEmitter<
    DragSortEvent<T>
  >();

  private _dragItem!: T | null;

  @HostListener('drop', ['$event']) drop(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  setDragItem(item: T | null) {
    this._dragItem = item;
  }

  getDragItem(): T | null {
    return this._dragItem;
  }

  getList(): T[] {
    return this.dragSortList;
  }

  setList(list: T[]) {
    this.dragSortList = list;
  }

  updateSortOrder(source: T, target: T, insertBefore: boolean) {
    if (source === target) {
      return;
    }
    const list = this.getList();
    const sourceIndex = list.indexOf(source);
    const targetIndex = list.indexOf(target);
    if (
      (insertBefore && sourceIndex + 1 === targetIndex) ||
      (!insertBefore && sourceIndex === targetIndex + 1)
    ) {
      return;
    }
    const newIndex = list.indexOf(target) + (insertBefore ? 0 : 1);

    this.dragSorted.emit({
      list,
      source,
      target,
      newIndex,
      previousIndex: sourceIndex,
    });
  }
}
