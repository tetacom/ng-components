import { Pipe, PipeTransform} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

@Pipe({
  name: 'tetaDate',
  standalone:true
})
export class TetaDatePipe implements PipeTransform {
  dateFormatMap:Map<string,string>=new Map().set('ru','D MMM, YYYY h:mm').set('en','MMM D, YYYY h:mm A')
  constructor(private _transloco:TranslocoService) {}

  transform(
    value: Date,
    format?: string ,
    timez?: string,
    locale?: string
  ): string {
    if (value == null) {
      return '';
    }
    dayjs.extend(isLeapYear)
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const activeLang = this._transloco?.getActiveLang();
    let date= dayjs(value);

    if (timez) {
      date= date.tz(timez)
    }

    const params = {
      locale: locale || activeLang,
    };
    return typeof format === 'string'
      ? date.locale(params.locale).format(format).toString()
      : date.locale(params.locale).format(this.dateFormatMap.get(params.locale)).toString();
  }
}
