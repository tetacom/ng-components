import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownBase } from '../dropdown-base';

@Component({
  selector: 'teta-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dropdown',
  standalone: true,
})
export class DropdownComponent extends DropdownBase implements OnInit, OnDestroy {
  constructor(
    protected override _cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) protected override _document: any,
    protected override _elementRef: ElementRef<HTMLElement>,
    protected override _zone: NgZone,
    protected override _renderer: Renderer2,
  ) {
    super(_cdr, _document, _elementRef, _zone, _renderer);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.closeDropdown();
    this.removeScrollListener();
    this._alive = false;
  }
}
