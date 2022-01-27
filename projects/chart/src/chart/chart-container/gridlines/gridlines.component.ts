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
  @Input() xScaleMap: Map<number|string, any>;
  @Input() yScaleMap: Map<number|string, any>;

  tickYValues: number[];
  tickXValues: number[];

  constructor(
    private scaleService: ScaleService,
    private chartService: ChartService,
    private zoomService: ZoomService,
    private cdr: ChangeDetectorRef
  ) {

  }

  draw() {
    this.tickYValues = this.yScaleMap.get(0).ticks();
    this.tickXValues = this.xScaleMap.get(0).ticks();
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
