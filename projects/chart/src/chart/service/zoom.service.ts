import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, Subscription,} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import * as d3 from "d3";
import {ZoomBehavior, zoomIdentity} from "d3";
import {AxisOrientation} from "../model/enum/axis-orientation";
import {BroadcastService} from "./broadcast.service";
import {ZoomMessage} from "../model/i-broadcast-message";

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
  private currentScale: any;
  private broadcastChannel: string;

  constructor(private broadcast: BroadcastService) {
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

  setScale(scale: any) {
    this.currentScale = scale;
  }


  setBroadcastChannel(channel: string) {
    this.broadcastChannel = channel;
  }

  setZoomBehavior(zoom: ZoomBehavior<any, any>) {
    this.zoom = zoom;
  }

  setAxis(axis: Axis) {
    this.axis = axis;
  }

  setZoom(from: number, to: number) {

    if(!this.zoom) {
      return
    }

    this.currentScale.domain(this.axis.extremes);
    const domain = this.currentScale.domain();
    const scale = (domain[1] - domain[0])  / (to - from);
    let transform = zoomIdentity.scale(scale);

    if(this.axis.orientation === AxisOrientation.x) {
      transform = transform.translate(-this.currentScale(from), 0);
    }

    if(this.axis.orientation === AxisOrientation.y) {
      transform = transform.translate(0, -this.currentScale(from));
    }

    this.element.transition().call(this.zoom.transform, transform, null, {});

    const zoomMessage = new ZoomMessage({
      event: {
        sourceEvent: null,
        transform: transform
      },
      axis: this.axis,
      brushDomain: [from, to],
      chartId: null,

    })

    this.broadcast.broadcastZoom({
      channel: this.broadcastChannel,
      message: zoomMessage
    })

  }

  resetZoom() {
    if(!this.zoom) {
      return
    }

    this.element.transition().call(this.zoom.transform, zoomIdentity, null, {});

    const zoomMessage = new ZoomMessage({
      event: {
        sourceEvent: null,
        transform: zoomIdentity
      },
      axis: this.axis,
      brushDomain: null,
      chartId: null,

    })

    this.broadcast.broadcastZoom({
      channel: this.broadcastChannel,
      message: zoomMessage
    })
  }

}
