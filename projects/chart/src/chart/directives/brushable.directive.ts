import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { BrushService } from '../service/brush.service';
import { ChartService } from '../service/chart.service';

@Directive({
  selector: 'svg:svg[tetaBrushable]',
})
export class BrushableDirective implements OnInit, AfterViewInit {
  @Input() config?: IChartConfig;
  @Input() size?: DOMRect;

  constructor(
    private brushService: BrushService,
    private chartService: ChartService,
    private element: ElementRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.brushService.applyBrush(this.element, this.config, this.size);
  }
}
