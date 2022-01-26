import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Axis } from '../../core/axis/axis';
import * as d3 from 'd3';
import { ScaleService } from '../../service/scale.service';
import { ChartService } from '../../service/chart.service';
import { ZoomService } from '../../service/zoom.service';
import { merge, takeWhile, tap } from 'rxjs';
import { AxesService } from '../../service/axes.service';

@Component({
  selector: '[teta-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YAxisComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() axis: Axis;
  @Input() size: DOMRect;
  @ViewChild('svg', { static: false }) node: ElementRef;

  private _alive = true;

  constructor(
    private scaleService: ScaleService,
    private chartService: ChartService,
    private axesService: AxesService,
    private cdr: ChangeDetectorRef,
    private zoomService: ZoomService
  ) {
    merge(this.zoomService.zoomed, this.chartService.size)
      .pipe(
        takeWhile(() => this._alive),
        tap((_) => {
          this.draw();
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngAfterViewInit() {
    this.draw();
  }

  getLabelTransform() {
    return `translate(${
      this.axis.options.opposite
        ? this.axis.selfSize - 24
        : -this.axis.selfSize + 24
    }, ${this.size.height / 2}) rotate(${
      this.axis.options.opposite ? '90' : '-90'
    })`;
  }

  private draw() {
    if (!this.node || !this.axis) {
      return;
    }

    const scale = this.scaleService.yScales.get(this.axis.index);

    const axis = this.axis.options.opposite
      ? d3
          .axisRight(scale)
          // .tickValues(this.axis.tickValues)
          .tickFormat(
            this.axis.options.tickFormat ?? this.axis.defaultFormatter()
          )
      : d3
          .axisLeft(scale)
          // .tickValues(this.axis.tickValues)
          .tickFormat(
            this.axis.options.tickFormat ?? this.axis.defaultFormatter()
          );

    d3.select(this.node.nativeElement)
      .call(axis)
      .call((_) => _.select('.domain').remove());
  }
}
