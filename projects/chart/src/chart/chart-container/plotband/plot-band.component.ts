import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  OnDestroy,
  signal,
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
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotBandComponent implements AfterViewInit, OnDestroy {
  plotBand = input<PlotBand>();
  axis = input<Axis>();
  scale = input<any>();
  size = input<DOMRect>();

  fromTo = signal<{
    from: number;
    to: number;
  } | null>({
    from: 0,
    to: 0,
  });

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    this.emit({
      target: this.plotBand(),
      event,
    });
  }

  @HostListener('contextmenu', ['$event']) contextMenu(event: MouseEvent) {
    this.emit({
      target: this.plotBand(),
      event,
    });
  }

  orientation = AxisOrientation;
  resizeElements: any;
  dragElements: any;

  height = computed(() => {
    return this.size().height;
  });

  width = computed(() => {
    return this.size().width;
  });

  from = computed(() => {
    if (this.scale() && this.fromTo()) {
      return this.scale()(this.fromTo().from);
    }
    return 0;
  });

  to = computed(() => {
    if (this.scale() && this.fromTo()) {
      return this.scale()(this.fromTo().to);
    }
    return 0;
  });

  bandSize = computed(() => {
    if (this.scale() && this.fromTo()) {
      return Math.abs(this.scale()(this.fromTo().to) - this.scale()(this.fromTo().from));
    }
    return 0;
  });

  textPosition = computed(() => {
    let [min, max] = this.scale().domain();
    min = min instanceof Date ? min.getTime() : min;
    max = max instanceof Date ? max.getTime() : max;
    const from =
      (this.fromTo().from as any) instanceof Date ? (this.fromTo().from as any).getTime() : this.fromTo().from;
    const to = (this.fromTo().to as any) instanceof Date ? (this.fromTo().to as any).getTime() : this.fromTo().to;
    const position = ((from <= min ? min : from) + (to >= max ? max : to)) / 2;
    return this.scale()(position);
  });

  fill = computed(() => {
    if (this.plotBand().style?.plotBand?.patternImage) {
      return `url(#${this.plotBand().style.plotBand?.patternImage})`;
    }
    return this.plotBand().style.plotBand?.fill;
  });

  constructor(
    private chartService: ChartService,
    private element: ElementRef,
  ) {
    effect(() => {
      if (this.plotBand()) {
        this.fromTo.set({
          from: this.plotBand().from,
          to: this.plotBand().to,
        });
      }
    });
  }

  emit(event: IChartEvent<PlotBand>) {
    this.chartService.emitPlotBand(event);
  }

  ngAfterViewInit(): void {
    const plotbandElement = d3.select(this.element.nativeElement).select('.plotband');

    const grabElements = d3.select(this.element.nativeElement).selectAll('.grabber');

    this.dragElements = d3.drag().subject(() => {
      if (this.axis().orientation === AxisOrientation.x) {
        return { x: plotbandElement.attr('x') };
      }

      if (this.axis().orientation === AxisOrientation.y) {
        return { y: plotbandElement.attr('y') };
      }
      return null;
    });

    const drag = this.dragElements.on('start drag end', (event: d3.D3DragEvent<any, PlotBand, any>, d: PlotBand) => {
      const bandSize = parseFloat(
        plotbandElement.attr(this.axis().orientation === AxisOrientation.x ? 'width' : 'height'),
      );

      const from = this.scale().invert(event[AxisOrientation[this.axis().orientation]]);
      const to = this.scale().invert(event[AxisOrientation[this.axis().orientation]] + bandSize);

      // const min = Math.min(...this.scale().domain());
      // const max = Math.max(...this.scale().domain());
      //
      // const minValue = d.min ?? min;
      // const maxValue = d.max ?? max;
      //
      // d.from = from;
      // d.to = to;
      // if (d.from < minValue) {
      //   d.from = minValue;
      // }
      // if (d.to > maxValue) {
      //   d.to = maxValue;
      // }

      d.from = from;
      d.to = to;

      this.fromTo.set({
        from: d.from,
        to: d.to,
      });
      this.emit({
        event,
        target: d,
      });
    });

    let grabberKey;
    this.resizeElements = d3.drag();

    const resize = this.resizeElements.on(
      'start drag end',
      (event: d3.D3DragEvent<any, PlotBand, any>, d: PlotBand) => {
        if (event?.type === 'start') {
          const { grabber } = event?.sourceEvent?.target?.dataset;
          grabberKey = grabber;
        }

        const min = Math.min(...this.scale().domain());
        const max = Math.max(...this.scale().domain());

        const minValue = d.min ?? min;
        const maxValue = d.max ?? max;

        d[grabberKey] = this.scale().invert(event[AxisOrientation[this.axis().orientation]]);

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
        this.fromTo.set({
          from: d.from,
          to: d.to,
        });
        this.emit({
          event,
          target: d,
        });
      },
    );

    plotbandElement.datum<PlotBand>(this.plotBand());
    grabElements.datum<PlotBand>(this.plotBand());

    if (this.plotBand().draggable) {
      plotbandElement.call(drag);
    }

    if (this.plotBand().resizable) {
      grabElements.call(resize);
    }
  }

  ngOnDestroy() {
    this.dragElements.on('start drag end', null);
    this.resizeElements.on('start drag end', null);
  }
}
