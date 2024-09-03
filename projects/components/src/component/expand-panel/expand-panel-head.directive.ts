import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaExpandPanelHead]',
  standalone: true,
})
export class ExpandPanelHeadDirective {
  constructor(public template: TemplateRef<any>) {}
}
