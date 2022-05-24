import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[tetaDragPreview]'
})
export class DragPreviewDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
