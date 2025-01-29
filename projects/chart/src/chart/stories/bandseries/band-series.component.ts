import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeriesBaseComponent } from '../../base/series-base.component';
import { BasePoint } from '../../model/base-point';

@Component({
  selector: 'svg:svg[teta-band-series]',
  templateUrl: './band-series.component.html',
  styleUrls: ['./band-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandSeriesComponent extends SeriesBaseComponent<BasePoint> {}
