import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit,} from '@angular/core';
import {viewType} from "../../../common/model/view-type.model";

export type ButtonViewType = 'primary' | 'outline' | 'ghost';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[teta-button], teta-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() palette: string;
  @Input() class;
  @Input() view: ButtonViewType = 'primary';
  @Input() square = false;
  @Input() viewType: viewType = 'rounded'
  @Input() size: 'm' | 'l' = 'm';

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
      case "l":
        result.push(`font-button-1`);
        break;
      case "m":
        result.push(`font-button-2`);
    }
    result.push(`button_${this.viewType}`);
    return result.join(' ');
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
