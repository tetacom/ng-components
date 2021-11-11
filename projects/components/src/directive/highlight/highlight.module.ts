import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightDirective} from './highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective],
  imports: [
    CommonModule
  ]
})
export class HighlightModule {
}
