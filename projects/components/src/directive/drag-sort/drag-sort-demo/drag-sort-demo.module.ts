import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragSortDemoComponent} from './drag-sort-demo/drag-sort-demo.component';
import {DragSortModule} from '../drag-sort.module';

@NgModule({
  declarations: [
    DragSortDemoComponent
  ],
  exports: [
    DragSortDemoComponent
  ],
  imports: [
    CommonModule,
    DragSortModule
  ]
})
export class DragSortDemoModule {
}
