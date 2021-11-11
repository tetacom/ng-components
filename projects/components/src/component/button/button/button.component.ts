import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

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
    return result.join(' ');
  }

  constructor() {}

  ngOnInit(): void {}
}
