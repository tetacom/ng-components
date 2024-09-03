import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../../button/button/button.component';

@Component({
  selector: 'teta-expand-item',
  templateUrl: './expand-item.component.html',
  styleUrls: ['./expand-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'expand-item',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
})
export class ExpandItemComponent {
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();

  setOpen() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
