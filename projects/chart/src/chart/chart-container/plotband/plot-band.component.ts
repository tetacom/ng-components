import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import * as d3 from 'd3';

import { Axis } from '../../core/axis/axis';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { IChartEvent } from '../../model/i-chart-event';
import { PlotBand } from '../../model/plot-band';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: '[teta-plot-band]',
  templateUrl: './plot-band.component.html',
  styleUrls: ['./plot-band.component.scss'],
  standalone:true,
  imports:[
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotBandComponent implements AfterViewInit, OnDestroy {
  @Input() plotBand: PlotBand;
  @Input() axis: Axis;
  @Input() scale: any;
  @Input() size: DOMRect;

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    this.emit({
      target: this.plotBand,
      event,
    });
  }

  @HostListener('contextmenu', ['$event']) contextMenu(event: MouseEvent) {
    this.emit({
      target: this.plotBand,
      event,
    });
  }

  orientation = AxisOrientation;
  resizeElements: any;
  dragElements: any;

  get height(): number {
    return this.size.height;
  }

  get width(): number {
    return this.size.width;
  }

  get from(): number {
    return this.scale(this.plotBand.from);
  }

  get to(): number {
    return this.scale(this.plotBand.to);
  }

  get bandSize(): number {
    return Math.abs(
      this.scale(this.plotBand.to) - this.scale(this.plotBand.from)
    );
  }

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
    private element: ElementRef
  ) {}

  emit(event: IChartEvent<PlotBand>) {
    this.chartService.emitPlotband(event);
  }

  ngAfterViewInit(): void {
    const plotbandElement = d3
      .select(this.element.nativeElement)
      .select('.plotband');

    const grabElements = d3
      .select(this.element.nativeElement)
      .selectAll('.grabber');

    this.dragElements = d3.drag().subject(() => {
      if (this.axis.orientation === AxisOrientation.x) {
        return { x: plotbandElement.attr('x') };
      }

      if (this.axis.orientation === AxisOrientation.y) {
        return { y: plotbandElement.attr('y') };
      }
      return null
    });

    const drag = this.dragElements.on(
      'start drag end',
      (event: d3.D3DragEvent<any, PlotBand, any>, d: PlotBand) => {
        const bandSize = parseFloat(
          plotbandElement.attr(
            this.axis.orientation === AxisOrientation.x ? 'width' : 'height'
          )
        );

        d.from = this.scale.invert(
          event[AxisOrientation[this.axis.orientation]]
        );

        d.to = this.scale.invert(
          event[AxisOrientation[this.axis.orientation]] + bandSize
        );

        this.emit({
          event,
          target: d,
        });

        this.cdr.detectChanges();
      }
    );

    let grabberKey;
    this.resizeElements = d3.drag();

    const resize = this.resizeElements.on(
      'start drag end',
      (event: d3.D3DragEvent<any, PlotBand, any>, d: PlotBand) => {
        if (event?.type === 'start') {
          const { grabber } = event?.sourceEvent?.target?.dataset;
          grabberKey = grabber;
        }

        const min = Math.min(...this.scale.domain());
        const max = Math.max(...this.scale.domain());

        const minValue = d.min ?? min;
        const maxValue = d.max ?? max;

        d[grabberKey] = this.scale.invert(
          event[AxisOrientation[this.axis.orientation]]
        );

        if (grabberKey === 'from') {
          const borderMin = d.from <= minValue;

          if (d.from >= d.to) {
            d.from = d.to;
          }

          if (borderMin) {
            d.from = minValue;
          }
        }

        if (grabberKey === 'to') {
          const borderMax = d.to >= maxValue;

          if (borderMax) {
            d.to = maxValue;
          }

          if (d.to <= d.from) {
            d.to = d.from;
          }
        }

        this.emit({
          event,
          target: d,
        });

        this.cdr.detectChanges();
      }
    );

    plotbandElement.datum<PlotBand>(this.plotBand);
    grabElements.datum<PlotBand>(this.plotBand);

    if (this.plotBand.draggable) {
      plotbandElement.call(drag);
    }

    if (this.plotBand.resizable) {
      grabElements.call(resize);
    }
  }

  ngOnDestroy() {
    this.dragElements.on('start drag end', null);
    this.resizeElements.on('start drag end', null);
  }

  getTextPosition = () => {
    let [min, max] = this.scale.domain();
    min = min instanceof Date ? min.getTime() : min;
    max = max instanceof Date ? max.getTime() : max;
    const from =
      (this.plotBand.from as any) instanceof Date
        ? (this.plotBand.from as any).getTime()
        : this.plotBand.from;
    const to =
      (this.plotBand.to as any) instanceof Date
        ? (this.plotBand.to as any).getTime()
        : this.plotBand.to;
    const position = ((from <= min ? min : from) + (to >= max ? max : to)) / 2;
    return this.scale(position);
  };

  getFill(d: PlotBand): string {
    if (d.style?.plotBand?.patternImage) {
      return `url(#${d.style.plotBand?.patternImage})`;
    }
    return d.style.plotBand?.fill;
  }
}
