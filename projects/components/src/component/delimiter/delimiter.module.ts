import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DelimiterComponent} from './delimiter/delimiter.component';

@NgModule({
  declarations: [DelimiterComponent],
  exports: [DelimiterComponent],
  imports: [
    CommonModule
  ]
})
export class DelimiterModule {
}
