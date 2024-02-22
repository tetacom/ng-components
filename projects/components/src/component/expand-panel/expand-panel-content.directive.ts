import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[tetaExpandPanelContent]',
    standalone: true,
})
export class ExpandPanelContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
