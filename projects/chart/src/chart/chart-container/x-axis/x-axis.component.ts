import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Axis } from '../../core/axis/axis';
import { ScaleService } from '../../service/scale.service';
import { ChartService } from '../../service/chart.service';
import * as d3 from 'd3';
import { ZoomService } from '../../service/zoom.service';
import { merge, takeWhile, tap } from 'rxjs';

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XAxisComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() axis: Axis;
  @Input() set scale(scale: any) {
    this._scale = scale;

    this.draw();
  }

  get scale() {
    return this._scale;
  }

  @Input() size: DOMRect;
  @ViewChild('svg') node: ElementRef;

  private _scale: any;
  private _alive = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngAfterViewInit() {
    this.draw();
  }

  private draw() {
    if (!this.node || !this.axis) {
      return;
    }

    const axis = this.axis.options.opposite
      ? d3
          .axisTop(this.scale)
          .tickFormat(
            this.axis.options.tickFormat ?? this.axis.defaultFormatter()
          )
      : d3
          .axisBottom(this.scale)
          .tickFormat(
            this.axis.options.tickFormat ?? this.axis.defaultFormatter()
          );

    d3.select(this.node.nativeElement)
      .call(axis)
      .call((_) => _.select('.domain').remove());
  }
}
