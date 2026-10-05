import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionHeadComponent,
  AccordionItemComponent,
  Align,
  ButtonComponent,
  ColorInputComponent,
  DialogService,
  DropdownComponent,
  DropdownContentDirective,
  DropdownHeadDirective,
  IconComponent,
  InputComponent,
  ScrollableComponent,
  SelectComponent,
  SelectOptionDirective,
  SelectValueDirective,
  TabComponent,
  TabContentDirective,
  TabsComponent,
  TabTitleDirective,
  TetaSize,
} from '@tetacom/ng-components';
import { Series } from '../../model/series';
import { BasePoint } from '../../model/base-point';
import { FormsModule } from '@angular/forms';
import { ChartService } from '../../service/chart.service';
import { LineSeriesComponent } from '../series/line/line-series.component';
import { SeriesType } from '../../model/enum/series-type';
import { defaultSeriesTypeMapping } from '../../default/defaultSeriesTypeMapping';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { FillType } from '../../model/enum/fill-type';
import { ScaleService } from '../../service/scale.service';
import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';

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
    ColorInputComponent,
    FormsModule,
    SelectComponent,
    SelectOptionDirective,
    SelectValueDirective,
    ScrollableComponent,
    TranslocoPipe,
    InputComponent,
    TabsComponent,
    NgTemplateOutlet,
    TabComponent,
    TabContentDirective,
    TabTitleDirective,
    KeyValuePipe,
  ],
  templateUrl: './series-controls.component.html',
  styleUrl: './series-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesControlsComponent {
  private chartService = inject(ChartService);
  private scaleService = inject(ScaleService);
  private dialogService = inject(DialogService);
  private translocoService = inject(TranslocoService);
  protected readonly Align = Align;

  series = input<Series<BasePoint>[]>();

  availableSeries = computed(() => {
    return this.series()?.filter((item) => item.showInControls !== false && item.type !== SeriesType.custom) ?? [];
  });

  enabledSeries = computed(() => {
    return this.availableSeries()?.filter((item) => item.enabled) ?? [];
  });

  disabledSeries = computed(() => {
    return this.availableSeries()?.filter((item) => !item.enabled) ?? [];
  });

  groupedSeries = computed(() => {
    const groupedSeries = this.disabledSeries().filter((item) => !!item.group) ?? [];
    const result = new Map<string, Series<BasePoint>[]>();
    groupedSeries.forEach((item) => {
      let group = result.get(item.group);
      if (!group) {
        group = [];
        result.set(item.group, group);
      }
      group.push(item);
    });
    return result;
  });

  flatSeries = computed(() => {
    return this.disabledSeries().filter((item) => !item.group) ?? [];
  });

  strokeWidth = [
    { id: 1, value: 1 },
    { id: 1.5, value: 1.5 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 6 },
  ];

  strokeArray = [
    { id: '', value: 'solid' },
    { id: '4, 4', value: 'dashed' },
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

  fillType = [
    { id: FillType.default, value: 'Default' },
    { id: FillType.gradient, value: 'Gradient' },
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
    if (value === SeriesType.area || value === SeriesType.blockArea || value === SeriesType.block) {
      series.fillType = FillType.gradient;
    }
    this.chartService.updateSeries(series);
  }

  setSeriesFillType(series: Series<BasePoint>, value: FillType) {
    series.fillType = value;
    this.chartService.updateSeries(series);
  }

  clear() {
    this.dialogService
      .confirm({
        title: this.translocoService.translate('charts.confirm_settings_reset'),
      })
      .subscribe((result) => {
        if (result) {
          this.chartService.clearSeriesSettings();
        }
      });
  }

  resetZoom() {
    this.scaleService.resetZoom();
  }

  protected readonly TetaSize = TetaSize;
  protected readonly SeriesType = SeriesType;
  protected readonly FillType = FillType;
}
