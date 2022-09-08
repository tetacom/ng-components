import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay,} from 'rxjs';
import {Axis} from '../core/axis/axis';
import {IChartEvent} from '../model/i-chart-event';
import {ZoomBehavior, zoomIdentity} from 'd3';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {ScaleType} from '../model/enum/scale-type';
import objectHash from 'object-hash';
import {ZoomMessage} from '../model/i-broadcast-message';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  broadcastSubscription = [];
  zoomed: Observable<ZoomMessage>;
  // axisHashMap = new Map<string, Axis>();
  // scaleHashMap = new Map<string, any>();
  // elementHashMap = new Map<string, any>();
  // zoomHashMap = new Map<string, ZoomBehavior<any, any>>();

  private zoomed$ = new BehaviorSubject<ZoomMessage>(null);
  private broadcastChannel: string;

  constructor() {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }

  fireZoom(zoom: ZoomMessage) {
    this.zoomed$.next(zoom);
  }

  setBroadcastChannel(channel: string) {
    this.broadcastChannel = channel;
  }

  setZoom(from: number, to: number, axisIndex = 0, axisOrientation = AxisOrientation.x) {
    //
    // const hash = objectHash.sha1({index: axisIndex, orientation: axisOrientation});
    //
    // if (!this.zoomHashMap.has(hash)) {
    //   return;
    // }
    //
    // const currentAxis = this.axisHashMap.get(hash);
    // const currentScale = this.scaleHashMap.get(hash);
    // const currentElement = this.elementHashMap.get(hash);
    // const currentZoom = this.zoomHashMap.get(hash);
    //
    // currentScale.domain(currentAxis.originDomain)
    //
    // if (axisOrientation === AxisOrientation.x) {
    //   if (currentAxis.options.scaleType.type === ScaleType.log) {
    //     currentScale.domain(currentAxis.options.inverted ? [...currentAxis.originDomain].reverse() : currentAxis.originDomain)
    //   }
    // }
    //
    // if (axisOrientation === AxisOrientation.y) {
    //   if (currentAxis.options.scaleType.type === ScaleType.log) {
    //     currentScale.domain(currentAxis.options.inverted ? currentAxis.originDomain : [...currentAxis.originDomain].reverse())
    //   }
    // }
    //
    // const delta = Math.abs(currentScale(to) - currentScale(from));
    // const scale = currentScale.range()[1] / delta;
    //
    // let transform = zoomIdentity.scale(scale);
    //
    // if (currentAxis.orientation === AxisOrientation.x) {
    //   if (currentAxis.options.scaleType.type === ScaleType.log) {
    //     currentScale.domain(currentAxis.options.inverted ? [...currentScale.domain()].reverse() : currentScale.domain())
    //   }
    //   transform = transform.translate(-currentScale(from), 0);
    // }
    //
    // if (currentAxis.orientation === AxisOrientation.y) {
    //   if (currentAxis.options.scaleType.type === ScaleType.log) {
    //     currentScale.domain(currentAxis.options.inverted ? currentScale.domain() : [...currentScale.domain()].reverse())
    //   }
    //   transform = transform.translate(0, -currentScale(from));
    // }
    // currentElement.transition().call(currentZoom.transform, transform, null, new MouseEvent('setZoom'))
  }

  resetZoom(axisIndex = 0, axisOrientation = AxisOrientation.x) {
    // const hash = objectHash.sha1({index: axisIndex, orientation: axisOrientation});
    // if (!this.zoomHashMap.has(hash)) {
    //   return;
    // }
    // const currentElement = this.elementHashMap.get(hash);
    // const currentZoom = this.zoomHashMap.get(hash);
    // currentElement.transition().call(currentZoom.transform, zoomIdentity, null, new MouseEvent('resetZoom'));
  }

  getD3Transform(targetDomain: [number, number],
                 originalDomain: [number, number],
                 scale,
                 orientation: AxisOrientation,
                 inverted: boolean) {
    const zoomScale = Math.abs(originalDomain[1] - originalDomain[0]) / Math.abs(targetDomain[1] - targetDomain[0]);
    let transform = zoomIdentity.scale(zoomScale);
    if (orientation === AxisOrientation.x) {
      if (!!inverted) {
        transform = transform.translate(-scale(Math.max(...targetDomain)), 0);
      } else {
        transform = transform.translate(-scale(Math.min(...targetDomain)), 0);
      }
    }

    if (orientation === AxisOrientation.y) {
      if (!!inverted) {
        transform = transform.translate(0, -scale(Math.min(...targetDomain)));
      } else {
        transform = transform.translate(0, -scale(Math.max(...targetDomain)));
      }
    }
    return transform;
  }
}
