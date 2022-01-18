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
import { AxisOrientation } from '../../../model/enum/axis-orientation';

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

  private accessorMap = new Map<TooltipTracking, (point: BasePoint) => number>()
    .set(TooltipTracking.x, (_) => _.x)
    .set(TooltipTracking.y, (_) => _.y);

  display: Observable<number>;

  x: any;
  y: any;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    private element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService);
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
      if (d.marker?.dragType === DragPointType.x) {
        d.x = this.x.invert(event.x);
      }

      if (d.marker?.dragType === DragPointType.y) {
        d.y = this.y.invert(event.y);
      }

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
  }

  getPath() {
    this.x = this.scaleService.xScales.get(this.series.xAxisIndex);
    this.y = this.scaleService.yScales.get(this.series.yAxisIndex);

    const line = d3
      .line<BasePoint>()
      .x((point) => this.x(point.x))
      .y((point) => this.y(point.y));

    return line(this.series.data);
  }

  getMarkers() {
    return this.series.data?.filter((_) => _?.marker);
  }

  getTransform(event: any): Pick<BasePoint, 'x' | 'y'> {
    const mouse = d3.pointer(event);

    const foundX = this.scaleService.xScales.get(this.series.xAxisIndex);
    const foundY = this.scaleService.yScales.get(this.series.yAxisIndex);

    const tooltipTracking =
      this.svc.config?.tooltip?.tracking ?? TooltipTracking.x;

    const bisect = d3.bisector(this.accessorMap.get(tooltipTracking)).left;

    const scale = tooltipTracking === TooltipTracking.x ? foundX : foundY;

    const coordinate = scale.invert(mouse[tooltipTracking]);

    const index = bisect(this.series.data, coordinate, 0);

    const foundPoint = this.series.data[index] ? this.series.data[index] : null;

    if (foundPoint) {
      this.svc.setTooltip({ point: foundPoint, series: this.series });

      if (foundPoint.marker?.draggable) {
        return null;
      }
      return {
        x: foundX(foundPoint?.x),
        y: foundY(foundPoint?.y),
      };
    }

    return null;
  }
}
