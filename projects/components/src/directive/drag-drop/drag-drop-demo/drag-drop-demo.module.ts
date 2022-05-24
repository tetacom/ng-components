import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropDemoComponent} from './drag-drop-demo/drag-drop-demo.component';
import {DragDropModule} from '../drag-drop.module';

@NgModule({
  declarations: [
    DragDropDemoComponent
  ],
  exports: [
    DragDropDemoComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ]
})
export class DragDropDemoModule {
}
