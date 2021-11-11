import {Directive, Optional, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaDropdownHead]'
})
export class DropdownHeadDirective {
  constructor(@Optional() public template: TemplateRef<any>) {
  }
}
