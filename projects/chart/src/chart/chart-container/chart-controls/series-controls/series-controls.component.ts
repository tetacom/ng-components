import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import {
  AccordionComponent,
  AccordionContentDirective,
  AccordionHeadComponent,
  AccordionItemComponent,
  Align,
  ButtonComponent,
  ColorInputComponent,
  DropdownComponent,
  DropdownContentDirective,
  DropdownHeadDirective,
  IconComponent,
  InputComponent,
  ScrollContainerComponent,
  SelectComponent,
  SelectOptionDirective,
  SelectValueDirective,
  TetaSize,
} from '@tetacom/ng-components';
import { NgTemplateOutlet } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { BasePoint } from '../../../model/base-point';
import { Series } from '../../../model/series';
import { SeriesType } from '../../../model/enum/series-type';
import { ChartService } from '../../../service/chart.service';
import { FillType } from '../../../model/enum/fill-type';
import { defaultSeriesTypeMapping } from '../../../default/defaultSeriesTypeMapping';
import { LineSeriesComponent } from '../../series/line/line-series.component';
import { FormsModule } from '@angular/forms';

interface SeriesControlGroup {
  name: string;
  series: Series<BasePoint>[];
  children: SeriesControlGroup[];
}

@Component({
  selector: 'teta-series-controls',
  imports: [
    AccordionComponent,
    AccordionContentDirective,
    AccordionHeadComponent,
    AccordionItemComponent,
    ButtonComponent,
    ColorInputComponent,
    DropdownComponent,
    DropdownContentDirective,
    DropdownHeadDirective,
    IconComponent,
    InputComponent,
    NgTemplateOutlet,
    ScrollContainerComponent,
    SelectComponent,
    SelectOptionDirective,
    SelectValueDirective,
    TranslocoPipe,
    FormsModule,
  ],
  templateUrl: './series-controls.component.html',
  styleUrl: './series-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesControlsComponent {
  private chartService = inject(ChartService);

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
    // Enabled curves still define the hierarchy of groups in the add menu.
    const parents = new Map<string, string>();
    for (const item of this.availableSeries()) {
      if (item.group && item.parentGroup && !parents.has(item.group)) {
        parents.set(item.group, item.parentGroup);
      }
    }

    const groups = new Map<string, SeriesControlGroup>();
    const getGroup = (name: string) => {
      if (!groups.has(name)) {
        groups.set(name, { name, series: [], children: [] });
      }
      return groups.get(name)!;
    };

    for (const item of this.disabledSeries()) {
      if (!item.group) {
        continue;
      }
      getGroup(item.group).series.push(item);
      const visited = new Set<string>([item.group]);
      let parent = parents.get(item.group);
      while (parent && !visited.has(parent)) {
        visited.add(parent);
        getGroup(parent);
        parent = parents.get(parent);
      }
    }

    const roots: SeriesControlGroup[] = [];
    // Keep the alphabetical ordering previously supplied by KeyValuePipe.
    const sortedGroups = [...groups.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const group of sortedGroups) {
      const parent = groups.get(parents.get(group.name));
      // Invalid cyclic references must not hide curves or recurse indefinitely.
      const visited = new Set<string>([group.name]);
      let ancestor = parent?.name;
      while (ancestor && !visited.has(ancestor)) {
        visited.add(ancestor);
        ancestor = parents.get(ancestor);
      }
      if (parent && !ancestor) {
        parent.children.push(group);
      } else {
        roots.push(group);
      }
    }
    return roots;
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

  protected readonly SeriesType = SeriesType;
  protected readonly FillType = FillType;
  protected readonly Align = Align;
  protected readonly TetaSize = TetaSize;
}
