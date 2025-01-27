import { computed, Directive, input } from '@angular/core';
import { TetaPalette } from '../../common/enum/palette.enum';

@Directive({
  selector: '[tetaPalette]',
  host: {
    '[class]': 'class()',
    '[attr.teta-palette]': 'tetaPalette()',
    '[attr.data-teta-palette]': 'tetaPalette()'
  }
})
export class PaletteDirective {
  tetaPalette = input<TetaPalette | string>();

  class = computed(() => {
    if(this.tetaPalette()) {
      return `palette-${this.tetaPalette()}`;
    }
    return '';
  })
}
