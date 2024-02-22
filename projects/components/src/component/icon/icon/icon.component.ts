import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { TetaSize } from '../../../common/enum/teta-size.enum';
import {IconSpriteDirective} from "../icon-sprite.directive";

@Component({
    selector: 'teta-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    imports:[IconSpriteDirective],
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
    return result.join(' ');
  }

  getName(): string {
    return `#${this.name}`;
  }
}
