import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { ChartService } from '../../../service/chart.service';
import { ScaleService } from '../../../service/scale.service';
import { ZoomService } from '../../../service/zoom.service';
import { combineLatest, map, Observable, tap, withLatestFrom } from 'rxjs';
import * as d3 from 'd3';
import { DragPointType } from '../../../model/enum/drag-point-type';
import { TooltipTracking } from '../../../model/enum/tooltip-tracking';
import { FillType } from '../../../model/enum/fill-type';
import { Axis } from '../../../core/axis/axis';

@Component({
  selector: 'svg:svg[teta-area-series]',
  templateUrl: './area-series.component.html',
  styleUrls: ['./area-series.component.scss'],
})
export class AreaSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit
{
  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;
  path: Observable<string>;
  svgElement: SVGGeometryElement;
  x: any;
  y: any;
  id: string;

  fillType = FillType;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService, element);

    this.id = (Date.now() + Math.random()).toString(36);
  }

  override ngOnInit(): void {
    this.transform = this.svc.pointerMove.pipe(
      withLatestFrom(this.scaleService.xScaleMap, this.scaleService.yScaleMap),
      map((data: [PointerEvent, Map<number, any>, Map<number, any>]) => {
        const [event, x, y] = data;

        return this.getTransform(event, x, y);
      }),
      tap(() => this.cdr.detectChanges())
    );

    this.path = combineLatest([
      this.scaleService.xScaleMap,
      this.scaleService.yScaleMap,
    ]).pipe(
      withLatestFrom(this.scaleService.xAxisMap, this.scaleService.yAxisMap),
      map(
        (
          data: [
            [Map<number, any>, Map<number, any>],
            Map<number, Axis>,
            Map<number, Axis>
          ]
        ) => {
          const [[x, y], xAxisMap, yAxisMap] = data;

          this.x = x.get(this.series.xAxisIndex);
          this.y = y.get(this.series.yAxisIndex);

          const yAxis = yAxisMap.get(this.series.yAxisIndex);
          const xAxis = xAxisMap.get(this.series.xAxisIndex);

          const domain = this.config.inverted
            ? this.x.domain()
            : this.y.domain();

          const area = d3
            .area<BasePoint>()
            .defined(
              (point) =>
                point.x !== null &&
                point.y !== null &&
                !isNaN(point.x) &&
                !isNaN(point.y)
            );

          if (this.config.inverted) {
            area
              .y((point) => this.y(point.y))
              .x0((_) =>
                this.x(xAxis.options?.inverted ? domain[1] : domain[0])
              )
              .x1((point) => this.x(point.x));
          } else {
            area
              .x((point) => this.x(point.x))
              .y0((_) =>
                this.y(yAxis.options?.inverted ? domain[0] : domain[1])
              )
              .y1((point) => this.y(point.y));
          }

          return area(this.series.data);
        }
      )
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

      const filtered = this.series.data.filter(
        (_) => _.y !== null && _.x !== null
      );

      const rightId = bisect(filtered, x0);

      const range = foundY.range();

      const intersect = lineIntersection(
        pointer,
        range[0],
        pointer,
        range[1],
        foundX(filtered[rightId - 1]?.x),
        foundY(filtered[rightId - 1]?.y),
        foundX(filtered[rightId]?.x),
        foundY(filtered[rightId]?.y)
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
