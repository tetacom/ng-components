import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizePanelComponent } from './resize-panel/resize-panel.component';
import { IconModule } from '../icon/icon.module';
import { ResizeDragModule } from '../../directive/resize-drag/resize-drag.module';

@NgModule({
  declarations: [ResizePanelComponent],
  exports: [ResizePanelComponent],
  imports: [CommonModule, IconModule, ResizeDragModule],
})
export class ResizePanelModule {}
