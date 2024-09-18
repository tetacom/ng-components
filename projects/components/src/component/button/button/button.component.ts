import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { viewType } from '../../../common/model/view-type.model';
import { TetaSize } from '../../../common/enum/teta-size.enum';

export type ButtonViewType = 'primary' | 'outline' | 'ghost';

@Component({
  selector: 'button[teta-button], teta-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ButtonComponent {
  @Input() palette: string;
  @Input() class;
  @Input() view: ButtonViewType = 'primary';
  @Input() square = false;
  @Input() viewType: viewType = 'rounded';
  @Input() size: TetaSize = TetaSize.M;

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'button'];
    if (this.palette) {
      result.push(`button-${this.palette}`);
    }
    if (this.view) {
      result.push(`button_${this.view}`);
    }
    if (this.square) {
      result.push(`button-square`);
    }
    switch (this.size) {
      case TetaSize.XL:
        result.push(`button-xl`);
        break;
      case TetaSize.L:
        result.push(`button-l`);
        break;
      case TetaSize.M:
        result.push(`font-button-2`);
        result.push(`button-m`);
        break;
      case TetaSize.S:
        result.push(`font-button-3`);
        result.push(`button-s`);
        break;
      case TetaSize.XS:
        result.push(`font-button-3`);
        result.push(`button-xs`);
        break;
    }
    result.push(`button_${this.viewType}`);
    return result.join(' ');
  }
}
