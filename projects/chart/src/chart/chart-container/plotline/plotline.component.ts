import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PlotLine } from '../../model/plot-line';
import { Axis } from '../../core/axis/axis';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { ZoomService } from '../../service/zoom.service';
import { ScaleService } from '../../service/scale.service';
import * as d3 from 'd3';
import { IChartEvent } from '../../model/i-chart-event';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: '[teta-plot-line]',
  templateUrl: './plotline.component.html',
  styleUrls: ['./plotline.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotlineComponent implements OnInit, OnDestroy {
  @Input() plotLine: PlotLine;
  @Input() size: DOMRect;
  @Input() axis: Axis;
  @Input() scale: any;
  orientation = AxisOrientation;
  dragElements: any;

  private _domain: number[];

  constructor(
    private cdr: ChangeDetectorRef,
    private zoomService: ZoomService,
    private scaleService: ScaleService,
    private chartService: ChartService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    this._domain = this.scale.domain();

    const plotlineElement = d3.select(this.element.nativeElement).select('.plotline');

    const grabElement = d3.select(this.element.nativeElement).selectAll('.grabber');

    this.dragElements = d3.drag().subject(() => {
      if (this.axis.orientation === AxisOrientation.y) {
        return { y: plotlineElement.attr('y1') };
      }
      if (this.axis.orientation === AxisOrientation.x) {
        return { x: plotlineElement.attr('x1') };
      }
      return null;
    });
    const drag = this.dragElements.on('start drag end', (event: d3.D3DragEvent<any, PlotLine, any>, d: PlotLine) => {
      d.value = this.scale.invert(event[AxisOrientation[this.axis.orientation]]);
      if (d.max !== null && d.max !== undefined && d.value >= d.max) {
        d.value = d.max;
      }
      if (d.min !== null && d.min !== undefined && d.value <= d.min) {
        d.value = d.min;
      }
      this.emit({
        event,
        target: d,
      });

      this.cdr.detectChanges();
    });

    plotlineElement.datum<PlotLine>(this.plotLine);
    grabElement.datum<PlotLine>(this.plotLine);

    if (this.plotLine.draggable) {
      grabElement.call(drag);
    }
  }

  ngOnDestroy() {
    this.dragElements.on('start drag end', null);
  }

  emit(event: IChartEvent<PlotLine>) {
    this.chartService.emitPlotline(event);
  }

  get value() {
    return this.scale(this.plotLine.value);
  }

  get height(): number {
    return this.size.height;
  }

  get width(): number {
    return this.size.width;
  }
}
