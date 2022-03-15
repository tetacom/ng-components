import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  Subscription,
} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription[] = [];

  zoomed: Observable<IChartEvent<Axis>>;
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  constructor() {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }

  setZoom(zoom: IChartEvent<Axis>) {
    this.zoomed$.next(zoom);
  }
}
