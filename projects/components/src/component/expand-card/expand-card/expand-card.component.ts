import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'teta-expand-card',
  templateUrl: './expand-card.component.html',
  styleUrls: ['./expand-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'expand-card'
})
export class ExpandCardComponent implements OnInit {
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();
  @Input() showCross: boolean = true;
  @Output() crossClick = new EventEmitter<MouseEvent>();
  constructor() {
  }

  ngOnInit(): void {
  }

  setOpen() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
