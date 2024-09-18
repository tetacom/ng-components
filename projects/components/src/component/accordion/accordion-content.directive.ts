import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaAccordionContent]',
  standalone: true,
})
export class AccordionContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
