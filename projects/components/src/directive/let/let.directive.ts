import {Directive, Inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[tetaLet]',
  standalone:true
})
export class LetDirective<T> {
  @Input()
  tetaLet!: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>,
  ) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }

  static ngTemplateContextGuard<T>(
    _dir: LetDirective<T>,
    _ctx: any,
  ): _ctx is LetDirective<Exclude<T, null | undefined>> {
    return true;
  }
}

export class LetContext<T> implements ContextWithImplicit<T> {
  constructor(private readonly internalDirectiveInstance: LetDirective<T>) {
  }

  get $implicit(): T {
    return this.internalDirectiveInstance.tetaLet;
  }

  get tetaLet(): T {
    return this.internalDirectiveInstance.tetaLet;
  }
}

export interface ContextWithImplicit<T> {
  $implicit: T;
}
