import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { TetaSize } from '../../../common/enum/teta-size.enum';

@Component({
  selector: 'teta-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
