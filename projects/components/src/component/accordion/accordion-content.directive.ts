import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaAccordionContent]'
})
export class AccordionContentDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
