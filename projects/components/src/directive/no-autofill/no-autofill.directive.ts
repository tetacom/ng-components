import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[tetaNoAutofill]',
    standalone: true,
})

/**
 * Disable autofill inputs in Chrome. Append hidden inputs with text/password type, to element.
 */
export class NoAutofillDirective implements OnInit {
  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  ngOnInit() {
    const inputsTypes = ['text', 'password'];

    inputsTypes.forEach((_) => {
      const inputElement = this._renderer.createElement('input');
      this._renderer.setAttribute(inputElement, 'type', _);
      this._renderer.setAttribute(inputElement, 'class', 'position-absolute');
      this._renderer.setStyle(inputElement, 'left', '-9999px');
      this._renderer.insertBefore(
        this._elementRef.nativeElement,
        inputElement,
        this._elementRef.nativeElement.firstChild
      );
    });
  }
}
