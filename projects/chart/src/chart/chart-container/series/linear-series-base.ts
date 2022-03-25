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
import {ClipPointsDirection} from "../../model/enum/clip-points-direction";

@Component({
  template: '',
})
export class LinearSeriesBase<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit, AfterViewInit, OnDestroy {

  public defaultClipPointsMapping: Map<ClipPointsDirection, (min: number, max: number) => (point: BasePoint, idx: number, arr: Array<BasePoint>) => {}> = new Map()

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
    ) =>
      (point.x <= max ||
        point.x1 <= max ||
        (arr[idx - 1] && arr[idx - 1].x <= max) ||
        (arr[idx - 1] && arr[idx - 1].x1 <= max)) &&
      (point.x >= min ||
        point.x1 >= min ||
        (arr[idx + 1] && arr[idx + 1].x >= min) ||
        (arr[idx + 1] && arr[idx + 1].x1 >= min))

    const filterY = (min: number, max: number) => (
      point: BasePoint,
      idx: number,
      arr: Array<BasePoint>
    ) => (point.y <= max ||
        point.y1 <= max ||
        (arr[idx - 1] && arr[idx - 1].y <= max) ||
        (arr[idx - 1] && arr[idx - 1].y1 <= max)) &&
      (point.y >= min ||
        point.y1 >= min ||
        (arr[idx + 1] && arr[idx + 1].y >= min) ||
        (arr[idx + 1] && arr[idx + 1].y1 >= min));

    this.defaultClipPointsMapping.set(ClipPointsDirection.x, filterX);
    this.defaultClipPointsMapping.set(ClipPointsDirection.y, filterY);

    this.transform = this.svc.pointerMove.pipe(
      withLatestFrom(this.scaleService.xScaleMap, this.scaleService.yScaleMap),
      map((data: [PointerEvent, Map<number, any>, Map<number, any>]) => {
        const [event, x, y] = data;

        return this.getTransform(event, x, y);
      }),
      tap(() => setTimeout(() => this.cdr.detectChanges()))
    );

    this.path = combineLatest([
      this.scaleService.xScaleMap,
      this.scaleService.yScaleMap,
    ]).pipe(
      map((data: [Map<number, any>, Map<number, any>]) => {
        const [x, y] = data;
        this.x = x.get(this.series.xAxisIndex);
        this.y = y.get(this.series.yAxisIndex);

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

        if(this.series.clipPointsDirection === ClipPointsDirection.x) {
          let [min, max] = this.x.domain();

          min = min instanceof Date ? min.getTime() : min;
          max = max instanceof Date ? max.getTime() : max;

          filteredData = filteredData?.filter(filter(min, max));
        }


        if(this.series.clipPointsDirection === ClipPointsDirection.y) {
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
    scaleX: Map<number, any>,
    scaleY: Map<number, any>
  ): Pick<BasePoint, 'x' | 'y'> {
    if (event.type === 'mouseleave') {
      return null;
    }
    const mouse = [event?.offsetX, event?.offsetY];
    const foundX = scaleX.get(this.series.xAxisIndex);
    const foundY = scaleY.get(this.series.yAxisIndex);
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

      let x0 = foundX.invert(pointer);
      if (x0 instanceof Date) {
        x0 = x0.getTime();
      }
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
      const x = foundX.invert(intersect.x);
      const y = foundY.invert(intersect.y);
      if (x !== null && x !== undefined && !isNaN(x) && y !== null && y !== undefined && !isNaN(y)) {
        this.svc.setTooltip({
          point: {x: foundX.invert(intersect.x), y: foundY.invert(intersect.y)},
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

      let y0 = foundY.invert(mouse[1]);
      if (y0 instanceof Date) {
        y0 = y0.getTime();
      }
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

      const x = foundX.invert(intersect.x);
      const y = foundY.invert(intersect.y);

      if (x !== null && x !== undefined && !isNaN(x) && y !== null && y !== undefined && !isNaN(y)) {
        this.svc.setTooltip({
          point: {x: foundX.invert(intersect.x), y: foundY.invert(intersect.y)},
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
