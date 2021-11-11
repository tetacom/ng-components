import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaExpandPanelHead]',
})
export class ExpandPanelHeadDirective {
  constructor(public template: TemplateRef<any>) {}
}
