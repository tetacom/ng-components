import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { PlotLine } from '../../model/plotline';
import { Axis } from '../../core/axis/axis';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { ZoomService } from '../../service/zoom.service';
import { ScaleService } from '../../service/scale.service';
import * as d3 from 'd3';
import { IChartEvent } from '../../model/i-chart-event';
import { Plotband } from '../../model/plotband';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: '[teta-plot-line]',
  templateUrl: './plotline.component.html',
  styleUrls: ['./plotline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotlineComponent implements OnInit {
  @Input() plotline: PlotLine;
  @Input() size: DOMRect;
  @Input() axis: Axis;
  orientation = AxisOrientation;

  private scale: any;
  private domain: number[];

  constructor(
    private cdr: ChangeDetectorRef,
    private zoomService: ZoomService,
    private scaleService: ScaleService,
    private chartService: ChartService,
    private element: ElementRef
  ) {
    this.zoomService.zoomed.subscribe(() => {
      this.scale = this.scaleService[
        this.axis.orientation === AxisOrientation.x ? 'xScales' : 'yScales'
      ].get(this.axis.index);
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.scale = this.scaleService[
      this.axis.orientation === AxisOrientation.x ? 'xScales' : 'yScales'
    ].get(this.axis.index);

    this.domain = this.scale.domain();

    const plotlineElement = d3
      .select(this.element.nativeElement)
      .select('.plotline');

    const grabElement = d3
      .select(this.element.nativeElement)
      .selectAll('.grabber');

    const drag = d3
      .drag()
      .subject(() => {
        if (this.axis.orientation === AxisOrientation.y) {
          return { y: plotlineElement.attr('y1') };
        }
        if (this.axis.orientation === AxisOrientation.x) {
          return { x: plotlineElement.attr('x1') };
        }
      })
      .on(
        'start drag end',
        (event: d3.D3DragEvent<any, PlotLine, any>, d: PlotLine) => {
          d.value = this.scale.invert(
            event[AxisOrientation[this.axis.orientation]]
          );

          this.emit({
            event,
            target: d,
          });

          this.cdr.detectChanges();
        }
      );

    plotlineElement.datum<PlotLine>(this.plotline);
    grabElement.datum<PlotLine>(this.plotline);

    if (this.plotline.draggable) {
      grabElement.call(drag);
    }
  }

  emit(event: IChartEvent<PlotLine>) {
    this.chartService.emitPlotline(event);
  }

  get value() {
    return this.scale(this.plotline.value);
  }

  get height(): number {
    return this.size.height;
  }

  get width(): number {
    return this.size.width;
  }
}
