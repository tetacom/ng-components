import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'teta-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('panel', [
      transition('void => *', [style({ opacity: '0' }), animate(300, style({ opacity: '1' }))]),
      transition('* => void', [animate(150, style({ opacity: '0' }))]),
    ]),
  ],
  standalone: true,
})
export class PanelComponent implements OnInit {
  @Input() width = 500;

  @HostBinding('@panel')
  private get panel() {
    return {
      value: true,
      params: { width: this.width },
    };
  }

  @HostBinding('class.column') private readonly column = true;
  @HostBinding('class.column_fixed') private readonly auto = true;

  constructor() {}

  ngOnInit(): void {}
}
