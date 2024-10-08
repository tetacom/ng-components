import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaPropertyGridItemDescription]',
  standalone: true,
})
export class PropertyGridItemDescriptionDirective {
  @Input('tetaPropertyGridItemDescription') name: string;

  constructor(public template: TemplateRef<any>) {}
}
