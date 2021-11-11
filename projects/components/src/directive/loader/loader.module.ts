import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderDirective} from './loader.directive';

@NgModule({
  declarations: [LoaderDirective],
  exports: [LoaderDirective],
  imports: [
    CommonModule
  ]
})
export class LoaderModule {
}
