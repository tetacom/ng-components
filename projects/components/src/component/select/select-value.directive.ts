import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaSelectValue]',
  standalone: true,
})
export class SelectValueDirective {
  constructor(public template: TemplateRef<any>) {}
}
