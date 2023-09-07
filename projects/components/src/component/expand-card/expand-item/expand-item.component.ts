import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'teta-expand-item',
  templateUrl: './expand-item.component.html',
  styleUrls: ['./expand-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'expand-item',
})
export class ExpandItemComponent {
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();

  setOpen() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
