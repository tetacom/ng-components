import {ElementRef, Injectable} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  shareReplay,
  Subscription,
} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import * as d3 from "d3";
import {ZoomBehavior} from "d3";

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription[] = [];

  zoomed: Observable<IChartEvent<Axis>>;
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  private element: d3.Selection<SVGElement, any, any, any>;
  private zoom: ZoomBehavior<any, any>;
  private axis: Axis;

  constructor() {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }

  fireZoom(zoom: IChartEvent<Axis>) {
    this.zoomed$.next(zoom);
  }

  setElement(e: d3.Selection<SVGElement, any, any, any>) {
    this.element = e;
  }

  setZoomBehavior(zoom: ZoomBehavior<any, any>) {
    this.zoom = zoom;
  }

  setAxis(axis: Axis) {
    this.axis = axis;
  }

  setZoom(from: number, to: number) {

  }


}
