import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollIntoViewDirective} from './scroll-into-view.directive';

@NgModule({
  declarations: [
    ScrollIntoViewDirective
  ], exports: [
    ScrollIntoViewDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ScrollIntoViewModule {
}
