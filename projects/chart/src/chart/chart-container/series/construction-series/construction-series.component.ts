import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { SeriesBaseComponent } from '../../../base/series-base.component';
import { BasePoint } from '../../../model/base-point';
import { ChartService } from '../../../service/chart.service';
import { ScaleService } from '../../../service/scale.service';
import { ZoomService } from '../../../service/zoom.service';
import { map, Observable } from 'rxjs';
import * as d3 from 'd3';
import { ConstructionPoint } from '../../../model/construction-point';

@Component({
  selector: 'svg:svg[teta-construction-series]',
  templateUrl: './construction-series.component.html',
  styleUrls: ['./construction-series.component.scss'],
})
export class ConstructionSeriesComponent<T extends ConstructionPoint>
  extends SeriesBaseComponent<T>
  implements OnInit
{
  x: Observable<d3.ScaleLinear<number, number>>;
  y: Observable<d3.ScaleLinear<number, number>>;

  casing: Observable<string>;

  constructor(
    protected override svc: ChartService,
    protected override cdr: ChangeDetectorRef,
    protected override scaleService: ScaleService,
    protected override zoomService: ZoomService,
    protected override element: ElementRef
  ) {
    super(svc, cdr, scaleService, zoomService, element);
  }

  override ngOnInit(): void {
    this.x = this.scaleService.xScaleMap.pipe(
      map((_) => _.get(this.series.xAxisIndex))
    );
    this.y = this.scaleService.yScaleMap.pipe(
      map((_) => _.get(this.series.yAxisIndex))
    );

    console.log(this.series.data.filter((_) => _));
  }
}
