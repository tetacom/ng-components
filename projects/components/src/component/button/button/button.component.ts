import { ChangeDetectionStrategy, Component, computed, inject, input, Input } from '@angular/core';
import { viewType } from '../../../common/model/view-type.model';
import { TetaSize } from '../../../common/enum/teta-size.enum';
import { SizeDirective } from '../../../directive/appearance/size.directive';
import { PaletteDirective } from '../../../directive/appearance/palette.directive';
import { AppearanceDirective } from '../../../directive/appearance/appearance.directive';
import { ViewTypeDirective } from '../../../directive/appearance/view-type.directive';

export type ButtonViewType = 'primary' | 'outline' | 'ghost';

@Component({
  selector: 'button[teta-button], teta-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: SizeDirective,
      inputs: ['tetaSize'],
    },
    {
      directive: PaletteDirective,
      inputs: ['tetaPalette'],
    },
    {
      directive: AppearanceDirective,
      inputs: ['tetaAppearance'],
    },
    {
      directive: ViewTypeDirective,
      inputs: ['tetaViewType'],
    },
  ],
  host: {
    class: 'button',
    '[class.button-square]': 'square()',
  },
})
export class ButtonComponent {
  tetaSize = inject(SizeDirective).tetaSize;
  square = input<boolean>(false);

  @Input() palette: string;
  @Input() view: ButtonViewType = 'primary';

  @Input() viewType: viewType = 'rounded';

  size = computed(() => {
    return this.tetaSize() ?? TetaSize.M;
  });

  // @HostBinding('class')
  // private get getClass(): string {
  //   const result = ['button'];
  //   if (this.palette) {
  //     result.push(`button-${this.palette}`);
  //   }
  //   if (this.view) {
  //     result.push(`button_${this.view}`);
  //   }
  //   if (this.square) {
  //     result.push(`button-square`);
  //   }
  //   switch (this.size()) {
  //     case TetaSize.XL:
  //       result.push(`button-xl`);
  //       break;
  //     case TetaSize.L:
  //       result.push(`button-l`);
  //       break;
  //     case TetaSize.M:
  //       result.push(`font-button-2`);
  //       result.push(`button-m`);
  //       break;
  //     case TetaSize.S:
  //       result.push(`font-button-3`);
  //       result.push(`button-s`);
  //       break;
  //     case TetaSize.XS:
  //       result.push(`font-button-3`);
  //       result.push(`button-xs`);
  //       break;
  //   }
  //   result.push(`button_${this.viewType}`);
  //   return result.join(' ');
  // }
}
