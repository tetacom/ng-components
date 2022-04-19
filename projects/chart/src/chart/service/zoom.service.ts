import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, Subscription,} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import * as d3 from "d3";
import {ZoomBehavior, zoomIdentity} from "d3";
import {AxisOrientation} from "../model/enum/axis-orientation";
import {BroadcastService} from "./broadcast.service";
import {ZoomMessage} from "../model/i-broadcast-message";
import objectHash from 'object-hash';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription: Subscription[] = [];
  zoomed: Observable<IChartEvent<Axis>>;
  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);

  private broadcastChannel: string;

  axisHashMap = new Map<string, Axis>();
  scaleHashMap = new Map<string, any>();
  elementHashMap = new Map<string, any>();
  zoomHashMap = new Map<string, ZoomBehavior<any, any>>();

  constructor(private broadcast: BroadcastService) {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }

  fireZoom(zoom: IChartEvent<Axis>) {
    this.zoomed$.next(zoom);
  }

  setBroadcastChannel(channel: string) {
    this.broadcastChannel = channel;
  }

  setZoom(from: number, to: number, axisIndex = 0, axisOrientation = AxisOrientation.x) {

    const hash = objectHash.sha1({index: axisIndex, orientation: axisOrientation});

    if (!this.zoomHashMap.has(hash)) {
      return;
    }

    const currentAxis = this.axisHashMap.get(hash);
    const currentScale = this.scaleHashMap.get(hash)?.copy();
    const currentElement = this.elementHashMap.get(hash);
    const currentZoom = this.zoomHashMap.get(hash);



    if (axisOrientation === AxisOrientation.x) {
      currentScale.domain(currentAxis.options.inverted ? [...currentAxis.extremes].reverse() : currentAxis.extremes)
    }

    if (axisOrientation === AxisOrientation.y) {
      currentScale.domain(currentAxis.options.inverted ? currentAxis.extremes : [...currentAxis.extremes].reverse())
    }

    const min = d3.min<number>(currentAxis.extremes);
    const max = d3.max<number>(currentAxis.extremes);


    const scale = (max - min) / (Math.abs(to - from));

    let transform = zoomIdentity.scale(scale);

    if (currentAxis.orientation === AxisOrientation.x) {
      transform = transform.translate(-currentScale(from), 0);
    }

    if (currentAxis.orientation === AxisOrientation.y) {
      transform = transform.translate(0, -currentScale(from));
    }


    currentElement.transition().call(currentZoom.transform, transform, null, {});

    const zoomMessage = new ZoomMessage({
      event: {
        sourceEvent: null,
        transform: transform
      },
      axis: currentAxis,
      brushDomain: [from, to],
      chartId: null,
    })

    this.broadcast.broadcastZoom({
      channel: this.broadcastChannel,
      message: zoomMessage
    })

  }

  resetZoom(axisIndex = 0, axisOrientation = AxisOrientation.x) {

    const hash = objectHash.sha1({index: axisIndex, orientation: axisOrientation});

    if (!this.zoomHashMap.has(hash)) {
      return;
    }

    const currentElement = this.elementHashMap.get(hash);
    const currentZoom = this.zoomHashMap.get(hash);
    const currentAxis = this.axisHashMap.get(hash);

    currentElement.transition().call(currentZoom.transform, zoomIdentity, null, {});

    const zoomMessage = new ZoomMessage({
      event: {
        sourceEvent: null,
        transform: zoomIdentity
      },
      axis: currentAxis,
      brushDomain: null,
      chartId: null,

    })

    this.broadcast.broadcastZoom({
      channel: this.broadcastChannel,
      message: zoomMessage
    })
  }

}
