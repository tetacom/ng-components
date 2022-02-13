import {ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {SeriesBaseComponent} from "../../../base/series-base.component";
import {ConstructionPoint} from "../../../model/construction-point";
import {WellNktDto, WellCasingDto, WellPerforationDto, WellPackerDto, WellColumnType} from '@teta/core'
import {ChartService} from "../../../service/chart.service";
import {ScaleService} from "../../../service/scale.service";
import {ZoomService} from "../../../service/zoom.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'svg:svg[teta-construction-series]',
  templateUrl: './construction-series.component.html',
  styleUrls: ['./construction-series.component.scss']
})
export class ConstructionSeriesComponent<T extends ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>> extends SeriesBaseComponent<T> implements OnInit {


  x: Observable<any>;
  y: Observable<any>
  casing: ConstructionPoint<WellCasingDto>[];
  nkt: ConstructionPoint<WellNktDto>[];
  perforation: ConstructionPoint<WellPerforationDto>[];
  bottom: ConstructionPoint<WellCasingDto>[];
  packers: ConstructionPoint<WellPackerDto>[];


  constructor(protected override svc: ChartService,
              protected override cdr: ChangeDetectorRef,
              protected override scaleService: ScaleService,
              protected override zoomService: ZoomService,
              protected override element: ElementRef) {
    super(svc, cdr, scaleService, zoomService, element)
  }

  override ngOnInit(): void {
    this.x = this.scaleService.xScaleMap.pipe(
      map((_) => _.get(this.series.xAxisIndex))
    );
    this.y = this.scaleService.yScaleMap.pipe(
      map((_) => _.get(this.series.yAxisIndex))
    );


    const seriesData: ReadonlyArray<ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>> = this.series.data;


    const isNkt = (obj: ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>): obj is ConstructionPoint<WellNktDto> => {
      return obj.meta instanceof WellNktDto;
    }

    const isCasing = (obj: ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>): obj is ConstructionPoint<WellCasingDto> => {
      return obj.meta instanceof WellCasingDto && obj.meta.type === WellColumnType.casing;
    }

    const isPerforation = (obj: ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>): obj is ConstructionPoint<WellPerforationDto> => {
      return obj.meta instanceof WellPerforationDto;
    }

    const isBottom = (obj: ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>): obj is ConstructionPoint<WellCasingDto> => {
      return obj.meta instanceof WellCasingDto && obj.meta.type === WellColumnType.bottom;
    }


    const isPacker = (obj: ConstructionPoint<WellPerforationDto | WellNktDto | WellCasingDto | WellPackerDto>): obj is ConstructionPoint<WellPackerDto> => {
      return obj.meta instanceof WellPackerDto;
    }

    this.casing = seriesData.filter(isCasing).sort((a, b) => a.meta.columnOuterDiameter - b.meta.columnOuterDiameter);
    this.nkt = seriesData.filter(isNkt);
    this.perforation = seriesData.filter(isPerforation);
    this.bottom = seriesData.filter(isBottom);
    this.packers = seriesData.filter(isPacker);

    console.log(this.packers)


  }
}
