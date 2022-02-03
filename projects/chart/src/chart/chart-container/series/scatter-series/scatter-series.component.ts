import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {BasePoint} from '../../../model/base-point';
import {SeriesBaseComponent} from '../../../base/series-base.component';
import {map, Observable, tap, withLatestFrom} from 'rxjs';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import * as d3 from 'd3';
import {TooltipTracking} from '../../../model/enum/tooltip-tracking';

@Component({
  selector: 'svg:svg[teta-scatter-series]',
  templateUrl: './scatter-series.component.html',
  styleUrls: ['./scatter-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScatterSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit {
  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;
  path: Observable<string>;
  svgElement: SVGGeometryElement;
  x: Observable<any>;
  y: Observable<any>;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService, element);
  }

  override ngOnInit(): void {
    this.transform = this.svc.pointerMove.pipe(
      withLatestFrom(this.scaleService.xScaleMap, this.scaleService.yScaleMap),
      map(
        (
          data: [
            PointerEvent,
            Map<number, any>,
            Map<number, any>
          ]
        ) => {
          const [event, x, y] = data;

          return this.getTransform(event, x, y);
        }
      ),
      tap(() => this.cdr.detectChanges())
    );

    this.x = this.scaleService.xScaleMap.pipe(map(_ => _.get(this.series.xAxisIndex)));
    this.y = this.scaleService.yScaleMap.pipe(map(_ => _.get(this.series.yAxisIndex)));
  }

  ngAfterViewInit() {
  }

  getMarkers() {
    return this.series.data?.filter((_) => _?.marker);
  }

  getTransform(
    event: any,
    x: Map<number, any>,
    y: Map<number, any>
  ): Pick<BasePoint, 'x' | 'y'> {
    const mouse = [event?.offsetX, event?.offsetY];

    const foundX = x.get(this.series.xAxisIndex);
    const foundY = y.get(this.series.yAxisIndex);

    const tooltipTracking = this.config?.tooltip?.tracking;

    const lineIntersection = (
      p0_x,
      p0_y,
      p1_x,
      p1_y,
      p2_x,
      p2_y,
      p3_x,
      p3_y
    ) => {
      const rV = {} as any;
      let s1_x, s1_y, s2_x, s2_y;
      s1_x = p1_x - p0_x;
      s1_y = p1_y - p0_y;
      s2_x = p3_x - p2_x;
      s2_y = p3_y - p2_y;

      let s, t;
      s =
        (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) /
        (-s2_x * s1_y + s1_x * s2_y);
      t =
        (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) /
        (-s2_x * s1_y + s1_x * s2_y);

      if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        // Collision detected
        rV.x = p0_x + t * s1_x;
        rV.y = p0_y + t * s1_y;
      }

      return rV;
    };

    if (tooltipTracking === TooltipTracking.x) {
      const bisect = d3.bisector((_: BasePoint) => _.x).right;
      const pointer = mouse[0];

      const x0 = foundX.invert(pointer);

      const rightId = bisect(this.series.data, x0);

      const range = foundY.range();

      const intersect = lineIntersection(
        pointer,
        range[0],
        pointer,
        range[1],
        foundX(this.series.data[rightId - 1]?.x),
        foundY(this.series.data[rightId - 1]?.y),
        foundX(this.series.data[rightId]?.x),
        foundY(this.series.data[rightId]?.y)
      );
      this.svc.setTooltip({
        point: {x: foundX.invert(intersect.x), y: foundY.invert(intersect.y)},
        series: this.series,
      });

      return {
        x: intersect.x,
        y: intersect.y,
      };
    }

    if (tooltipTracking === TooltipTracking.y) {
      const bisect = d3.bisector((_: BasePoint) => _.y).right;

      const y0 = foundY.invert(mouse[1]);

      const rightId = bisect(this.series.data, y0);
      const range = foundX.range();

      const intersect = lineIntersection(
        range[0],
        mouse[1],
        range[1],
        mouse[1],
        foundX(this.series.data[rightId - 1]?.x),
        foundY(this.series.data[rightId - 1]?.y),
        foundX(this.series.data[rightId]?.x),
        foundY(this.series.data[rightId]?.y)
      );

      this.svc.setTooltip({
        point: {
          x: foundX.invert(intersect.x),
          y: foundY.invert(intersect.y),
        },
        series: this.series,
      });

      return {
        x: intersect.x,
        y: intersect.y,
      };
    }
  }
}
