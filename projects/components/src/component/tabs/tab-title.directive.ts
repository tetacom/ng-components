import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[tetaTabTitle]',
    standalone: true
})
export class TabTitleDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
