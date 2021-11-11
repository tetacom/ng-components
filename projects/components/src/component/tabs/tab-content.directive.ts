import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaTabContent]'
})
export class TabContentDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
