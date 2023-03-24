import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {BehaviorSubject, combineLatest, map, ReplaySubject, takeWhile} from "rxjs";
import {DayModel} from '../../model/day-model';
import {viewType} from "../../../../common/model/view-type.model";
import {MinMaxDateModel} from "../../model/min-max-date.model";
import dayjs, {Dayjs} from "dayjs";


@Component({
  selector: 'teta-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnChanges, OnDestroy {
  @Input() selectedDate: Date | string | number = new Date();
  @Input() locale: string;
  @Input() open: boolean;
  @Input() viewType: viewType;
  @Input() min: Date | string | number;
  @Input() isDateNull: boolean;
  @Input() max: Date | string | number;
  @Output() setDate: EventEmitter<Date> = new EventEmitter<Date>();
  public currentMonth: ReplaySubject<number> = new ReplaySubject<number>(1)
  public minMax: ReplaySubject<MinMaxDateModel> = new ReplaySubject<MinMaxDateModel>(1)
  public currentYear: ReplaySubject<number> = new ReplaySubject<number>(1)
  public selectedPicker: BehaviorSubject<'day' | 'month' | 'year'> = new BehaviorSubject<"day" | "month" | "year">('day')
  public calendar: DayModel[] = []
  public localeMonths = new Map().set('ru', ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'])
    .set('en', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])

  private _alive = true;

  constructor(private _cdr: ChangeDetectorRef
  ) {
    dayjs().locale('ru', {weekStart: 1});
    combineLatest([this.currentYear, this.currentMonth, this.minMax]).pipe(
      takeWhile(() => this._alive),
      map(([year, month, minMax]) => {
        return this.generateCalendar(dayjs(new Date(this.selectedDate)).locale(this.locale), year, month, minMax)
      })
    ).subscribe((_) => {
      this.calendar = _;
    })
  }

  generateCalendar(selectedDate: Dayjs, year: number, month: number, minMax: MinMaxDateModel): DayModel[] {
    const calendarStartDay = selectedDate.set("year", year).set("month", month).set("date", 1).startOf('week');
    const calendar = new Array(42).fill(1).map((v, i) => {
      return calendarStartDay.add(i, 'day')
    });
    return calendar.map((d) => {
      const matchesMinDate = dayjs(new Date(minMax.min)).startOf('date').toDate() <= new Date(d.toDate()) || minMax.min === null;
      const matchesMaxDate = new Date(d.toDate()) < dayjs(new Date(minMax.max)).endOf('date').toDate() || minMax.max === null;
      return new DayModel({
        date: new Date(d.toDate()),
        isCurrentMonth: month === d.month(),
        disabled: !matchesMinDate || !matchesMaxDate,
        selected: d.toDate().getFullYear() === new Date(this.selectedDate).getFullYear() && !this.isDateNull && d.toDate().getMonth() === selectedDate.toDate().getMonth() && d.toDate().getDate() === selectedDate.toDate().getDate()
      })
    })

  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  selectPicker(entity: "day" | "month" | "year") {
    this.selectedPicker.next(entity)
  }

  selectMonth(month: number) {
    this.currentMonth.next(month)
    this.selectPicker("day")
  }

  selectYear(year: number) {
    this.setYear(year)
    this.selectPicker("day")
  }

  ngOnChanges(changes: SimpleChanges): void {
    let date = new Date(this.selectedDate);
    this.currentMonth.next(new Date(date).getMonth())
    this.currentYear.next(new Date(date).getFullYear())
    this.minMax.next({min: this.min, max: this.max})
  }

  setYear(year: number) {
    this.currentYear.next(year)
  }

  changeMonth(month: number, year: number) {
    if (month > 11) {
      this.currentMonth.next(0)
      this.currentYear.next(year + 1)
    } else if (month < 0) {
      this.currentMonth.next(11);
      this.currentYear.next(year - 1)
    } else {
      this.currentMonth.next(month);
    }

  }

  getMothName(month: number) {
    return this.localeMonths.get(this.locale)[month]
  }

  selectDate(date: Date) {
    this.setDate.emit(date);
  }

}
