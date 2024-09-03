import { TemplateRef, ViewContainerRef } from '@angular/core';

export class DragContainerInstance<T> {
  data: T[];
  previewTemplate: TemplateRef<any>;
  viewContainer: ViewContainerRef;

  constructor(options: { data: T[]; previewTemplate: TemplateRef<any>; viewContainer: ViewContainerRef }) {
    this.data = options.data;
    this.previewTemplate = options.previewTemplate;
    this.viewContainer = options.viewContainer;
  }
}
