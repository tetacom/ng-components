import { computed, Directive, input } from '@angular/core';
import { TetaAppearance } from '../../common/enum/appearance.enum';

@Directive({
  selector: '[tetaAppearance]',
  host: {
    '[class]': 'class()',
    '[attr.teta-appearance]': 'tetaAppearance()',
    '[attr.data-teta-appearance]': 'tetaAppearance()',
  },
})
export class AppearanceDirective {
  tetaAppearance = input<TetaAppearance>();

  class = computed(() => {
    if (this.tetaAppearance()) {
      return `appearance-${this.tetaAppearance()}`;
    }
    return '';
  });
}
