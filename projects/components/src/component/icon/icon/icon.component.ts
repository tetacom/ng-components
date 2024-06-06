import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { TetaSize } from '../../../common/enum/teta-size.enum';
import { IconSpriteDirective } from '../icon-sprite.directive';

@Component({
  selector: 'teta-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  imports: [IconSpriteDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IconComponent {
  @Input() name: string;
  @Input() size: TetaSize = TetaSize.M;
  @Input() palette: string;

  @Input() class;

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'icon'];
    if (this.palette) {
      result.push(`icon-${this.palette}`);
    }
    switch (this.size) {
      case TetaSize.XL:
        result.push(`icon-xl`);
        break;
      case TetaSize.L:
        result.push(`icon-l`);
        break;
      case TetaSize.M:
        result.push(`icon-m`);
        break;
      case TetaSize.S:
        result.push(`icon-s`);
        break;
      case TetaSize.XS:
        result.push(`icon-xs`);
        break;
    }
    return result.join(' ');
  }

  getName(): string {
    return `#${this.name}`;
  }
}
