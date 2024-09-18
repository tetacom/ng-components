import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaSelectOption]',
  standalone: true,
})
export class SelectOptionDirective {
  constructor(public template: TemplateRef<any>) {}
}
