import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay,} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import {ZoomBehavior, zoomIdentity} from "d3";
import {AxisOrientation} from "../model/enum/axis-orientation";
import {ScaleType} from "../model/enum/scale-type";
import objectHash from 'object-hash';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {

  broadcastSubscription = [];
  zoomed: Observable<IChartEvent<Axis>>;
  axisHashMap = new Map<string, Axis>();
  scaleHashMap = new Map<string, any>();
  elementHashMap = new Map<string, any>();
  zoomHashMap = new Map<string, ZoomBehavior<any, any>>();


  private zoomed$ = new BehaviorSubject<IChartEvent<Axis>>(null);
  private broadcastChannel: string;

  constructor() {
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

    currentScale.domain(currentAxis.originDomain)

    if (axisOrientation === AxisOrientation.x) {
      if (currentAxis.options.scaleType.type === ScaleType.log) {
        currentScale.domain(currentAxis.options.inverted ? [...currentAxis.originDomain].reverse() : currentAxis.originDomain)
      }
    }

    if (axisOrientation === AxisOrientation.y) {
      if (currentAxis.options.scaleType.type === ScaleType.log) {
        currentScale.domain(currentAxis.options.inverted ? currentAxis.originDomain : [...currentAxis.originDomain].reverse())
      }
    }

    const bBox = currentElement.node().getBBox();
    const delta = Math.abs(currentScale(to) - currentScale(from));

    const scale = axisOrientation === AxisOrientation.x ? bBox.width / delta : bBox.height / delta;

    let transform = zoomIdentity.scale(scale);

    if (currentAxis.orientation === AxisOrientation.x) {

      if (currentAxis.options.scaleType.type === ScaleType.log) {
        currentScale.domain(currentAxis.options.inverted ? [...currentScale.domain()].reverse() : currentScale.domain())
      }

      transform = transform.translate(-currentScale(from), 0);
    }

    if (currentAxis.orientation === AxisOrientation.y) {

      if (currentAxis.options.scaleType.type === ScaleType.log) {
        currentScale.domain(currentAxis.options.inverted ? currentScale.domain() : [...currentScale.domain()].reverse())
      }

      transform = transform.translate(0, -currentScale(from));
    }

    currentElement.transition().call(currentZoom.transform, transform, null, new MouseEvent('setZoom'))
  }

  resetZoom(axisIndex = 0, axisOrientation = AxisOrientation.x) {

    const hash = objectHash.sha1({index: axisIndex, orientation: axisOrientation});

    if (!this.zoomHashMap.has(hash)) {
      return;
    }

    const currentElement = this.elementHashMap.get(hash);
    const currentZoom = this.zoomHashMap.get(hash);

    currentElement.transition().call(currentZoom.transform, zoomIdentity, null, new MouseEvent('resetZoom'));
  }

}
