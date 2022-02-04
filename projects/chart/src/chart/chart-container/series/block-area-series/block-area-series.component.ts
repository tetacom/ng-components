import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import {SeriesBaseComponent} from '../../../base/series-base.component';
import {BasePoint} from '../../../model/base-point';
import {ChartService} from '../../../service/chart.service';
import {ScaleService} from '../../../service/scale.service';
import {ZoomService} from '../../../service/zoom.service';
import {combineLatest, map, Observable, tap, withLatestFrom} from 'rxjs';
import * as d3 from 'd3';
import {DragPointType} from '../../../model/enum/drag-point-type';
import {TooltipTracking} from '../../../model/enum/tooltip-tracking';
import {FillType} from '../../../model/enum/fill-type';
import {Axis} from '../../../core/axis/axis';
import {curveStepBefore} from 'd3';

@Component({
  selector: 'svg:svg[teta-block-area-series]',
  templateUrl: './block-area-series.component.html',
  styleUrls: ['./block-area-series.component.scss'],
})
export class BlockAreaSeriesComponent<T extends BasePoint>
  extends SeriesBaseComponent<T>
  implements OnInit {
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

          const xAxis = xAxisMap.get(this.series.xAxisIndex);
          const yAxis = yAxisMap.get(this.series.yAxisIndex);

          const xDomain = this.x.domain();
          const yDomain = this.y.domain();

          const area = d3
            .area<BasePoint>()
            .curve(curveStepBefore)
            .defined(
              (point) =>
                point.x !== null &&
                point.y !== null &&
                !isNaN(point.x) &&
                !isNaN(point.y)
            );

          const displayPoints: BasePoint[] = [];

          const xMin = xAxis.options?.inverted ? xDomain[1] : xDomain[0];
          const yMin = yAxis.options?.inverted ? yDomain[1] : yDomain[0];
          if (this.config.inverted) {

            area
              .x0((point) => this.x(xMin))
              .x1((point) => this.x(point.x))
              .y((point) => this.y(point.y))
          } else {
            area
              .x0((point) => this.x(xMin))
              .x1((point) => this.x(point.x))
              .y((point) => this.y(point.y));
          }


          this.series.data.forEach((point: BasePoint, index: number, arr: BasePoint[]) => {
            displayPoints.push({
              x: point.x,
              y: point.y,
              y1: point.y1,
              color: point.color,
              text: point.text,
              iconId: point.iconId,
            });

            displayPoints.push({
              x: xMin,
              y: point.y1,
              y1: point.y1,
              color: point.color,
              text: point.text,
              iconId: point.iconId
            });
          });

          // points.forEach(point => {
          //   displayPoints.push({
          //     x: point.x,
          //     y: point.y,
          //     y1: point.y1,
          //     color: point.color,
          //     text: point.text,
          //     iconId: point.iconId
          //   });
          //   displayPoints.push({
          //     x: min,
          //     y: point.y1,
          //     y1: point.y1,
          //     color: point.color,
          //     text: point.text,
          //     iconId: point.iconId
          //   });
          // });
          //

          return area(displayPoints);
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
        return {x: node.attr('cx'), y: node.attr('cy')};
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

    if (tooltipTracking === TooltipTracking.x) {
      const bisect = d3.bisector((_: BasePoint) => _.x).right;
      const pointer = mouse[0];

      const x0 = foundX.invert(pointer);

      const filtered = this.series.data.filter(
        (_) => _.y !== null && _.x !== null
      );

      const rightId = bisect(filtered, x0);

      this.svc.setTooltip({
        point: {x: filtered[rightId]?.x, y: filtered[rightId]?.y},
        series: this.series,
      });

      return {
        x: foundX(filtered[rightId]?.x),
        y: foundY(filtered[rightId]?.y),
      };
    }

    if (tooltipTracking === TooltipTracking.y) {
      const bisect = d3.bisector((_: BasePoint) => _.y).right;

      const y0 = foundY.invert(mouse[1]);

      const filtered = this.series.data.filter(
        (_) => _.y !== null && _.x !== null
      );

      const rightId = bisect(filtered, y0);

      this.svc.setTooltip({
        point: {
          x: filtered[rightId]?.x,
          y: filtered[rightId]?.y,
        },
        series: this.series,
      });

      return {
        x: foundX(filtered[rightId]?.x),
        y: foundY(filtered[rightId]?.y),
      };
    }
  }
}
