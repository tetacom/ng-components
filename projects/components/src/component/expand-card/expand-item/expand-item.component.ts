import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'teta-expand-item',
  templateUrl: './expand-item.component.html',
  styleUrls: ['./expand-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'expand-item'
})
export class ExpandItemComponent implements OnInit {
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  setOpen() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
