import { Directive, Optional, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tetaDropdownHead]',
  standalone: true,
})
export class DropdownHeadDirective {
  constructor(@Optional() public template: TemplateRef<any>) {}
}
