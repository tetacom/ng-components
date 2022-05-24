import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpandCardComponent} from './expand-card/expand-card.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';
import {DelimiterModule} from '../delimiter/delimiter.module';


@NgModule({
  declarations: [
    ExpandCardComponent
  ],
  exports: [
    ExpandCardComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    IconModule,
    DelimiterModule
  ]
})
export class ExpandCardModule {
}
