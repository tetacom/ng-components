import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion/accordion.component';
import {AccordionHeadComponent} from './accordion-head/accordion-head.component';
import {AccordionContentDirective} from './accordion-content.directive';
import {IconModule} from '../icon/icon.module';
import {AccordionItemComponent} from './accordion-item/accordion-item.component';

@NgModule({
  declarations: [AccordionComponent, AccordionHeadComponent, AccordionContentDirective, AccordionItemComponent],
  exports: [AccordionComponent, AccordionHeadComponent, AccordionContentDirective, AccordionItemComponent],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class AccordionModule {
}
