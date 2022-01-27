import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit,} from '@angular/core';
import {ScaleService} from '../../service/scale.service';

import {merge, tap} from 'rxjs';
import {ChartService} from '../../service/chart.service';
import {ZoomService} from '../../service/zoom.service';

@Component({
  selector: '[teta-gridlines]',
  templateUrl: './gridlines.component.html',
  styleUrls: ['./gridlines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridlinesComponent implements OnInit {
  @Input() size: DOMRect;
  tickYValues: number[];
  tickXValues: number[];
  y: any;
  x: any;

  constructor(
    private scaleService: ScaleService,
    private chartService: ChartService,
    private zoomService: ZoomService,
    private cdr: ChangeDetectorRef
  ) {

  }

  draw() {
    this.y = this.scaleService.yScales.get(0);
    this.x = this.scaleService.xScales.get(0);

    this.tickYValues = this.y.ticks();
    this.tickXValues = this.x.ticks();
  }

  ngOnInit(): void {
    merge(this.chartService.size, this.zoomService.zoomed)
      .pipe(
        tap(() => {
          this.draw();
          this.cdr.detectChanges();
        })
      )
      .subscribe();
    this.draw();
  }
}
