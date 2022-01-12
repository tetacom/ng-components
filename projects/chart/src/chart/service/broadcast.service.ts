import { Injectable } from '@angular/core';
import { IBroadcastMessage } from '../model/i-broadcast-message';
import { filter, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private emitter: Subject<IBroadcastMessage>;

  constructor() {
    this.emitter = new Subject<IBroadcastMessage>();
  }

  broadcast(value: IBroadcastMessage) {
    this.emitter.next(value);
  }

  subscribe(channel: string): Observable<IBroadcastMessage> {
    return this.emitter
      .asObservable()
      .pipe(filter((msg) => channel && msg.channel === channel));
  }
}
