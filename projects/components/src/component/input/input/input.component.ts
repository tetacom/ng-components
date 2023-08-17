import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { Align } from '../../../common/enum/align.enum';
import { viewType } from '../../../common/model/view-type.model';

@Component({
  selector: 'teta-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() label?: string;
  @Input() hint?: string;
  @Input() viewType: viewType = 'rounded';

  @Input()
  @HostBinding('class.row')
  horizontal = false;

  @Input()
  required = false;

  @HostBinding('class.column')
  get column() {
    return !this.horizontal;
  }

  align = Align;
}
