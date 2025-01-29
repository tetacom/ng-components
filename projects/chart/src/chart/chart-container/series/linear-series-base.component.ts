import { Component, computed, OnDestroy, signal } from '@angular/core';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

import { SeriesBaseComponent } from '../../base/series-base.component';
import { BasePoint } from '../../model/base-point';
import { ClipPointsDirection } from '../../model/enum/clip-points-direction';
import { TooltipTracking } from '../../model/enum/tooltip-tracking';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  template: '',
  standalone: true,
})
export class LinearSeriesBaseComponent<T extends BasePoint> extends SeriesBaseComponent<T> implements OnDestroy {
  pointerMove = toSignal(this.svc.pointerMove);
  transform = computed(() => {
    const event = this.pointerMove();
    return this.getTransform(event, this.x(), this.y());
  });

  public defaultClipPointsMapping = new Map<
    ClipPointsDirection,
    (min: number, max: number) => (point: BasePoint, idx: number, arr: Array<BasePoint>) => boolean
  >();

  display: Observable<number>;

  markers = computed(() => {
    return this.series().data?.filter(
      (_) => _?.marker && _?.x !== undefined && _?.y !== undefined && _?.x !== null && _?.y !== null,
    );
  });

  path = computed(() => {
    this.update();
    if (!this.x() || !this.y()) {
      return '';
    }

    const filter = this.defaultClipPointsMapping.get(this.series().clipPointsDirection);

    const line = d3
      .line<BasePoint>()
      .defined(
        (point) =>
          point.x !== null &&
          point.y !== null &&
          point.x !== undefined &&
          point.y !== undefined &&
          !isNaN(point.x) &&
          !isNaN(point.y),
      )
      .x((point) => this.x()(point.x))
      .y((point) => this.y()(point.y));

    let filteredData = this.series().data;

    if (this.series().clipPointsDirection === ClipPointsDirection.x) {
      let [min, max] = this.x().domain();

      min = min instanceof Date ? min.getTime() : min;
      max = max instanceof Date ? max.getTime() : max;

      filteredData = filteredData?.filter(filter(min, max));
    }

    if (this.series().clipPointsDirection === ClipPointsDirection.y) {
      let [min, max] = this.y().domain();

      min = min instanceof Date ? min.getTime() : min;
      max = max instanceof Date ? max.getTime() : max;

      filteredData = filteredData?.filter(filter(min, max));
    }

    return line(filteredData);
  });

  protected update = signal<unknown>(null);

  constructor() {
    super();
    const filterX = (min: number, max: number) => (point: BasePoint, idx: number, arr: Array<BasePoint>) => {
      const bigger = min > max ? min : max;
      const smaller = min > max ? max : min;
      return (
        (point.x <= bigger ||
          point.x1 <= bigger ||
          (arr[idx - 1] && arr[idx - 1].x <= bigger) ||
          (arr[idx - 1] && arr[idx - 1].x1 <= bigger)) &&
        (point.x >= smaller ||
          point.x1 >= smaller ||
          (arr[idx + 1] && arr[idx + 1].x >= smaller) ||
          (arr[idx + 1] && arr[idx + 1].x1 >= smaller))
      );
    };

    const filterY = (min: number, max: number) => (point: BasePoint, idx: number, arr: Array<BasePoint>) => {
      const bigger = min > max ? min : max;
      const smaller = min > max ? max : min;
      return (
        (point.y <= bigger ||
          point.y1 <= bigger ||
          (arr[idx - 1] && arr[idx - 1].y <= bigger) ||
          (arr[idx - 1] && arr[idx - 1].y1 <= bigger)) &&
        (point.y >= smaller ||
          point.y1 >= smaller ||
          (arr[idx + 1] && arr[idx + 1].y >= smaller) ||
          (arr[idx + 1] && arr[idx + 1].y1 >= smaller))
      );
    };

    this.defaultClipPointsMapping.set(ClipPointsDirection.x, filterX);
    this.defaultClipPointsMapping.set(ClipPointsDirection.y, filterY);
  }

  ngOnDestroy() {
    this.svc.setTooltip({
      point: null,
      series: this.series(),
    });
  }

  getTransform(event: any, scaleX: any, scaleY: any): Pick<BasePoint, 'x' | 'y'> {
    if (!scaleX || !scaleY) {
      return null;
    }
    if (event && event.type === 'mouseleave') {
      return null;
    }
    const mouse = [event?.offsetX, event?.offsetY];

    const tooltipTracking = this.config()?.tooltip?.tracking;
    const lineIntersection = (
      p0_x: number,
      p0_y: number,
      p1_x: number,
      p1_y: number,
      p2_x: number,
      p2_y: number,
      p3_x: number,
      p3_y: number,
    ) => {
      const rV = {} as any;
      const s1_x = p1_x - p0_x;
      const s1_y = p1_y - p0_y;
      const s2_x = p3_x - p2_x;
      const s2_y = p3_y - p2_y;

      const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
      const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

      if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        rV.x = p0_x + t * s1_x;
        rV.y = p0_y + t * s1_y;
      }

      return rV;
    };

    if (tooltipTracking === TooltipTracking.x) {
      const bisect = d3.bisector((_: BasePoint) => _.x).right;
      const pointer = mouse[0];

      let x0 = scaleX.invert(pointer);
      if (x0 instanceof Date) {
        x0 = x0.getTime();
      }
      const rightId = bisect(this.series().data, x0);
      const range = scaleY.range();
      const intersect = lineIntersection(
        pointer,
        range[0],
        pointer,
        Number.MAX_SAFE_INTEGER,
        scaleX(this.series().data[rightId - 1]?.x),
        scaleY(this.series().data[rightId - 1]?.y),
        scaleX(this.series().data[rightId]?.x),
        scaleY(this.series().data[rightId]?.y),
      );
      const x = scaleX.invert(intersect.x);
      const y = scaleY.invert(intersect.y);
      if (x !== null && x !== undefined && !isNaN(x) && y !== null && y !== undefined && !isNaN(y)) {
        this.svc.setTooltip({
          point: {
            x: scaleX.invert(intersect.x),
            y: scaleY.invert(intersect.y),
          },
          series: this.series(),
        });
      } else {
        this.svc.setTooltip({
          point: null,
          series: this.series(),
        });
      }

      return {
        x: intersect.x,
        y: intersect.y,
      };
    }

    if (tooltipTracking === TooltipTracking.y) {
      const bisect = d3.bisector((_: BasePoint) => _.y).right;

      let y0 = scaleY.invert(mouse[1]);
      if (y0 instanceof Date) {
        y0 = y0.getTime();
      }
      const rightId = bisect(this.series().data, y0);
      const range = scaleX.range();

      const intersect = lineIntersection(
        range[0],
        mouse[1],
        Number.MAX_SAFE_INTEGER,
        mouse[1],
        scaleX(this.series().data[rightId - 1]?.x),
        scaleY(this.series().data[rightId - 1]?.y),
        scaleX(this.series().data[rightId]?.x),
        scaleY(this.series().data[rightId]?.y),
      );

      const x = scaleX.invert(intersect.x);
      const y = scaleY.invert(intersect.y);

      if (x !== null && x !== undefined && !isNaN(x) && y !== null && y !== undefined && !isNaN(y)) {
        this.svc.setTooltip({
          point: {
            x: scaleX.invert(intersect.x),
            y: scaleY.invert(intersect.y),
          },
          series: this.series(),
        });
      } else {
        this.svc.setTooltip({
          point: null,
          series: this.series(),
        });
      }

      return {
        x: intersect.x,
        y: intersect.y,
      };
    }
    return null;
  }
}
