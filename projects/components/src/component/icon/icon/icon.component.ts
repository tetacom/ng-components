import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { TetaSize } from '../../../common/enum/teta-size.enum';

@Component({
  selector: 'teta-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input() name: string;
  @Input() size: TetaSize = TetaSize.M;
  @Input() palette: string = 'text';

  @Input() class;

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'icon'];
    if (this.palette) {
      result.push(`icon-${this.palette}`);
    }
    return result.join(' ');
  }

  constructor() {}

  ngOnInit(): void {}

  getName(): string {
    return `#${this.name}`;
  }
}
