import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LetDirective} from './let.directive';

@NgModule({
  declarations: [
    LetDirective
  ], exports: [
    LetDirective
  ],
  imports: [
    CommonModule
  ]
})
export class LetModule {
}
