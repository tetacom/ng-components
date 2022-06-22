import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoPositionDirective} from './auto-position.directive';

@NgModule({
  declarations: [
    AutoPositionDirective
  ],
  exports: [
    AutoPositionDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AutoPositionModule {
}
