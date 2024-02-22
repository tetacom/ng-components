import {ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {SeriesBaseComponent} from "../../base/series-base.component";
import {BasePoint} from "../../model/base-point";
import {ChartService} from '../../service/chart.service';
import {ScaleService} from "../../service/scale.service";
import {ZoomService} from "../../service/zoom.service";
import {map, Observable} from "rxjs";
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'svg:svg[teta-bandseries]',
  templateUrl: './bandseries.component.html',
  standalone:true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  styleUrls: ['./bandseries.component.scss']
})
export class BandseriesComponent extends SeriesBaseComponent<BasePoint> implements OnInit {

  x: Observable<any>;
  y: Observable<any>;

  constructor(protected override svc: ChartService,
              protected override cdr: ChangeDetectorRef,
              protected override scaleService: ScaleService,
              protected override zoomService: ZoomService,
              protected override element: ElementRef) {
    super(svc, cdr, scaleService, zoomService, element);
  }

  override ngOnInit(): void {
    this.x = this.scaleService.scales.pipe(map(_ => _.x.get(this.series.xAxisIndex)?.scale));
    this.y = this.scaleService.scales.pipe(map(_ => _.y.get(this.series.yAxisIndex)?.scale));


  }

}
