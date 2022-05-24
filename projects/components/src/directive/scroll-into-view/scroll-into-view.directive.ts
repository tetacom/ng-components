import {Directive, ElementRef, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Directive({
  selector: '[tetaScrollIntoView]'
})
export class ScrollIntoViewDirective implements OnChanges {
  @Input() tetaScrollIntoView: boolean | undefined;
  @Input() behavior: ScrollBehavior = 'smooth';
  @Input() block: ScrollLogicalPosition = 'end';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private elementRef: ElementRef
  ) {
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (isPlatformBrowser(this.platformId)) {
      if (coerceBooleanProperty(this.tetaScrollIntoView)) {
        (this.elementRef.nativeElement as HTMLInputElement).scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }
    }
  }
}
