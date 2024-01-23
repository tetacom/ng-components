import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DelimiterComponent } from '../../delimiter/delimiter/delimiter.component';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../../button/button/button.component';
import { ToolbarComponent } from '../../toolbar/toolbar/toolbar.component';

@Component({
    selector: 'teta-expand-card',
    templateUrl: './expand-card.component.html',
    styleUrls: ['./expand-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'expand-card',
    standalone: true,
    imports: [ToolbarComponent, ButtonComponent, IconComponent, DelimiterComponent]
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
