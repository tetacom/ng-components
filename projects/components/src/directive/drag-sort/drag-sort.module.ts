import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragSortContainerDirective } from './drag-sort-container.directive';
import { DragSortItemDirective } from './drag-sort-item.directive';

@NgModule({
  declarations: [DragSortContainerDirective, DragSortItemDirective],
  exports: [DragSortContainerDirective, DragSortItemDirective],
  imports: [CommonModule],
})
export class DragSortModule {}
