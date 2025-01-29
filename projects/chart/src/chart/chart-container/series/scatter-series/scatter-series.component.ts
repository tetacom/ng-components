import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePoint } from '../../../model/base-point';
import { SeriesBaseComponent } from '../../../base/series-base.component';

@Component({
  selector: 'svg:svg[teta-scatter-series]',
  templateUrl: './scatter-series.component.html',
  styleUrls: ['./scatter-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterSeriesComponent<T extends BasePoint> extends SeriesBaseComponent<T> {}
