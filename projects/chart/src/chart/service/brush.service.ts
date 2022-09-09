import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {BrushMessage} from '../model/i-broadcast-message';

@Injectable({
  providedIn: 'root',
})
export class BrushService {
  brushDomain: Observable<BrushMessage>;
  // outBrushDomain: Observable<[number, number]>;

  private _brushDomain = new ReplaySubject<BrushMessage>(1);
  // private _outBrushDomain = new ReplaySubject<[number, number]>(1);

  constructor() {
    this.brushDomain = this._brushDomain.asObservable();
  }

  setBrush(brush: BrushMessage) {
    this._brushDomain.next(brush);
  }

  // moveBrush(domain: [number, number]) {
  //   this._outBrushDomain.next(domain);
  // }
}
