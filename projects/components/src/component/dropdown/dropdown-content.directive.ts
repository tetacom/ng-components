import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[tetaDropdownContent]',
  standalone: true,
})
export class DropdownContentDirective {
  nativeElement: HTMLElement;

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    this.nativeElement = _elementRef.nativeElement;
  }
}
