import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  input,
  signal,
} from '@angular/core';
import { PlotLine } from '../../model/plot-line';
import { Axis } from '../../core/axis/axis';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import * as d3 from 'd3';
import { IChartEvent } from '../../model/i-chart-event';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: '[teta-plot-line]',
  templateUrl: './plotline.component.html',
  styleUrls: ['./plotline.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotlineComponent implements AfterViewInit, OnDestroy {
  private chartService = inject(ChartService);
  private element = inject(ElementRef);

  plotLine = input<PlotLine>();
  size = input<DOMRect>();
  axis = input<Axis>();
  scale = input<any>();

  orientation = AxisOrientation;
  dragElements: any;

  currentValue = signal<number>(0);

  value = computed(() => {
    const scale = this.scale();

    if (!scale) {
      return 0;
    }

    return scale(this.currentValue());
  });

  height = computed(() => {
    return this.size()?.height ?? 0;
  });

  width = computed(() => {
    return this.size()?.width ?? 0;
  });

  constructor() {
    effect(() => {
      if (this.plotLine()) {
        this.currentValue.set(this.plotLine().value);
      }
    });
  }

  ngAfterViewInit(): void {
    const plotlineElement = d3.select(this.element.nativeElement).select('.plotline');

    const grabElement = d3.select(this.element.nativeElement).selectAll('.grabber');

    this.dragElements = d3.drag().subject(() => {
      if (this.axis().orientation === AxisOrientation.y) {
        return { y: plotlineElement.attr('y1') };
      }
      if (this.axis().orientation === AxisOrientation.x) {
        return { x: plotlineElement.attr('x1') };
      }
      return null;
    });
    const drag = this.dragElements.on('start drag end', (event: d3.D3DragEvent<any, PlotLine, any>, d: PlotLine) => {
      d.value = this.scale().invert(event[AxisOrientation[this.axis().orientation]]);
      if (d.max !== null && d.max !== undefined && d.value >= d.max) {
        d.value = d.max;
      }
      if (d.min !== null && d.min !== undefined && d.value <= d.min) {
        d.value = d.min;
      }
      this.currentValue.set(d.value);
      this.emit({
        event,
        target: d,
      });
    });

    plotlineElement.datum<PlotLine>(this.plotLine());
    grabElement.datum<PlotLine>(this.plotLine());

    if (this.plotLine().draggable) {
      grabElement.call(drag);
    }
  }

  ngOnDestroy() {
    this.dragElements.on('start drag end', null);
  }

  emit(event: IChartEvent<PlotLine>) {
    this.chartService.emitPlotLine(event);
  }
}
