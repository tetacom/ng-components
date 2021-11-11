import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextMenuDirective} from './context-menu.directive';
import {DynamicComponentModule} from '../../component/dynamic-component/dynamic-component.module';

@NgModule({
  declarations: [ContextMenuDirective],
  exports: [ContextMenuDirective],
  imports: [
    CommonModule,
    DynamicComponentModule
  ]
})
export class ContextMenuModule {
}
