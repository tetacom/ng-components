import {combineLatest, BehaviorSubject, Observable, shareReplay, Subscription, filter,} from 'rxjs';
import {AxisOrientation} from '../model/enum/axis-orientation';
import {Injectable, OnDestroy} from '@angular/core';
import {ZoomMessage} from '../model/i-broadcast-message';
import {zoomIdentity} from 'd3';
import {BroadcastService} from './broadcast.service';
import {ChartService} from './chart.service';

@Injectable({
  providedIn: 'root',
})
export class ZoomService implements OnDestroy {
  zoomed: Observable<ZoomMessage>;

  private zoomed$ = new BehaviorSubject<ZoomMessage>(null);
  private broadcastChannel: string;
  private broadcastSub: Subscription;

  constructor(private _broadcast: BroadcastService, private _chart: ChartService) {
    this.zoomed = this.zoomed$.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }

  fireZoom(zoom: ZoomMessage) {
    this.zoomed$.next(zoom);
  }

  broadcastZoom(zoom: ZoomMessage) {
    if (this.broadcastChannel?.length) {
      this._broadcast.broadcastZoom({
        channel: this.broadcastChannel,
        message: zoom
      });
    }
  }

  setBroadcastChannel(channel: string) {
    if (this.broadcastSub) {
      this.broadcastSub?.unsubscribe();
    }
    this.broadcastChannel = channel;
    if (this.broadcastChannel?.length) {
      this.broadcastSub = combineLatest([this._broadcast.subscribeToZoom(this.broadcastChannel), this._chart.config])
        .pipe(filter(([zoom, config]) => {
          return zoom.message?.chartId !== config.id;
        }))
        .subscribe(([zoom, config]) => {
          this.fireZoom(zoom.message);
        });
    }
  }

  getD3Transform(targetDomain: [number, number],
                 originalDomain: [number, number],
                 scale,
                 orientation: AxisOrientation,
                 inverted: boolean) {
    const zoomScale = Math.abs(scale(originalDomain[1]) - scale(originalDomain[0])) / Math.abs(scale(targetDomain[1]) - scale(targetDomain[0]));
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

  ngOnDestroy() {
    this.broadcastSub?.unsubscribe();
  }
}
