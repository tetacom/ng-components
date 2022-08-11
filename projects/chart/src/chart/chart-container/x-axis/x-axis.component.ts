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
import {Axis} from '../../core/axis/axis';

import {lastValueFrom, map, Observable, take, withLatestFrom} from "rxjs";
import {ScaleService} from "../../service/scale.service";
import {getTextWidth} from "../../core/utils/get-text-width";
import * as d3 from 'd3';
import {ChartService} from "../../service/chart.service";
import {IChartConfig} from "../../model/i-chart-config";

@Component({
  selector: '[teta-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XAxisComponent implements OnInit {
  x: Observable<any>;
  ticks: Observable<any[]>

  @Input() axis: Axis;
  @Input() size: DOMRect;

  private _alive = true;

  constructor(private scaleService: ScaleService, private _svc: ChartService) {
    this.x = this.scaleService.scales.pipe(map((_) => {
      return _.x.get(this.axis.index)?.scale
    }))


    this.ticks = this.x.pipe(
      withLatestFrom(this._svc.size),
      map((_: [any, DOMRect]) => {
        const [x, size] = _;

        const tickSize = x.ticks().map((_) => getTextWidth(this.axis.options.tickFormat ? this.axis.options.tickFormat(_) : this.axis.defaultFormatter()(_), 0.45, 11))
        return x.ticks(size.width / parseInt(d3.max(tickSize), 10) / 2)
      })
    )
  }

  getLabelTransform() {
    return `translate(${
      this.size.width / 2
    }, ${this.axis.options.opposite ? -32 : 32})`;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
