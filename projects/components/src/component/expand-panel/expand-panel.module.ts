import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandPanelComponent } from './expand-panel/expand-panel.component';
import { DelimiterModule } from '../delimiter/delimiter.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ExpandPanelHeadDirective } from './expand-panel-head.directive';
import { ExpandPanelContentDirective } from './expand-panel-content.directive';

@NgModule({
  declarations: [
    ExpandPanelComponent,
    ExpandPanelHeadDirective,
    ExpandPanelContentDirective,
  ],
  exports: [
    ExpandPanelComponent,
    ExpandPanelHeadDirective,
    ExpandPanelContentDirective,
  ],
  imports: [
    CommonModule,
    DelimiterModule,
    ToolbarModule,
    ButtonModule,
    IconModule,
  ],
})
export class ExpandPanelModule {}
