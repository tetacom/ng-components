import { DatePeriod } from '../model/date-period';
import { DayModel } from '../model/day-model';

export class DatePickerUtil {
  static getFirstDay(
    month: number,
    year: number,
    firstDayOfWeek: number
  ): Date {
    const lastDay = new Date(year, month, 0);
    const lastDayIndex =
      lastDay.getDay() >= firstDayOfWeek
        ? lastDay.getDay() - firstDayOfWeek
        : lastDay.getDay() + 7 - firstDayOfWeek;
    return new Date(year, month - 1, lastDay.getDate() - lastDayIndex);
  }

  static getPickerDays(
    date: Date,
    firstDayOfWeek: number,
    minDate: Date,
    maxDate: Date,
    disabledDates: Date[],
    disabledDays: number[],
    disabledPeriods: DatePeriod[]
  ): DayModel[] {
    const days = [];
    const firstDay = DatePickerUtil.getFirstDay(
      date.getMonth(),
      date.getFullYear(),
      firstDayOfWeek
    );
    for (let i = 0; i < 6 * 7; i++) {
      const dat = new Date(firstDay);
      dat.setDate(dat.getDate() + i);
      days.push(
        new DayModel({
          date: dat,
          disabled: DatePickerUtil.isDateInvalid(
            dat,
            minDate,
            maxDate,
            disabledDates,
            disabledDays,
            disabledPeriods
          ),
          today: DatePickerUtil.isToday(dat),
          isCurrentMonth: dat.getMonth() === date.getMonth(),
          selected:
            dat.getFullYear() === date.getFullYear() &&
            dat.getMonth() === date.getMonth() &&
            dat.getDate() === date.getDate(),
          weekend: dat.getDay() === 0 || dat.getDay() === 6,
        })
      );
    }
    return days;
  }

  static isDateInvalid(
    dat: Date,
    minDate: Date,
    maxDate: Date,
    disabledDates: Date[],
    disabledDays: number[],
    disabledPeriods: DatePeriod[]
  ): boolean {
    return (
      DatePickerUtil.isDayDisabled(dat, disabledDays) ||
      DatePickerUtil.isDateDisabled(dat, disabledDates) ||
      DatePickerUtil.isDateInDisabledPeriod(dat, disabledPeriods) ||
      DatePickerUtil.isMaxInvalid(dat, maxDate) ||
      DatePickerUtil.isMinInvalid(dat, minDate)
    );
  }

  static isDayDisabled(dat: Date, disabledDays: number[]): boolean {
    if (
      dat === null ||
      dat === undefined ||
      disabledDays === null ||
      disabledDays === undefined ||
      disabledDays.length < 1
    ) {
      return false;
    }
    return disabledDays.indexOf(dat.getDay()) >= 0;
  }

  static isMinInvalid(dat: Date, minDate: Date): boolean {
    if (
      dat === null ||
      dat === undefined ||
      minDate === null ||
      minDate === undefined
    ) {
      return false;
    }
    return minDate.getTime() > dat.getTime();
  }

  static isMaxInvalid(dat: Date, maxDate: Date): boolean {
    if (
      dat === null ||
      dat === undefined ||
      maxDate === null ||
      maxDate === undefined
    ) {
      return false;
    }
    return maxDate.getTime() < dat.getTime();
  }

  static isDateInDisabledPeriod(
    dat: Date,
    disabledPeriods: DatePeriod[]
  ): boolean {
    if (
      dat === null ||
      dat === undefined ||
      disabledPeriods === null ||
      disabledPeriods === undefined ||
      disabledPeriods.length < 1
    ) {
      return false;
    }
    return disabledPeriods.some(
      (d: DatePeriod) =>
        d !== null &&
        d !== undefined &&
        d.start !== null &&
        d.start !== undefined &&
        d.end !== null &&
        d.end !== undefined &&
        d.start.getTime() <= dat.getTime() &&
        d.end.getTime() >= dat.getTime()
    );
  }

  static isDateDisabled(dat: Date, disabledDates: Date[]): boolean {
    if (
      disabledDates === null ||
      disabledDates === undefined ||
      disabledDates.length < 1 ||
      dat === null ||
      dat === undefined
    ) {
      return false;
    }
    return disabledDates.some(
      (d: Date) =>
        d !== null &&
        d !== undefined &&
        d.getFullYear() === dat.getFullYear() &&
        d.getMonth() === dat.getMonth() &&
        d.getDate() === dat.getDate()
    );
  }

  static isToday(dat: Date): boolean {
    if (dat === null || dat === undefined) {
      return false;
    }
    const today = new Date();
    return (
      dat.getFullYear() === today.getFullYear() &&
      dat.getMonth() === today.getMonth() &&
      dat.getDate() === today.getDate()
    );
  }

  static scrollMonth(delta: number, date: Date) {
    const res = new Date(date);
    let month = date.getMonth();
    let year = date.getFullYear();
    if (delta > 0) {
      if (month === 11) {
        month = 0;
        year++;
      } else {
        month++;
      }
    } else {
      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
    }
    res.setFullYear(year, month);
    return res;
  }

  static scrollYear(delta: number, date: Date) {
    const res = new Date(date);
    let year = date.getFullYear();
    if (delta > 0) {
      year++;
    } else {
      year--;
    }
    res.setFullYear(year);
    return res;
  }

  // static isSelected(date: Date, selectedDate: Date): boolean {
  //   if (date === null || date === undefined || selectedDate === null || selectedDate === undefined) {
  //     return false;
  //   }
  //   return date.getFullYear() === selectedDate.getFullYear()
  //     && date.getMonth() === selectedDate.getMonth()
  //     && date.getDate() === selectedDate.getDate();
  // }

  // static nextMonth(date: Date): Date {
  //   const dt = new Date(date);
  //   dt.setMonth(dt.getMonth() + 1);
  //   return dt;
  // }

  // static prevMonth(date: Date): Date {
  //   const dt = new Date(date);
  //   dt.setMonth(dt.getMonth() - 1);
  //   return dt;
  // }
}
