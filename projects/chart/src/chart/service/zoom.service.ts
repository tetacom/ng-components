import { ElementRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { D3ZoomEvent } from 'd3';
import { ScaleService } from './scale.service';
import { Observable, Subject } from 'rxjs';
import { IChartEvent } from '../model/i-chart-event';
import { ZoomType } from '../model/enum/zoom-type';
import { IChartConfig } from '../model/i-chart-config';
@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  zoomed: Observable<IChartEvent>;
  private zoomed$ = new Subject<IChartEvent>();

  private x = new Map<number | string, any>();
  private y = new Map<number | string, any>();

  private zoom;
  private svg;

  constructor(private scaleService: ScaleService) {
    this.zoomed = this.zoomed$.asObservable();
  }

  applyZoom(svgElement: ElementRef, config: IChartConfig) {
    this.x = new Map(this.scaleService.xScales);
    this.y = new Map(this.scaleService.yScales);

    this.svg = d3.select(svgElement.nativeElement);

    const zoomType = config?.zoom?.type;
    const enable = config?.zoom?.enable;

    const zoomed = (event: D3ZoomEvent<any, any>) => {
      const { transform } = event;

      if (zoomType === ZoomType.x || zoomType === ZoomType.xy) {
        for (let [index, scale] of this.x.entries()) {
          this.scaleService.xScales.set(index, transform.rescaleX(scale));
        }
      }

      if (zoomType === ZoomType.y || zoomType === ZoomType.xy) {
        for (let [index, scale] of this.y.entries()) {
          this.scaleService.yScales.set(index, transform.rescaleY(scale));
        }
      }

      if (enable) {
        this.zoomed$.next({ event });
      }
    };

    if (enable) {
      this.zoom = d3.zoom().on('start zoom end', zoomed);
      this.svg.call(this.zoom);
    }
  }

  setTransform(transform: d3.ZoomTransform) {
    this.svg.call(this.zoom.transform, transform);
  }
}
