import { Directive, ElementRef, Input } from '@angular/core';

import * as d3 from 'd3';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';

@Directive({
  selector: '[tetaChartTooltip]',
})
export class TooltipDirective {
  @Input() series: Series<BasePoint>[];
  @Input() size: DOMRect;

  constructor() {}

  ngOnInit() {}
}
