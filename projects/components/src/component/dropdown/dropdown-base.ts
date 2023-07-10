import {
  ChangeDetectorRef,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2,
} from '@angular/core';
import {DomUtil} from '../../common/util/dom-util';
import {PositionUtil} from '../../common/util/position-util';
import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';
import {DropdownHeadDirective} from './dropdown-head.directive';
import {DropdownContentDirective} from './dropdown-content.directive';
import {AutoCloseIgnoreCase} from '../../common/contract/auto-close-ignore-case';
import {IRect} from '../../common/contract/i-rect';
import {takeWhile, throttleTime} from 'rxjs/operators';
import {viewType} from '../../common/model/view-type.model';

@Directive()
export class DropdownBase {
  @Input() align: Align = Align.left;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;
  @Input() appendToBody: boolean;
  @Input() disabled: boolean;
  @Input() backdrop = false;
  @Input() className: string | string[];
  @Input() viewType: viewType = 'rounded';

  @Input()
  set open(val: boolean) {
    if (val != null && val !== this._open && !this.disabled) {
      if (val) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    }
  }

  get open(): boolean {
    return this._open;
  }

  get container() {
    return this.appendToBody
      ? this._document.body
      : this._elementRef.nativeElement;
  }

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() autoClose = true;
  @Input() autoCloseIgnore: Array<AutoCloseIgnoreCase> = ['inside'];


  @ContentChild(DropdownHeadDirective, {
    static: false,
    read: ElementRef,
  })
  protected _head: ElementRef;

  @ContentChild(DropdownContentDirective, {static: false})
  protected _content: DropdownContentDirective;

  protected _body: HTMLElement | null = null;
  protected _backdrop: HTMLElement | null = null;
  protected _open = false;
  protected _alive = true;

  constructor(
    protected _cdr: ChangeDetectorRef,
    protected _document: any,
    protected _elementRef: ElementRef<HTMLElement>,
    protected _zone: NgZone,
    protected _renderer: Renderer2
  ) {
    this._zone.onStable
      .pipe(
        takeWhile((_) => this._alive),
        throttleTime(10, undefined, {trailing: true})
      )
      .subscribe((_) => {
        if (this._head?.nativeElement && this._body) {
          setTimeout(() => {
            if (this._head?.nativeElement && this._body) {
              this.setPosition(this._head.nativeElement, this._body);
            }
          });
        }
      });
    this.addScrollListener();
  }

  @HostListener('click', ['$event']) click(event: MouseEvent): void {
    if (this.open) {
      if (!DomUtil.clickedInside(this._body, event) || this.autoCloseIgnore.indexOf('inside') < 0) {
        this.closeDropdown();
      }
    } else {
      if (DomUtil.clickedInside(this._head.nativeElement, event)) {
        this.openDropdown();
      }
    }
  }

  @HostListener('document:click', ['$event']) documentClick(
    event: MouseEvent
  ): void {
    if (
      !this.open ||
      !this.autoClose ||
      event.detail === 0 ||
      DomUtil.clickedInside(this._head.nativeElement, event)
    ) {
      return;
    }
    if (DomUtil.clickedInside(this._body, event)) {
      if (this.autoCloseIgnore.indexOf('inside') < 0) {
        this.closeDropdown();
      }
    } else {
      if (this.autoCloseIgnore.indexOf('outside') < 0) {
        this.closeDropdown();
      }
    }
  }

  @HostListener('window:keyup', ['$event']) keyUp(event: KeyboardEvent): void {
    if (
      !this.open ||
      !this.autoClose ||
      ['esc', 'enter'].every(
        (_: 'esc' | 'enter') => this.autoCloseIgnore.indexOf(_) >= 0
      )
    ) {
      return;
    }
    if (
      (event.code === 'Escape' && this.autoCloseIgnore.indexOf('esc') < 0) ||
      (event.code === 'Enter' && this.autoCloseIgnore.indexOf('enter') < 0)
    ) {
      this.closeDropdown();
    }
  }

  protected addScrollListener() {
    window.addEventListener('scroll', this.scrollListener, true)
  }

  protected removeScrollListener() {
    window.removeEventListener('scroll', this.scrollListener, true)
  }

  private scrollListener = (event) => {
    if (this.open && !this._body.contains(event.target) && this._body !== event.target) {
      this.closeDropdown();
    }
  }

  protected closeDropdown(): void {
    if (this.open && this._body && this.container.contains(this._body)) {
      this._renderer.removeChild(this.container, this._body);
      this._open = false;
      this._body = null;
      if (this._backdrop) {
        this._renderer.removeChild(this._document.body, this._backdrop);
      }
      this.openChange.emit(this.open);
      this._cdr.detectChanges();
    }
  }

  private openDropdown(): void {
    if (this._open || !this._content || this.disabled) {
      return;
    }
    this._open = true;
    this.openChange.emit(this.open);
    const renderer = this._renderer;
    const content = this._content.nativeElement;
    const container = (this._body = this._body || renderer.createElement('div'));
    renderer.addClass(container, 'dropdown');
    renderer.addClass(container, 'dropdown_' + this.viewType);
    if (this.backdrop) {
      this._backdrop = renderer.createElement('div');
      renderer.addClass(this._backdrop, 'dropdown-backdrop');
      renderer.appendChild(this._document.body, this._backdrop);
    }
    if (this.className != null) {
      if (this.className instanceof Array && this.className.length > 0) {
        this.className.forEach((_) => {
          renderer.addClass(container, _);
        });
      }
      if (typeof this.className === 'string') {
        renderer.addClass(container, this.className);
      }
    }
    renderer.appendChild(container, content);
    renderer.appendChild(this.container, container);
    this.setPosition(this._head.nativeElement, this._body);
  }

  private setPosition(container: HTMLElement, target: HTMLElement): void {
    const containerPosition = container.getBoundingClientRect();
    // target.style.maxHeight = null;
    const targetPosition = target.getBoundingClientRect();

    const rect: IRect = {
      bottom: containerPosition.bottom,
      top: containerPosition.top,
      left: containerPosition.left,
      right: containerPosition.right,
    };

    const targetRect: IRect = {
      bottom: targetPosition.bottom,
      top: targetPosition.top,
      left: targetPosition.left,
      right: targetPosition.right,
    };

    const targetTransformedParent = DomUtil.findTransformedParent(target);
    let parentPosition = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    if (targetTransformedParent) {
      parentPosition = targetTransformedParent.getBoundingClientRect();
    }

    const position = PositionUtil.getPosition(
      rect,
      targetRect,
      this.align,
      this.verticalAlign,
      0,
      0,
      parentPosition
    );

    PositionUtil.setElementPosition(target, position);
  }
}
