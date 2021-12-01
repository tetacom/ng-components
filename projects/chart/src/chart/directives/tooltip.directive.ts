import { Directive, ElementRef, Renderer2 } from '@angular/core';

import * as d3 from 'd3';

@Directive({
  selector: '[tetaChartTooltip]',
})
export class TooltipDirective {
  constructor(private element: ElementRef) {}

  ngOnInit() {
    const svg = d3.select(this.element.nativeElement);
    svg.on('mousemove', (d) => {
      console.log(d);
    });
  }
}
