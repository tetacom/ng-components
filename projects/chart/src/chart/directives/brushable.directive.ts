import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IChartConfig } from '../model/i-chart-config';
import { BrushService } from '../service/brush.service';
import { ChartService } from '../service/chart.service';

@Directive({
  selector: '[tetaBrushable]',
})
export class BrushableDirective implements OnInit, AfterViewInit {
  @Input() config: IChartConfig;
  @Input() brushScale: any;

  constructor(
    private brushService: BrushService,
    private chartService: ChartService,
    private element: ElementRef
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {

    if(changes.hasOwnProperty('config')) {
      this.brushService.clearPreviousSelection();
    }

    if(this.config?.brush?.enable) {

      this.brushService.applyBrush(
        this.element,
        this.config,
        this.brushScale
      );
    }


  }
}
