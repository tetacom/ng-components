import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DateTime, DateTimeFormatOptions } from 'luxon';

@Pipe({
  name: 'tetaDate',
})
export class TetaDatePipe implements PipeTransform {
  constructor(private _transloco: TranslocoService) {}

  transform(
    value: Date,
    format: string | DateTimeFormatOptions,
    timezone?: string,
    locale?: string
  ): string {
    if (value == null) {
      return '';
    }

    const activeLang = this._transloco.getActiveLang();
    let luxonDate = DateTime.fromJSDate(value);

    if (timezone) {
      luxonDate = luxonDate.setZone(timezone);
    }

    const params = {
      locale: locale || activeLang,
    };

    return typeof format === 'string'
      ? luxonDate.toFormat(format, params)
      : luxonDate.toLocaleString(
          format || DateTime.DATETIME_MED_WITH_SECONDS,
          params
        );
  }
}
