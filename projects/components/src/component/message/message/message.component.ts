import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {Message} from '../model/message';

@Component({
  selector: 'teta-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements AfterViewInit, OnDestroy {
  @Input() message: Message;
  @Input() index: number;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Input() class;

  @HostBinding('class')
  private get getClass() {
    const result = ['message'];
    if (this.message.className?.length > 0) {
      result.push(...this.message.className);
    }
    if (this.message.palette) {
      result.push(`message-${this.message.palette}`);
    }
    result.push('message_' + this.message.viewType)
    return result.join(' ');
  }

  timeout: any;

  constructor() {
  }

  @HostListener('mouseleave')
  init() {
    if (!this.message.infinite) {
      this.timeout = setTimeout(() => {
        this.closed.emit({
          index: this.index,
          message: this.message,
        });
      }, this.message.duration);
    }
  }

  @HostListener('mouseenter')
  reset() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  closeMe(event: MouseEvent) {
    this.reset();

    this.closed.emit({
      index: this.index,
      message: this.message,
    });

    event.preventDefault();
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {
    this.reset();
  }
}
