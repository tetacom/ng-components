import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[tetaTabContent]',
    standalone: true
})
export class TabContentDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
