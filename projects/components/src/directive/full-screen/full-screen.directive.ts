import { Directive, ElementRef, inject } from '@angular/core';
import { FullScreenService } from './full-screen.service';

@Directive({
  selector: '[tetaFullScreen]',
  providers: [FullScreenService],
  host: {
    '(keydown.escape)': 'onEsc($event)',
  },
})
export class FullScreenDirective {
  private service = inject(FullScreenService);
  public elementRef = inject(ElementRef);

  async enter() {
    await this.service.enter(this.elementRef.nativeElement);
  }

  async exit() {
    await this.service.exit();
  }

  async toggle() {
    await this.service.toggle(this.elementRef.nativeElement);
  }

  async onEsc(ev: KeyboardEvent) {
    if (document.fullscreenElement === this.elementRef.nativeElement) {
      ev.stopPropagation();
      await this.exit();
    }
  }
}
