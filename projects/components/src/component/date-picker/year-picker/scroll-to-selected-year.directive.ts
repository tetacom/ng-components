import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[tetaScrollToSelectedYear]',
  standalone: true,
})
export class ScrollToSelectedYearDirective implements OnDestroy {
  public alive = true;

  constructor(@Inject(ElementRef) private readonly el: ElementRef<Element>) {}

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.scrollIntoView({ inline: 'center', block: 'center' });
  }
}
