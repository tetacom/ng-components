import {Injectable} from '@angular/core';
import {IBroadcastMessage, ZoomMessage} from '../model/i-broadcast-message';
import {filter, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private zoomEmitter: ReplaySubject<IBroadcastMessage<ZoomMessage>>;

  constructor() {
    this.zoomEmitter = new ReplaySubject<IBroadcastMessage<ZoomMessage>>(1);
  }

  broadcastZoom(value: IBroadcastMessage<ZoomMessage>) {
    this.zoomEmitter.next(value);
  }

  subscribeToZoom(channel: string): Observable<IBroadcastMessage<ZoomMessage>> {
    return this.zoomEmitter.asObservable().pipe(
      filter((msg) => channel && msg.channel === channel)
    );
  }
}
