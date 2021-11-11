import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[tetaLoader]',
})
export class LoaderDirective implements OnDestroy {
  @Input() appendToBody = false;

  @Input()
  set tetaLoader(value: boolean) {
    this._loading = value;
    if (this._loading) {
      this.show();
    } else {
      this.hide();
    }
  }

  get tetaLoader() {
    return this._loading;
  }

  private _element: HTMLElement;
  private _loader: any;
  private _alive = true;
  private _loading: boolean;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: any
  ) {
    this._element = this._elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this._alive = false;
    this.hide();
  }

  private show() {
    if (this._loader === null || this._loader === undefined) {
      this._loader = this._renderer.createElement('div');
      this._loader.setAttribute('class', 'loader');
    }
    this._renderer.appendChild(
      this.appendToBody ? this._document.body : this._element,
      this._loader
    );
    this.setPosition();
  }

  private hide() {
    if (this._loader && this._loader.parentElement) {
      this._renderer.removeChild(this._loader.parentElement, this._loader);
    }
  }

  private setPosition() {
    const position = this._element.getBoundingClientRect();
    this._renderer.setStyle(
      this._loader,
      'top',
      `${position.y + position.height / 2}px`
    );
    this._renderer.setStyle(
      this._loader,
      'left',
      `${position.x + +position.width / 2}px`
    );
  }
}
