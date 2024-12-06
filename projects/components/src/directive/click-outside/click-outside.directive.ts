import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output } from '@angular/core';
import { DomUtil } from '../../common/util/dom-util';

@Directive({
  selector: '[tetaClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnDestroy {
  @Output() clickOutside = new EventEmitter<MouseEvent>();
  @Input() rightClick = false;

  private _handleEvents = false;

  @Input()
  set tetaClickOutside(val: boolean) {
    this._handleEvents = val;
    if (this._handleEvents) {
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.addListener(this.rightClick);
        });
      });
    } else {
      this.removeListener();
    }
  }

  get tetaClickOutside(): boolean {
    return this._handleEvents;
  }

  constructor(
    private _elementRef: ElementRef,
    private _ngZone: NgZone,
  ) {}

  ngOnDestroy(): void {
    this.removeListener();
  }

  private addListener(handleRightClick: boolean): void {
    window.addEventListener('click', this.listener);
    if (handleRightClick) {
      window.addEventListener('contextmenu', this.listener);
    }
  }

  private removeListener(): void {
    window.removeEventListener('click', this.listener);
    window.removeEventListener('contextmenu', this.listener);
  }

  private listener = (click: MouseEvent) => {
    if (!this._handleEvents) {
      return;
    }
    const clickedInside = DomUtil.clickedInside(this._elementRef.nativeElement, click);
    if (!clickedInside) {
      this.clickOutside.emit(click);
    }
  };
}
