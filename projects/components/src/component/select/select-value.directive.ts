import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaSelectValue]'
})
export class SelectValueDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
