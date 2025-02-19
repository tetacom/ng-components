import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslocoLoader } from '@jsverse/transloco';
import { TranslocoLoaderData } from '@jsverse/transloco/lib/transloco.loader';

@Injectable({
  providedIn: 'root',
})
export class TranslocoHttpLoaderService implements TranslocoLoader {
  constructor() {}

  getTranslation(lang: string, data: TranslocoLoaderData) {
    return of({
      field_is_required: 'Field is required',
      settings: 'Settings',
      add_curve: 'Add curve',
      reset: 'Reset',
      line_width: 'Line width',
      line_style: 'Line style',
      chart_type: 'Chart type',
    });
  }
}
