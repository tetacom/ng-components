import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragContainerDirective} from './drag-container.directive';
import {DragDirective} from './drag.directive';
import {DragPreviewDirective} from './drag-preview.directive';
import {DragPlaceholderDirective} from './drag-placeholder.directive';

@NgModule({
  declarations: [
    DragContainerDirective,
    DragDirective,
    DragPreviewDirective,
    DragPlaceholderDirective
  ],
  exports: [
    DragContainerDirective,
    DragDirective,
    DragPreviewDirective,
    DragPlaceholderDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DragDropModule {
}
