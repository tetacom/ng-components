import {BasePoint} from '../../model/base-point';
import {SeriesBaseComponent} from '../../base/series-base.component';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, map, Observable, tap, withLatestFrom} from 'rxjs';
import {ChartService} from '../../service/chart.service';
import {ScaleService} from '../../service/scale.service';
import {ZoomService} from '../../service/zoom.service';
import * as d3 from 'd3';
import {DragPointType} from '../../model/enum/drag-point-type';
import {TooltipTracking} from '../../model/enum/tooltip-tracking';
import {ClipPointsDirection} from '../../model/enum/clip-points-direction';
import {Axis} from "../../core/axis/axis";
import {IScalesMap} from "../../model/i-scales-map";

@Component({
  template: '',
})
export class LinearSeriesBase<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit, OnDestroy {

  public defaultClipPointsMapping: Map<ClipPointsDirection, (min: number, max: number) => (point: BasePoint, idx: number, arr: Array<BasePoint>) => {}> = new Map();

  transform: Observable<Pick<BasePoint, 'x' | 'y'>>;
  display: Observable<number>;
  path: Observable<string>;
  svgElement: SVGGeometryElement;
  x: any;
  y: any;
  markers: any;

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
    const filterX = (min: number, max: number) => (
      point: BasePoint,
      idx: number,
      arr: Array<BasePoint>
    ) => {
      const bigger = min > max ? min : max;
      const smaller = min > max ? max : min;
      return (point.x <= bigger ||
          point.x1 <= bigger ||
          (arr[idx - 1] && arr[idx - 1].x <= bigger) ||
          (arr[idx - 1] && arr[idx - 1].x1 <= bigger)) &&
        (point.x >= smaller ||
          point.x1 >= smaller ||
          (arr[idx + 1] && arr[idx + 1].x >= smaller) ||
          (arr[idx + 1] && arr[idx + 1].x1 >= smaller))
        ;
    };

    const filterY = (min: number, max: number) => (
      point: BasePoint,
      idx: number,
      arr: Array<BasePoint>
    ) => {
      const bigger = min > max ? min : max;
      const smaller = min > max ? max : min;
      return (point.y <= bigger ||
          point.y1 <= bigger ||
          (arr[idx - 1] && arr[idx - 1].y <= bigger) ||
          (arr[idx - 1] && arr[idx - 1].y1 <= bigger)) &&
        (point.y >= smaller ||
          point.y1 >= smaller ||
          (arr[idx + 1] && arr[idx + 1].y >= smaller) ||
          (arr[idx + 1] && arr[idx + 1].y1 >= smaller));
    };

    this.defaultClipPointsMapping.set(ClipPointsDirection.x, filterX);
    this.defaultClipPointsMapping.set(ClipPointsDirection.y, filterY);

    this.transform = this.svc.pointerMove.pipe(
      withLatestFrom(this.scaleService.scales),
      map((data: [PointerEvent, IScalesMap]) => {
        const [event, {x, y}] = data;

        return this.getTransform(event, x.get(this.series.xAxisIndex).scale, y.get(this.series.yAxisIndex).scale);
      }),
      tap(() => setTimeout(() => this.cdr.detectChanges()))
    );

    this.path = this.scaleService.scales.pipe(
      map((data) => {
        const {x, y} = data;
        this.x = x.get(this.series.xAxisIndex).scale;
        this.y = y.get(this.series.yAxisIndex).scale;

        const filter = this.defaultClipPointsMapping.get(this.series.clipPointsDirection);

        const line = d3
          .line<BasePoint>()
          .defined(
            (point) =>
              point.x !== null &&
              point.y !== null &&
              point.x !== undefined &&
              point.y !== undefined &&
              !isNaN(point.x) &&
              !isNaN(point.y)
          )
          .x((point) => this.x(point.x))
          .y((point) => this.y(point.y));

        let filteredData = this.series.data;

        if (this.series.clipPointsDirection === ClipPointsDirection.x) {
          let [min, max] = this.x.domain();

          min = min instanceof Date ? min.getTime() : min;
          max = max instanceof Date ? max.getTime() : max;

          filteredData = filteredData?.filter(filter(min, max));
        }


        if (this.series.clipPointsDirection === ClipPointsDirection.y) {
          let [min, max] = this.y.domain();

          min = min instanceof Date ? min.getTime() : min;
          max = max instanceof Date ? max.getTime() : max;

          filteredData = filteredData?.filter(filter(min, max));
        }

        return line(filteredData);
      })
    );
  }

  ngOnDestroy() {
    this.markers?.on('start drag end', null);
    this.svc.setTooltip({
      point: null,
      series: this.series,
    });
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
    this.markers = d3
      .drag()
      .subject(function (event, d: BasePoint) {
        const node = d3.select(this);
        return {x: node.attr('cx'), y: node.attr('cy')};
      });
    const dragMarkers =
      this.markers.on(
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
    scaleX: any,
    scaleY: any
  ): Pick<BasePoint, 'x' | 'y'> {
    if (event.type === 'mouseleave') {
      return null;
    }
    const mouse = [event?.offsetX, event?.offsetY];

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

      let x0 = scaleX.invert(pointer);
      if (x0 instanceof Date) {
        x0 = x0.getTime();
      }
      const rightId = bisect(this.series.data, x0);
      const range = scaleY.range();

      const intersect = lineIntersection(
        pointer,
        range[0],
        pointer,
        range[1],
        scaleX(this.series.data[rightId - 1]?.x),
        scaleY(this.series.data[rightId - 1]?.y),
        scaleX(this.series.data[rightId]?.x),
        scaleY(this.series.data[rightId]?.y)
      );
      const x = scaleX.invert(intersect.x);
      const y = scaleY.invert(intersect.y);
      if (x !== null && x !== undefined && !isNaN(x) && y !== null && y !== undefined && !isNaN(y)) {
        this.svc.setTooltip({
          point: {x: scaleX.invert(intersect.x), y: scaleY.invert(intersect.y)},
          series: this.series,
        });
      } else {
        this.svc.setTooltip({
          point: null,
          series: this.series,
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
      const rightId = bisect(this.series.data, y0);
      const range = scaleX.range();

      const intersect = lineIntersection(
        range[0],
        mouse[1],
        range[1],
        mouse[1],
        scaleX(this.series.data[rightId - 1]?.x),
        scaleY(this.series.data[rightId - 1]?.y),
        scaleX(this.series.data[rightId]?.x),
        scaleY(this.series.data[rightId]?.y)
      );

      const x = scaleX.invert(intersect.x);
      const y = scaleY.invert(intersect.y);

      if (x !== null && x !== undefined && !isNaN(x) && y !== null && y !== undefined && !isNaN(y)) {
        this.svc.setTooltip({
          point: {x: scaleX.invert(intersect.x), y: scaleY.invert(intersect.y)},
          series: this.series,
        });
      } else {
        this.svc.setTooltip({
          point: null,
          series: this.series,
        });
      }

      return {
        x: intersect.x,
        y: intersect.y,
      };
    }
  }
}
