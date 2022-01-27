import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Axis } from '../../core/axis/axis';
import * as d3 from 'd3';

@Component({
  selector: '[teta-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YAxisComponent implements OnInit, AfterViewInit {
  @Input() axis: Axis;
  @Input() set scale(scale: any) {
    this._scale = scale;
    this.draw();
  }

  get scale() {
    return this._scale;
  }
  @Input() size: DOMRect;
  @ViewChild('svg', { static: false }) node: ElementRef;

  private _alive = true;
  private _scale: any;

  constructor() {}

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

    const axis = this.axis.options.opposite
      ? d3
          .axisRight(this.scale)
          .tickFormat(
            this.axis.options.tickFormat ?? this.axis.defaultFormatter()
          )
      : d3
          .axisLeft(this.scale)
          .tickFormat(
            this.axis.options.tickFormat ?? this.axis.defaultFormatter()
          );

    d3.select(this.node.nativeElement)
      .call(axis)
      .call((_) => _.select('.domain').remove());
  }
}
