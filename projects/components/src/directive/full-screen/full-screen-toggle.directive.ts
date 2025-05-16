import { Directive, inject } from '@angular/core';
import { FullScreenDirective } from './full-screen.directive';

@Directive({
  selector: '[tetaFullScreenToggle]',
  host: {
    '(click)': 'onClick()',
  },
})
export class FullScreenToggleDirective {
  private fullScreen = inject(FullScreenDirective, {
    optional: true,
  });

  async onClick() {
    await this.fullScreen?.toggle();
  }
}
