import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import { SeriesType } from '../model/enum/series-type';
import {ChartService} from "../service/chart.service";

@Component({
  selector: 'teta-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  private sizeMapping = new Map<SeriesType, number>()
    .set(SeriesType.line, 2)
    .set(SeriesType.scatter, 12)
    .set(SeriesType.bar, 12)
    .set(SeriesType.area, 2)
    .set(SeriesType.block, 12)
    .set(SeriesType.blockArea, 2);

  @Input() series: Array<Series<BasePoint>>;
  @HostBinding('class.padding-bottom-4') classLegend = true;

  constructor(private chartService: ChartService) {}

  getHeight(serie: Series<BasePoint>) {
    return this.sizeMapping.get(serie.type ?? SeriesType.line);
  }

  click(serie: Series<BasePoint>) {
   this.chartService.toggleVisibilitySeries([serie.id]);
  }
}
