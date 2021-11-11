import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaExpandPanelContent]',
})
export class ExpandPanelContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
