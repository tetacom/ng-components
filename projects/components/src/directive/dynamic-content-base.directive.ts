import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  Output,
  TemplateRef,
  Type,
} from '@angular/core';
import { filter, takeWhile } from 'rxjs/operators';

import { TetaContentRef } from '../common/contract/teta-content-ref';
import { Align } from '../common/enum/align.enum';
import { VerticalAlign } from '../common/enum/vertical-align.enum';
import { DynamicComponentService } from '../common/service/dynamic-component.service';
import { PopupContentComponent } from '../component/dynamic-component/popup-content/popup-content.component';
import { DOCUMENT } from '@angular/common';

@Directive()
export abstract class DynamicContentBaseDirective implements OnDestroy {
  protected _document = inject(DOCUMENT);
  protected _elementRef = inject(ElementRef);
  protected _service = inject(DynamicComponentService);
  protected _injector = inject(Injector);
  protected _zone = inject(NgZone);
  protected _cdr = inject(ChangeDetectorRef);

  @Input() data: any;
  @Input() className?: string | string[];
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() appendToBody = false;

  @Input() set open(open: boolean) {
    this._open = open;
    if (this._open) {
      this.createContentRef();
    } else {
      this.destroyContentRef();
    }
  }

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected _alive = true;
  protected _componentRef?: ComponentRef<any> | null;
  protected _content?: TetaContentRef;
  protected _open = false;

  protected abstract get _dynamicContent(): string | TemplateRef<any> | Type<any> | null | undefined;

  protected constructor() {
    this._zone.onStable
      .pipe(
        takeWhile((_) => this._alive),
        filter((_) => this._open),
      )
      .subscribe((_) => {
        this.setPosition();
      });
  }

  ngOnDestroy(): void {
    this._alive = false;
    this.destroyContentRef();
  }

  protected createContentRef<T>(className?: string | string[]): ComponentRef<T> {
    if (!this._componentRef) {
      this._open = true;
      const injector = this._service.getInjector(this.data, this._injector);
      const context = this._service.getContext(this._dynamicContent, this.data);
      this._content = this._service.createContent(this._dynamicContent, this._injector, context);
      this._componentRef = this._service.createComponent(
        PopupContentComponent,
        this._content,
        injector,
        this.appendToBody ? this._document.body : this._elementRef.nativeElement,
      );
      if (className) {
        this._componentRef.instance.addClass(className);
      }
    }
    return this._componentRef;
  }

  protected destroyContentRef(): void {
    this._open = false;
    this._service.destroy(
      this._componentRef,
      this._content,
      this.appendToBody ? this._document.body : this._elementRef.nativeElement,
    );
    this._componentRef = null;
  }

  protected abstract setPosition(): void;
}
