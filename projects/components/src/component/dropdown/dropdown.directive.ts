import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Inject,
  NgZone, OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DropdownBase} from './dropdown-base';

@Directive({
  selector: '[tetaDropdown]'
})
export class DropdownDirective extends DropdownBase implements OnInit, OnDestroy, AfterViewInit {
  constructor(protected override _cdr: ChangeDetectorRef,
              @Inject(DOCUMENT) protected override _document: any,
              protected override _elementRef: ElementRef<HTMLElement>,
              protected override _zone: NgZone,
              protected override _renderer: Renderer2) {
    super(_cdr, _document, _elementRef, _zone, _renderer);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.closeDropdown();
    this.removeScrollListener();
    this._alive = false;
  }

  ngAfterViewInit(): void {
    if (this._content) {
      this._renderer.removeChild(this._content.nativeElement.parentNode, this._content.nativeElement);
    }
  }
}
