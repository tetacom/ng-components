import {prependZero} from '../pipe/util/number-helper';

export class DateUtil {
  /**
   * Вычесть n-дней
   */

  public static subtractDays(date: Date, days = 0): Date | null {
    if (date && date instanceof Date) {
      const dt = new Date(date.getTime());

      dt.setDate(dt.getDate() - days);
      return dt;
    }

    return null;
  }

  /**
   * Добавить n-дней
   */

  public static addDays(date: Date, days = 0): Date | null {
    if (date && date instanceof Date) {
      const dt = new Date(date.getTime());

      dt.setDate(dt.getDate() + days);
      return dt;
    }

    return null;
  }

  /**
   * Получить дату из строки
   */
  public static parseString(dat: string): Date | null {
    if (!dat || dat.length < 1) {
      return null;
    }

    const parts = dat.split(' ');
    const dtPart = parts[0].split('.');
    const tPart = parts[1]?.split(':') ?? ['0', '0', '0'];
    const parsedDate = new Date(
      parseInt(dtPart[2], 10),
      parseInt(dtPart[1], 10) - 1,
      parseInt(dtPart[0], 10),
      parseInt(tPart[0], 10),
      parseInt(tPart[1], 10),
      parseInt(tPart[2], 10)
    );
    if (isNaN(parsedDate.getTime())) {
      return null;
    }
    return parsedDate;
  }

  /**
   * Привести дату к строке
   */
  public static toString(dat: Date): string {
    if (!dat || !(dat instanceof Date)) {
      return '';
    }
    const month = dat.getMonth() + 1;
    return `${prependZero(dat.getDate(), 2)}.${prependZero(month, 2)}.${dat.getFullYear()} ${prependZero(dat.getHours(), 2)}:${prependZero(dat.getMinutes(), 2)}:${prependZero(dat.getSeconds(), 2)}`;
  }

  /**
   * Подготовка даты к отправке на сервер, чтобы небыло смещения часов
   */
  public static convertUTC2DateLocal(date?: Date): Date | null {
    if (date && date instanceof Date) {
      const timezoneOffsetMs: number =
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ).getTimezoneOffset() * 60000;
      return new Date(date.getTime() - timezoneOffsetMs);
    }
    return null;
  }

  /**
   * Подготовка даты к отправке на сервер, чтобы небыло смещения часов
   */
  public static convertDateLocal2UTC(date?: Date): Date | null {
    if (date && date instanceof Date) {
      const timezoneOffsetMs: number =
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ).getTimezoneOffset() * 60000;
      return date == null ? null : new Date(date.getTime() + timezoneOffsetMs);
    }
    return null;
  }

  public static convertDateStringsToDates(input: any): any {
    const regexIso8601 =
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    if (typeof input === 'string' && regexIso8601.test(input)) {
      return DateUtil.convertStringToLocalDate(input);
    }
    if (typeof input !== 'object' || !input) {
      return input;
    }
    let res: any | any[];
    if (input instanceof Array) {
      res = [];
    } else {
      res = {};
    }
    return DateUtil.fillConvertDateStringsToDates(res, input);
  }

  public static convertDates(input: any | any[]): any | any[] {
    if (typeof input !== 'object' || !input) {
      return input;
    }
    if (input instanceof Date) {
      return DateUtil.convertUTC2DateLocal(input);
    }
    let res: any | any[];
    if (input instanceof Array) {
      res = [];
    } else {
      res = {};
    }
    return DateUtil.fillConvertDates(res, input);
  }

  public static getMonthDaysCount(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  // Возвращает список месяцев между двумя датами
  public static getRangeOfMonths(start: Date, end: Date): Date[] {
    if (start > end || !start || !end) {
      return null;
    }
    const resDates: Date[] = [];
    let i = 0;
    let dateTmp = new Date(start.getFullYear(), start.getMonth() + i, 1);
    while (end >= dateTmp) {
      resDates.push(dateTmp);
      i++;
      dateTmp = new Date(start.getFullYear(), start.getMonth() + i, 1);
    }
    return resDates;
  }

  public static truncateToMonth(date: Date): Date {
    const res = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
    return res;
  }

  public static truncateToDay(date: Date): Date {
    const res = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    );
    return res;
  }

  public static truncateToHour(date: Date): Date {
    const res = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      0,
      0
    );
    return res;
  }

  public static toISOString(date: number): string {
    return (
      new Date(date - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, -5) + 'Z'
    );
  }

  public static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  public static millisecondToHumanFormat(milliSeconds: number, maxValue = 5000, showDays = false): string {
    const negative = milliSeconds < 0;
    if (negative) {
      milliSeconds = -milliSeconds;
    }
    let d;
    if (showDays) {
      d = Math.trunc(milliSeconds / (60000 * 60 * 24));
      milliSeconds = milliSeconds - 60000 * 60 * 24 * d;
    }
    const h = Math.trunc(milliSeconds / (60000 * 60));
    milliSeconds = milliSeconds - 60000 * 60 * h;
    const m = Math.trunc(milliSeconds / 60000);
    milliSeconds = milliSeconds - 60000 * m;
    const s = Math.trunc(milliSeconds / 1000);
    milliSeconds = milliSeconds - 1000 * s;
    const frac = milliSeconds;
    let result = m ? m + ' м ' : ''; // start with minutes
    if (maxValue < 60000 * 60) {
      if (s) {
        result = result + s + ' с '; // add seconds value
      }

      if(s === 0 && !m) {
        result = result + '0 c'
      }
    }
    if (maxValue < 5000) {
      result = frac ? result + frac + ' мс ' : result;
    }

    if (h) {
      result = h + ' ч ' + result;
    }
    if (d) {
      result = d + 'д ' + result;
    }
    if (negative) {
      result = '-' + result;
    }



    return result.trim();
  }

  private static fillConvertDates(result: any, input: any): any {
    for (const key in input) {
      if (!input.hasOwnProperty || !input.hasOwnProperty(key)) {
        continue;
      }
      if (input.hasOwnProperty(key)) {
        let value = input[key];
        if (value instanceof Date) {
          if (value !== null && value !== undefined) {
            value = DateUtil.convertUTC2DateLocal(value);
          }
          result[key] = value;
        } else if (typeof value === 'object') {
          result[key] = DateUtil.convertDates(value);
        } else {
          result[key] = value;
        }
      }
    }
    return result;
  }

  private static fillConvertDateStringsToDates(result: any, input: any): any {
    const regexIso8601 =
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z?)?$/i;
    for (const key in input) {
      if (!input.hasOwnProperty(key)) {
        continue;
      }
      const value = input[key];
      if (typeof value === 'string' && regexIso8601.test(value)) {
        result[key] = DateUtil.convertStringToLocalDate(value);
      } else if (typeof value === 'object') {
        result[key] = DateUtil.convertDateStringsToDates(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  private static convertStringToLocalDate(dateString: string): Date | null {
    const milliseconds = Date.parse(dateString);
    if (!isNaN(milliseconds)) {
      const dt = new Date(milliseconds);
      return DateUtil.convertDateLocal2UTC(dt);
    }
    return null;
  }
}
