import { computed, Directive, input } from '@angular/core';
import { TetaViewType } from '../../common/enum/view-type-enum';

@Directive({
  selector: '[tetaViewType]',
  host: {
    '[class]': 'class()',
    '[attr.teta-view-type]': 'tetaViewType()',
    '[attr.data-teta-view-type]': 'tetaViewType()',
  },
})
export class ViewTypeDirective {
  tetaViewType = input<TetaViewType>();
  class = computed(() => {
    if (this.tetaViewType()) {
      return `view-type-${this.tetaViewType()}`;
    }
    return '';
  });
}
