import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaSelectOption]'
})
export class SelectOptionDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
