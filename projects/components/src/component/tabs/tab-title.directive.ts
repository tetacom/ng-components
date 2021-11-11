import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaTabTitle]'
})
export class TabTitleDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
