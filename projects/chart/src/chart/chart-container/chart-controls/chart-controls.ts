import { CHART_IMAGE_EXPORTER } from '../../model/chart-image-exporter';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import {
  Align,
  ButtonComponent,
  DialogService,
  DropdownComponent,
  DropdownContentDirective,
  DropdownHeadDirective,
  IconComponent,
  TabComponent,
  TabContentDirective,
  TabsComponent,
  TabTitleDirective,
  TetaSize,
} from '@tetacom/ng-components';
import { ChartService } from '../../service/chart.service';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ScaleService } from '../../service/scale.service';
import { AxisOrientation } from '../../model/enum/axis-orientation';
import { IChartConfig } from '../../model/i-chart-config';
import { SeriesControlsComponent } from './series-controls/series-controls.component';
import { AxisControls } from './axis-controls/axis-controls';

@Component({
  selector: 'teta-chart-controls',
  imports: [
    ButtonComponent,
    DropdownComponent,
    DropdownContentDirective,
    DropdownHeadDirective,
    IconComponent,
    TranslocoPipe,
    TabsComponent,
    TabComponent,
    TabContentDirective,
    TabTitleDirective,
    SeriesControlsComponent,
    AxisControls,
  ],
  templateUrl: './chart-controls.html',
  styleUrl: './chart-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartControls {
  private chartService = inject(ChartService);
  private scaleService = inject(ScaleService);
  private dialogService = inject(DialogService);
  private translocoService = inject(TranslocoService);
  protected readonly Align = Align;
  protected readonly AxisOrientation = AxisOrientation;

  config = input<IChartConfig>();
  downloading = signal(false);
  private imageExporter = inject(CHART_IMAGE_EXPORTER);

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

  async download() {
    if (this.downloading()) return;
    this.downloading.set(true);
    let url: string | undefined;
    try {
      const blob = await this.imageExporter.exportImage();
      url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'chart.png';
      document.body.appendChild(anchor);
      try {
        anchor.click();
      } finally {
        anchor.remove();
      }
    } catch (error) {
      console.error('Failed to download chart image', error);
    } finally {
      if (url) setTimeout(() => URL.revokeObjectURL(url), 0);
      this.downloading.set(false);
    }
  }

  protected readonly TetaSize = TetaSize;
}
