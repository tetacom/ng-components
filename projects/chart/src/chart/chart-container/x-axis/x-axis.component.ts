import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Axis } from '../../core/axis/axis';

import {map, Observable} from "rxjs";
import {ScaleService} from "../../service/scale.service";

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XAxisComponent implements OnInit, OnDestroy, AfterViewInit {
  x: Observable<any>;

  @Input() axis: Axis;
  @Input() size: DOMRect;

  private _alive = true;

  constructor(private scaleService: ScaleService) {
    this.x = this.scaleService.xScaleMap.pipe(map((_) => {
      return _.get(this.axis.index)
    }))
  }

  getLabelTransform() {
    return `translate(${
      this.size.width / 2
    }, ${this.axis.options.opposite ? -32 : 32})`;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._alive = false;
  }

  ngAfterViewInit() {
    // this.draw();
  }

  private draw() {
    // if (!this.node || !this.axis) {
    //   return;
    // }
    //
    // const axis = this.axis.options.opposite
    //   ? d3
    //       .axisTop(this.scale)
    //       .tickFormat(
    //         this.axis.options.tickFormat ?? this.axis.defaultFormatter()
    //       )
    //   : d3
    //       .axisBottom(this.scale)
    //       .tickFormat(
    //         this.axis.options.tickFormat ?? this.axis.defaultFormatter()
    //       );
    //
    // d3.select(this.node.nativeElement)
    //   .call(axis)
    //   .call((_) => _.select('.domain').remove());
  }
}
