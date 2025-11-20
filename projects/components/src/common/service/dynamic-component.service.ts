import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  Type,
} from '@angular/core';

import { DynamicData } from '../contract/dynamic-data';
import { TetaContentRef } from '../contract/teta-content-ref';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  private _renderer: Renderer2;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _rendererFactory: RendererFactory2,
    private _appRef: ApplicationRef,
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  createComponent<T>(
    component: Type<T>,
    contentRef: TetaContentRef,
    injector: Injector,
    container: any,
  ): ComponentRef<T> {
    const componentRef = this._componentFactoryResolver
      .resolveComponentFactory(component)
      .create(injector, contentRef.nodes);
    this._appRef.attachView(componentRef.hostView);
    container.appendChild(componentRef.location.nativeElement);
    return componentRef;
  }

  createContent(
    content: string | TemplateRef<any> | Type<any> | null | undefined,
    injector: Injector,
    context?: any,
  ): TetaContentRef {
    if (content === null || content === undefined) {
      throw new Error('Content is undefined');
    }
    if (typeof content === 'string') {
      return this.fromString(content);
    } else if (content instanceof TemplateRef) {
      return this.fromTemplate(content, context);
    } else {
      return this.fromComponent(content, injector, context);
    }
  }

  destroy<T>(
    component: ComponentRef<T> | null | undefined,
    content: TetaContentRef | null,
    container: HTMLElement,
  ): void {
    if (component) {
      this._appRef.detachView(component.hostView);
      component.destroy();
    }
    if (content && content.viewRef) {
      content.viewRef.destroy();
    }
    content = null;
  }

  getContext(content: string | TemplateRef<any> | Type<any> | null | undefined, context: any): any {
    if (content instanceof TemplateRef) {
      return {
        $implicit: context,
        data: context,
      };
    }
    return context;
  }

  getInjector(data: DynamicData, parent: Injector): Injector {
    return Injector.create({
      providers: [
        {
          provide: DynamicData,
          useValue: data,
        },
      ],
      parent,
    });
  }

  private fromString(content: string): TetaContentRef {
    return new TetaContentRef([[this._renderer.createText(`${content}`)]]);
  }

  private fromTemplate(content: TemplateRef<any>, context: any): TetaContentRef {
    const viewRef = content.createEmbeddedView(context);
    this._appRef.attachView(viewRef);
    return new TetaContentRef([viewRef.rootNodes], viewRef);
  }

  private fromComponent(content: any, injector: Injector, context: any): TetaContentRef {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory<any>(content);
    const componentRef = componentFactory.create(injector);
    for (const key in context) {
      if (Object.prototype.hasOwnProperty.call(context, key)) {
        // componentRef.instance[key] = context[key];
        componentRef.setInput(key, context[key]);
      }
    }
    const componentNativeEl = componentRef.location.nativeElement;
    this._appRef.attachView(componentRef.hostView);
    return new TetaContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
  }
}
