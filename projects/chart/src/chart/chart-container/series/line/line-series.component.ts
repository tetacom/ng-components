import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { ChartService } from '../../../service/chart.service';
import { BasePoint } from '../../../model/base-point';
import { ScaleService } from '../../../service/scale.service';
import { filter, map, Observable, tap } from 'rxjs';

import { ZoomService } from '../../../service/zoom.service';
import { TooltipTracking } from '../../../model/enum/tooltip-tracking';
import { DragPointType } from '../../../model/enum/drag-point-type';

@Component({
  selector: 'svg:svg[teta-line-series]',
  templateUrl: './line-series.component.html',
  styleUrls: ['./line-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit
{
  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;

  svgElement: SVGGeometryElement;
  x: any;
  y: any;

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
    this.display = this.zoomService.zoomed.pipe(
      map(({ event }) => {
        return event?.type === 'end' ? 1 : 0;
      })
    );

    this.transform = this.svc.pointerMove.pipe(
      filter(({ event }) => event),
      map(({ event }) => {
        return this.getTransform(event);
      }),
      tap((_) => this.cdr.detectChanges())
    );
  }

  ngAfterViewInit() {
    const drag = (node, event: d3.D3DragEvent<any, any, any>, d: BasePoint) => {
      if (
        d.marker?.dragType === DragPointType.x ||
        d.marker?.dragType === DragPointType.xy
      ) {
        d.x = this.x.invert(event.x);
      }

      if (
        d.marker?.dragType === DragPointType.y ||
        d.marker?.dragType === DragPointType.xy
      ) {
        d.y = this.y.invert(event.y);
      }

      this.svc.emitPoint({
        target: {
          series: this.series,
          point: d,
        },
        event,
      });

      this.cdr.detectChanges();
    };

    const dragMarkers = d3
      .drag()
      .subject(function (event, d: BasePoint) {
        const node = d3.select(this);
        return { x: node.attr('cx'), y: node.attr('cy') };
      })
      .on(
        'start drag end',
        function (event: d3.D3DragEvent<any, any, any>, d: BasePoint) {
          const node = d3.select(this);

          drag(node, event, d);
        }
      );

    const draggableMarkers = this.series.data?.filter(
      (_) => _?.marker && _?.marker?.draggable
    );

    const element = d3
      .select(this.element.nativeElement)
      .selectAll('.draggable-marker')
      .data(draggableMarkers);

    element.call(dragMarkers as any);

    this.svgElement = d3
      .select(this.element.nativeElement)
      .select('.line')
      .node() as SVGGeometryElement;
  }

  getPath() {
    this.x = this.scaleService.xScales.get(this.series.xAxisIndex);
    this.y = this.scaleService.yScales.get(this.series.yAxisIndex);

    const line = d3
      .line<BasePoint>()
      .defined((point) => point.x !== null || point.y !== null)
      .x((point) => this.x(point.x))
      .y((point) => this.y(point.y));

    const path = line(this.series.data);

    return path;
  }

  getMarkers() {
    return this.series.data?.filter((_) => _?.marker);
  }

  getTransform(event: any): Pick<BasePoint, 'x' | 'y'> {
    const mouse = d3.pointer(event);

    const foundX = this.scaleService.xScales.get(this.series.xAxisIndex);
    const foundY = this.scaleService.yScales.get(this.series.yAxisIndex);

    const tooltipTracking = this.svc.config?.tooltip?.tracking;

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

      const x0 = foundX.invert(mouse[0]);
      const rightId = bisect(this.series.data, x0);

      const range = foundY.range();

      const intersect = lineIntersection(
        mouse[0],
        range[0],
        mouse[0],
        range[1],
        foundX(this.series.data[rightId - 1]?.x),
        foundY(this.series.data[rightId - 1]?.y),
        foundX(this.series.data[rightId]?.x),
        foundY(this.series.data[rightId]?.y)
      );

      console.log(intersect);

      this.svc.setTooltip({
        point: { x: foundX.invert(intersect.x), y: foundY.invert(intersect.y) },
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
        point: { x: foundX.invert(intersect.x), y: foundY.invert(intersect.y) },
        series: this.series,
      });

      return {
        x: intersect.x,
        y: intersect.y,
      };
    }
  }
}
