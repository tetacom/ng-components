import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HintDirective} from './hint.directive';
import {DynamicComponentModule} from '../../component/dynamic-component/dynamic-component.module';

@NgModule({
  declarations: [HintDirective],
  exports: [HintDirective],
  imports: [
    CommonModule,
    DynamicComponentModule
  ]
})
export class HintModule {
}
