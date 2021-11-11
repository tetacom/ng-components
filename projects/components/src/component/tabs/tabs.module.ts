import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabContentDirective} from './tab-content.directive';
import {TabTitleDirective} from './tab-title.directive';
import {TabComponent} from './tab/tab.component';
import {TabsComponent} from './tabs/tabs.component';

@NgModule({
  declarations: [
    TabContentDirective,
    TabTitleDirective,
    TabComponent,
    TabsComponent
  ],
  exports: [
    TabContentDirective,
    TabTitleDirective,
    TabComponent,
    TabsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TabsModule {
}
