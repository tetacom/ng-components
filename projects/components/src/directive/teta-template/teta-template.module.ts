import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TetaTemplateDirective} from './teta-template.directive';


@NgModule({
  declarations: [
    TetaTemplateDirective
  ],
  exports: [
    TetaTemplateDirective
  ],
  imports: [
    CommonModule
  ]
})
export class TetaTemplateModule {
}
