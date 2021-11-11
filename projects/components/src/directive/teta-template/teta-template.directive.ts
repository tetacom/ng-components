import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaTemplate]'
})
export class TetaTemplateDirective {
  @Input('tetaTemplate') id: string;

  constructor(public template: TemplateRef<any>) {
  }

  getId(): string {
    return this.id;
  }
}
