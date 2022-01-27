import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

import * as d3 from 'd3';
import { PlotBand } from '../../model/plot-band';
import { ScaleService } from '../../service/scale.service';

import { Axis } from '../../core/axis/axis';
import { ZoomService } from '../../service/zoom.service';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { IChartEvent } from '../../model/i-chart-event';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: '[teta-plot-band]',
  templateUrl: './plot-band.component.html',
  styleUrls: ['./plot-band.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotBandComponent implements OnInit {
  @Input() plotBand: PlotBand;
  @Input() axis: Axis;
  @Input() scale: any;
  @Input() size: DOMRect;
  orientation = AxisOrientation;

  domain: number[];

  constructor(
    private scaleService: ScaleService,
    private zoomService: ZoomService,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
    private element: ElementRef
  ) {
    this.zoomService.zoomed.subscribe(() => {
      // this.scale = this.scaleService[
      //   this.axis.orientation === AxisOrientation.x ? 'xScaleMap' : 'yScaleMap'
      // ].get(this.axis.index);
      this.cdr.detectChanges();
    });
  }

  emit(event: IChartEvent<PlotBand>) {
    this.chartService.emitPlotband(event);
  }

  ngOnInit(): void {
    // this.scale = this.scaleService[
    //   this.axis.orientation === AxisOrientation.x ? 'xScaleMap' : 'yScaleMap'
    // ].get(this.axis.index);

    this.domain = this.scale.domain();

    const plotbandElement = d3
      .select(this.element.nativeElement)
      .select('.plotband');

    const grabElements = d3
      .select(this.element.nativeElement)
      .selectAll('.grabber');

    const drag = d3
      .drag()
      .subject(() => {
        if (this.axis.orientation === AxisOrientation.x) {
          return { x: plotbandElement.attr('x') };
        }

        if (this.axis.orientation === AxisOrientation.y) {
          return { y: plotbandElement.attr('y') };
        }
      })
      .on(
        'start drag end',
        (event: d3.D3DragEvent<any, PlotBand, any>, d: PlotBand) => {
          requestAnimationFrame(() => {
            let bandSize = parseFloat(
              plotbandElement.attr(
                this.axis.orientation === AxisOrientation.x ? 'width' : 'height'
              )
            );

            d.to = this.scale.invert(
              event[AxisOrientation[this.axis.orientation]] +
                (this.axis.orientation === AxisOrientation.x ? bandSize : 0)
            );

            d.from = this.scale.invert(
              event[AxisOrientation[this.axis.orientation]] +
                (this.axis.orientation === AxisOrientation.y ? bandSize : 0)
            );

            this.emit({
              event,
              target: d,
            });

            this.cdr.detectChanges();
          });
        }
      );

    let grabberKey;

    const resize = d3
      .drag()
      .on(
        'start drag end',
        (event: d3.D3DragEvent<any, PlotBand, any>, d: PlotBand) => {
          requestAnimationFrame(() => {
            if (event?.type === 'start') {
              const { grabber } = event?.sourceEvent?.target?.dataset;
              grabberKey = grabber;
            }

            const min = Math.min(...this.domain);
            const max = Math.max(...this.domain);

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
          });
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

  get bandSize(): number {
    return Math.abs(
      this.scale(this.plotBand.to) - this.scale(this.plotBand.from)
    );
  }

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

  getFill(d: PlotBand): string {
    if (d.style?.plotBand?.patternImage) {
      return `url(#${d.style.plotBand?.patternImage})`;
    }
    return d.style.plotBand?.fill;
  }
}
