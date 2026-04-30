import { Directive, HostListener, inject, Input, OnDestroy, TemplateRef, Type } from '@angular/core';

import { AutoCloseIgnoreCase } from '../../common/contract/auto-close-ignore-case';
import { ClickService } from '../../common/service/click.service';
import { ArrayUtil } from '../../common/util/array-util';
import { DomUtil } from '../../common/util/dom-util';
import { PositionUtil } from '../../common/util/position-util';
import { DynamicContentBaseDirective } from '../dynamic-content-base.directive';

@Directive({
  selector: '[tetaContextMenu]',
  standalone: true,
})
export class ContextMenuDirective extends DynamicContentBaseDirective implements OnDestroy {
  private _click = inject(ClickService);

  /**
   * Строка, шаблон или компонент для создания контекстного меню
   */
  @Input() tetaContextMenu: string | TemplateRef<any> | Type<any>;
  @Input() autoCloseIgnore: AutoCloseIgnoreCase[] = [];

  get _dynamicContent() {
    return this.tetaContextMenu;
  }

  private _eventPoint: {
    x: number;
    y: number;
  };

  constructor() {
    super();
    this.addScrollListener();
  }

  @HostListener('contextmenu', ['$event'])
  showContent(event: MouseEvent): void {
    if (this.tetaContextMenu && !event.defaultPrevented) {
      event.preventDefault();
      setTimeout(() => {
        this.createMenu(event);
      });
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    if (this._componentRef && DomUtil.clickedInside(this._componentRef.location.nativeElement, event)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:contextmenu', ['$event'])
  documentClick(event: MouseEvent): void {
    if (
      this._open &&
      this._componentRef &&
      (!DomUtil.clickedInside(this._componentRef.location.nativeElement, event) ||
        this.autoCloseIgnore.indexOf('inside') < 0)
    ) {
      this.destroyContentRef();
      this.openChange.emit(false);
    }
  }

  protected addScrollListener() {
    window.addEventListener('scroll', this.scrollListener, true);
  }

  protected removeScrollListener() {
    window.removeEventListener('scroll', this.scrollListener, true);
  }

  private scrollListener = (event) => {
    if (
      this._open &&
      this._componentRef &&
      !this._componentRef.location.nativeElement.contains(event.target) &&
      this._componentRef.location.nativeElement !== event.target
    ) {
      this.destroyContentRef();
      this.openChange.emit(false);
    }
  };

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.removeScrollListener();
  }

  protected setPosition() {
    if (this._componentRef && this._open) {
      const position = PositionUtil.getPosition(
        {
          top: this._eventPoint.y,
          bottom: this._eventPoint.y,
          left: this._eventPoint.x,
          right: this._eventPoint.x,
        },
        this._componentRef.location.nativeElement.getBoundingClientRect(),
        this.align,
        this.verticalAlign,
      );
      PositionUtil.setElementPosition(this._componentRef.location.nativeElement, position);
    }
  }

  private createMenu(event: MouseEvent): void {
    if (this.tetaContextMenu == null) {
      return;
    }
    this._eventPoint = event;
    this._componentRef = this.createContentRef();
    this._componentRef.instance.className = [...ArrayUtil.asArray(this.className), 'context-menu'];
    this.openChange.emit(true);
  }
}
