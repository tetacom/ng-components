import { Injectable } from '@angular/core';
import { IBroadcastMessage } from '../model/i-broadcast-message';
import { filter, Observable, ReplaySubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private emitter: ReplaySubject<IBroadcastMessage>;

  constructor() {
    this.emitter = new ReplaySubject<IBroadcastMessage>(1);
  }

  broadcast(value: IBroadcastMessage) {
    this.emitter.next(value);
  }

  subscribeToChannel(channel: string): Observable<IBroadcastMessage> {
    return this.emitter.asObservable().pipe(
      filter((msg) => channel && msg.channel === channel),
      shareReplay(1)
    );
  }
}
