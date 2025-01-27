import { computed, Directive, input } from '@angular/core';
import { TetaSize } from '../../common/enum/teta-size.enum';

@Directive({
  selector: '[tetaSize]',
  host: {
    '[class]': 'class()',
    '[attr.teta-size]': 'tetaSize()',
    '[attr.data-teta-size]': 'tetaSize()'
  }

})
export class SizeDirective {
  tetaSize = input<TetaSize>();

  class = computed(() => {
    if(this.tetaSize()) {
      return `size-${this.tetaSize()}`;
    }
    return '';
  })
}
