import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { Series } from '../model/series';
import { BasePoint } from '../model/base-point';
import { SeriesType } from '../model/enum/series-type';
import { ChartService } from '../service/chart.service';

@Component({
  selector: 'teta-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  private sizeMapping = new Map<SeriesType, number>()
    .set(SeriesType.line, 2)
    .set(SeriesType.scatter, 2)
    .set(SeriesType.bar, 12)
    .set(SeriesType.area, 2)
    .set(SeriesType.block, 12)
    .set(SeriesType.blockArea, 2);

  series = input<Array<Series<BasePoint>>>();
  @HostBinding('class.padding-bottom-4') classLegend = true;

  constructor(private chartService: ChartService) {}

  getHeight(serie: Series<BasePoint>) {
    return this.sizeMapping.get(serie.type ?? SeriesType.line);
  }

  click(series: Series<BasePoint>, visible?: boolean) {
    series.visible = visible;
    this.chartService.updateSeries(series);
  }
}
