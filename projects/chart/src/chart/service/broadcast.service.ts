import { Injectable } from '@angular/core';
import {BrushMessage, IBroadcastMessage, ZoomMessage} from '../model/i-broadcast-message';
import {filter, map, Observable, ReplaySubject, shareReplay, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private zoomEmitter: Subject<IBroadcastMessage<ZoomMessage>>;
  private brushEmitter: ReplaySubject<IBroadcastMessage<BrushMessage>>;

  constructor() {
    this.zoomEmitter = new Subject<IBroadcastMessage<ZoomMessage>>();
    this.brushEmitter = new ReplaySubject<IBroadcastMessage<BrushMessage>>(1)
  }

  broadcastZoom(value: IBroadcastMessage<ZoomMessage>) {
    this.zoomEmitter.next(value);
  }

  broadcastBrush(value: IBroadcastMessage<BrushMessage>) {
    this.brushEmitter.next(value);
  }

  subscribeToZoom(channel: string): Observable<IBroadcastMessage<ZoomMessage>> {
    return this.zoomEmitter.asObservable().pipe(
      filter((msg) => channel && msg.channel === channel),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  subscribeToBrush(channel: string): Observable<IBroadcastMessage<BrushMessage>> {
    return this.brushEmitter.asObservable().pipe(
      filter((msg) => channel && msg.channel === channel),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }
}
