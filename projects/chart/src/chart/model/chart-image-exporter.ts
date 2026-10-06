import { InjectionToken } from '@angular/core';
import { ChartImageExportOptions } from '@tetacom/ng-components';

export interface ChartImageExporter {
  exportImage(options?: ChartImageExportOptions): Promise<Blob>;
}

export const CHART_IMAGE_EXPORTER = new InjectionToken<ChartImageExporter>('ChartImageExporter');
