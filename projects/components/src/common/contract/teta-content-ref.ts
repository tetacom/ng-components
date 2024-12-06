import { ComponentRef, ViewRef } from '@angular/core';

export class TetaContentRef {
  constructor(
    public nodes: any[],
    public viewRef?: ViewRef,
    public componentRef?: ComponentRef<any>,
  ) {}
}
