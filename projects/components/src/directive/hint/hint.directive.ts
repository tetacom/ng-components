import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  TemplateRef,
  Type,
} from '@angular/core';
import {DynamicContentBaseDirective} from '../dynamic-content-base.directive';
import {DOCUMENT} from '@angular/common';
import {DynamicComponentService} from '../../common/service/dynamic-component.service';
import {PositionUtil} from '../../common/util/position-util';
import {ArrayUtil} from '../../common/util/array-util';
import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';
import {DomUtil} from '../../common/util/dom-util';
import Timeout = NodeJS.Timeout;

@Directive({
  selector: '[tetaHint]',
})
export class HintDirective
  extends DynamicContentBaseDirective
  implements OnDestroy {
  /**
   * Строка, шаблон или компонент для создания контекстного меню
   */
  @Input() tetaHint: string | TemplateRef<any> | Type<any>;
  @Input() override align: Align = Align.center;
  @Input() override verticalAlign: VerticalAlign = VerticalAlign.top;
  @Input() delay = 300;

  get _dynamicContent() {
    return this.tetaHint;
  }

  private _timeout: Timeout;
  private _componentRect: any;

  constructor(
    @Inject(DOCUMENT)
    protected override _document: any,
    protected override _elementRef: ElementRef,
    protected override _service: DynamicComponentService,
    protected override _injector: Injector,
    protected override _zone: NgZone,
    protected override _cdr: ChangeDetectorRef
  ) {
    super(_document, _elementRef, _service, _injector, _zone, _cdr);
  }

  @HostListener('mouseenter', ['$event'])
  mouseenter(): void {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.createHint();
    }, this.delay);
  }

  @HostListener('mouseleave', ['$event'])
  mouseleave(): void {
    clearTimeout(this._timeout);
    if (this._open && this._componentRef) {
      this._timeout = setTimeout(() => {
        this.destroyContentRef();
      }, this.delay);
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    if (
      this._open &&
      this._componentRef &&
      DomUtil.clickedInside(this._componentRef.location.nativeElement, event)
    ) {
      event.stopPropagation();
    }
  }

  protected setPosition() {
    if (this._componentRef && this._open) {
      if (!this._componentRect) {
        this._componentRect =
          this._componentRef.location.nativeElement.getBoundingClientRect();
      }
      const position = PositionUtil.getPosition(
        this._elementRef.nativeElement.getBoundingClientRect(),
        this._componentRect,
        this.align,
        this.verticalAlign,
        0,
        4
      );
      PositionUtil.setElementPosition(
        this._componentRef.location.nativeElement,
        position
      );
    }
  }

  private createHint(): void {
    if (!this._dynamicContent) {
      return;
    }
    this._componentRef = this.createContentRef();
    this._componentRef.instance.className = [
      ...ArrayUtil.asArray(this.className),
      'hint',
    ];
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
