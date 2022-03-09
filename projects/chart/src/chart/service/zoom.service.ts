import {ElementRef, Injectable} from '@angular/core';
import * as d3 from 'd3';
import {D3ZoomEvent, zoomIdentity, ZoomTransform} from 'd3';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  shareReplay,
  Subscription,
  withLatestFrom,
} from 'rxjs';
import {IChartConfig} from '../model/i-chart-config';
import {BroadcastService} from './broadcast.service';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {ZoomType} from '../model/enum/zoom-type';
import {IBroadcastMessage, ZoomMessage} from '../model/i-broadcast-message';
import {BrushType} from '../model/enum/brush-type';
import {throttleTime} from 'rxjs/operators';
import {ChartService} from './chart.service';
import {ScaleService} from './scale.service';

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
