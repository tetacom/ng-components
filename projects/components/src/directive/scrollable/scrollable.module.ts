import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollableDirective} from './scrollable.directive';
import {ScrollableComponent} from './scrollable/scrollable.component';
import {LetModule} from "../let/let.module";

@NgModule({
  declarations: [
    ScrollableDirective,
    ScrollableComponent,
  ],
  exports: [
    ScrollableDirective,
    ScrollableComponent,
  ],
  imports: [
    CommonModule,
    LetModule
  ]
})
export class ScrollableModule {
}
