import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'teta-delimiter',
  templateUrl: './delimiter.component.html',
  styleUrls: ['./delimiter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DelimiterComponent implements OnInit {
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() palette = 'text';
  @Input() height = 32;
  @Input() verticalMargin = 4;
  @Input() horizontalMargin = 8;

  @Input() class;

  @HostBinding('class')
  private get getClass(): string {
    return [
      this.class,
      'delimiter',
      this.getBgColor(),
      this.direction === 'horizontal' ? 'display-flex' : 'display-inline-flex',
    ].join(' ');
  }

  @HostBinding('style.height')
  private get getHeight(): string {
    return this.direction === 'vertical' ? '' : '1px';
  }

  @HostBinding('style.width')
  private get getWidth(): string {
    return this.direction === 'horizontal' ? '' : '1px';
  }

  @HostBinding('style.margin')
  private get getMargin(): string {
    return this.direction === 'horizontal' ? '8px' : '0';
  }

  constructor() {}

  getBgColor() {
    return this.palette ? `bg-${this.palette}-10` : '';
  }

  ngOnInit(): void {}
}
