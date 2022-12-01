import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpandCardComponent} from './expand-card/expand-card.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';
import {DelimiterModule} from '../delimiter/delimiter.module';
import {ExpandItemComponent} from './expand-item/expand-item.component';


@NgModule({
  declarations: [
    ExpandCardComponent,
    ExpandItemComponent
  ],
  exports: [
    ExpandCardComponent,
    ExpandItemComponent
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
