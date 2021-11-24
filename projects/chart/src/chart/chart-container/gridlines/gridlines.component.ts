import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScaleService } from '../../scale.service';
import { AxesService } from '../../axes.service';
import { throttleTime } from 'rxjs/operators';
import { tap } from 'rxjs';
import { ChartService } from '../../chart.service';

@Component({
  selector: '[teta-gridlines]',
  templateUrl: './gridlines.component.html',
  styleUrls: ['./gridlines.component.scss'],
})
export class GridlinesComponent implements OnInit {
  @Input() size: DOMRect;
  tickYValues: number[];
  tickXValues: number[];
  y: any;
  x: any;

  constructor(
    private scaleService: ScaleService,
    private axesService: AxesService,
    private chartService: ChartService
  ) {
    this.chartService.size
      .pipe(
        throttleTime(100, null, { trailing: true }),
        tap(() => {
          this.draw();
        })
      )
      .subscribe();
  }

  draw() {
    this.tickYValues = this.axesService.yAxis.get(0).tickValues;
    this.tickXValues = this.axesService.xAxis.get(0).tickValues;
    this.y = this.scaleService.yScales.get(0);
    this.x = this.scaleService.xScales.get(0);
  }

  ngOnInit(): void {
    this.draw();
  }
}
