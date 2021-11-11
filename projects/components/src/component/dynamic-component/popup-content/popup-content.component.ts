import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ArrayUtil } from '../../../common/util/array-util';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'teta-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ opacity: '0' }),
        animate(200, style({ opacity: '1' })),
      ]),
      transition('* => void', [animate(200, style({ opacity: '0' }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupContentComponent implements OnInit, OnDestroy {
  @HostBinding('@dialog') dialog = true;

  @Input() className: string | string[];

  @HostBinding('class')
  private get getClass(): string {
    const result = [...ArrayUtil.asArray(this.className), 'popup-content'];
    return result.join(' ');
  }

  constructor() {}

  addClass(className: string) {
    if (this.className) {
      if (typeof this.className === 'string') {
        this.className = className;
      }
      if (this.className instanceof Array) {
        this.className.push(className);
      }
    } else {
      this.className = [className];
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
