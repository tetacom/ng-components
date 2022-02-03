import { TooltipTracking } from './enum/tooltip-tracking';
import { IDisplayTooltip } from './i-display-tooltip';

export interface TooltipOptions {
  enable?: boolean;
  showMarkers?: boolean;
  showLine?: boolean;
  tracking?: TooltipTracking;
  format?: (data: IDisplayTooltip[]) => string;
}
