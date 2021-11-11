import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeDragDirective } from './resize-drag.directive';

@NgModule({
  declarations: [ResizeDragDirective],
  exports: [ResizeDragDirective],
  imports: [CommonModule],
})
export class ResizeDragModule {}
