import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {BrushMessage} from '../model/i-broadcast-message';

@Injectable({
  providedIn: 'root',
})
export class BrushService {
  brushDomain: Observable<BrushMessage>;
  private _brushDomain = new ReplaySubject<BrushMessage>(1);

  constructor() {
    this.brushDomain = this._brushDomain.asObservable();
  }

  setBrush(brush: BrushMessage) {
    this._brushDomain.next(brush);
  }
}
