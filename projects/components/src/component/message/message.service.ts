import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Message } from './model/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: Observable<Message>;
  clear: Observable<string>;

  private _message = new ReplaySubject<Message>(1);
  private _clear = new Subject<string>();

  constructor() {
    this.message = this._message.asObservable();
    this.clear = this._clear.asObservable();
  }

  add(message: Message) {
    if (message) {
      this._message.next(message);
    }
  }

  addMultiple(messages: Message[]) {
    if (messages && messages.length) {
      messages.forEach((n) => {
        this._message.next(n);
      });
    }
  }

  clearMessages(name: string) {
    this._clear.next(name);
  }
}
