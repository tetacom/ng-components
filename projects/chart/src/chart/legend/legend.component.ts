import {ChangeDetectionStrategy, Component, HostBinding, Input,} from '@angular/core';
import {Series} from '../model/series';
import {BasePoint} from '../model/base-point';
import {SeriesType} from '../model/enum/series-type';

@Component({
  selector: 'teta-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  private sizeMapping = new Map<SeriesType, number>()
    .set(SeriesType.line, 2)
    .set(SeriesType.bar, 12)
    .set(SeriesType.area, 2);

  @Input() series: Array<Series<BasePoint>>;
  @HostBinding('class.padding-bottom-4') classLegend = true;

  constructor() {}

  getHeight(serie: Series<BasePoint>) {
    return this.sizeMapping.get(serie.type ?? SeriesType.line);
  }
}
