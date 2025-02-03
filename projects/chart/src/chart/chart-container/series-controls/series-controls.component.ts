import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionHeadComponent,
  AccordionItemComponent,
  Align,
  ButtonComponent,
  CheckboxComponent,
  ColorInputComponent,
  DropdownComponent,
  DropdownContentDirective,
  DropdownHeadDirective,
  IconComponent,
  ScrollableComponent,
  SelectComponent,
  SelectOptionDirective,
  SelectValueDirective,
  TetaSize,
} from '@tetacom/ng-components';
import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import { FormsModule } from '@angular/forms';
import { ChartService } from '../../service/chart.service';
import { LineSeriesComponent } from '../series/line/line-series.component';
import { SeriesType } from '../../model/enum/series-type';
import { defaultSeriesTypeMapping } from '../../default/defaultSeriesTypeMapping';

@Component({
  selector: 'teta-series-controls',
  imports: [
    ButtonComponent,
    DropdownComponent,
    DropdownContentDirective,
    DropdownHeadDirective,
    IconComponent,
    AccordionComponent,
    AccordionHeadComponent,
    AccordionItemComponent,
    AccordionContentDirective,
    CheckboxComponent,
    ColorInputComponent,
    FormsModule,
    SelectComponent,
    SelectOptionDirective,
    SelectValueDirective,
    ScrollableComponent,
  ],
  templateUrl: './series-controls.component.html',
  styleUrl: './series-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesControlsComponent {
  private chartService = inject(ChartService);
  protected readonly Align = Align;

  series = input<Series<BasePoint>[]>();

  enabledSeries = computed(() => {
    return this.series()?.filter((item) => item.enabled) ?? [];
  });

  disabledSeries = computed(() => {
    return this.series()?.filter((item) => !item.enabled) ?? [];
  });

  strokeWidth = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 6 },
  ];

  strokeArray = [
    { id: '', value: 'solid' },
    { id: '4, 8', value: 'dashed' },
    { id: '2, 2', value: 'dotted' },
  ];

  seriesType = [
    { id: SeriesType.line, value: 'Line' },
    { id: SeriesType.area, value: 'Area' },
    { id: SeriesType.scatter, value: 'Scatter' },
    { id: SeriesType.block, value: 'Block' },
    { id: SeriesType.blockArea, value: 'BlockArea' },
    { id: SeriesType.bar, value: 'Bar' },
  ];

  setSeriesEnabled(series: Series<BasePoint>, value: boolean) {
    series.enabled = value;
    this.chartService.updateSeries(series);
  }

  setSeriesColor(series: Series<BasePoint>, value: string) {
    series.color = value;
    this.chartService.updateSeries(series);
  }

  setSeriesStrokeWidth(series: Series<BasePoint>, value: number) {
    if (!series.style) {
      series.style = {};
    }
    series.style.strokeWidth = value;
    this.chartService.updateSeries(series);
  }

  setSeriesStrokeDasharray(series: Series<BasePoint>, value: string) {
    if (!series.style) {
      series.style = {};
    }
    series.style.strokeDasharray = value;
    this.chartService.updateSeries(series);
  }

  setSeriesType(series: Series<BasePoint>, value: SeriesType) {
    series.type = value;
    series.component = defaultSeriesTypeMapping.get(series.type) || LineSeriesComponent;
    this.chartService.updateSeries(series);
  }

  clear() {
    this.chartService.clearSeriesSettings();
  }

  protected readonly TetaSize = TetaSize;
  protected readonly SeriesType = SeriesType;
}
