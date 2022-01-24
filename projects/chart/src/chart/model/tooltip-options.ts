import { TooltipTracking } from './enum/tooltip-tracking';

export interface TooltipOptions {
  enable?: boolean;
  showMarkers?: boolean;
  showLine?: boolean;
  tracking?: TooltipTracking;
  format?: (data: any) => any;
  //
  // constructor(options?: {
  //   enable?: boolean;
  //   showMarkers?: boolean;
  //   showLine?: boolean;
  //   tracking?: TooltipTracking;
  //   format?: (data: any) => any;
  // }) {
  //   const defaultFormatter = (tooltips) => {
  //     let html = '';
  //
  //     // tooltips
  //     //   .filter((_) => _.point)
  //     //   .forEach((_) => {
  //     //     html += `<div>${_.name ?? 'Без названия'} x: ${_.point?.x?.toFixed(
  //     //       2
  //     //     )} y: ${_.point?.y?.toFixed(2)}</div>`;
  //     //   });
  //
  //     return html;
  //   };
  //
  //   this.enable = options?.enable ?? true;
  //   this.showMarkers = options?.showMarkers ?? true;
  //   this.showLine = options?.showLine ?? false;
  //   this.tracking = options?.tracking ?? TooltipTracking.x;
  //   this.format = options?.format ?? defaultFormatter;
  // }
}
