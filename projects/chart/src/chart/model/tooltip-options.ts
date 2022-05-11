import { TooltipTracking } from './enum/tooltip-tracking';
import { IDisplayTooltip } from './i-display-tooltip';
import {TemplateRef} from "@angular/core";

export interface TooltipOptions {
  enable?: boolean;
  showMarkers?: boolean;
  showLine?: boolean;
  showCrosshair?: boolean;
  tracking?: TooltipTracking;
  template?: TemplateRef<IDisplayTooltip[]>;
  format?: (data: IDisplayTooltip[]) => string;
  padding?: {
    x?: number,
    y?: number
  }
}
