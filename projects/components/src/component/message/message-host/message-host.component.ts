import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../model/message';
import { Align } from '../../../common/enum/align.enum';
import { VerticalAlign } from '../../../common/enum/vertical-align.enum';
import { takeWhile } from 'rxjs/operators';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'teta-message-host',
  templateUrl: './message-host.component.html',
  styleUrls: ['./message-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MessageComponent],
})
export class MessageHostComponent implements OnInit, OnDestroy {
  @Input() class;
  @Input() align: Align = Align.right;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.bottom;
  @Output() itemClose: EventEmitter<any> = new EventEmitter();

  messages: Message[] = [];
  private readonly _alignMap: Map<Align, string> = new Map<Align, string>()
    .set(Align.right, 'message-host_right')
    .set(Align.left, 'message-host_left')
    .set(Align.center, 'message-host_center');
  private readonly _valignMap: Map<VerticalAlign, string> = new Map<VerticalAlign, string>()
    .set(VerticalAlign.top, 'message-host_top')
    .set(VerticalAlign.center, 'message-host_vertical-center')
    .set(VerticalAlign.bottom, 'message-host_bottom');

  @HostBinding('class')
  private get getClass(): string {
    const result = [this.class, 'message-host'];
    if (this._alignMap.has(this.align)) {
      result.push(this._alignMap.get(this.align));
    }
    if (this._valignMap.has(this.verticalAlign)) {
      result.push(this._valignMap.get(this.verticalAlign));
    }
    return result.join(' ');
  }

  private _alive = true;

  constructor(
    private _svc: MessageService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this._svc.message.pipe(takeWhile((_) => this._alive)).subscribe((messages) => {
      if (messages) {
        if (!this.messages) {
          this.messages = [];
        }
        this.messages.push(messages);
      }
      this._cdr.markForCheck();
    });

    this._svc.clear.pipe(takeWhile((_) => this._alive)).subscribe((x: string) => {
      if (!x) {
        this.messages = [];
      } else {
        this.messages = this.messages?.filter((_) => _.name !== x);
      }
      this._cdr.markForCheck();
    });
  }

  closedItem(event: any) {
    this.messages.splice(event.index, 1);
    this.itemClose.emit({
      message: event.message,
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
