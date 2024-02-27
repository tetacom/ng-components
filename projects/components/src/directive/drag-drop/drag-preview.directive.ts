import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[tetaDragPreview]',
    standalone: true
})
export class DragPreviewDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
