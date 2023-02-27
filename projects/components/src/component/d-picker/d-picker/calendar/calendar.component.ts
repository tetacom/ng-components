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
import {ControlValueAccessor} from "@angular/forms";
import {BehaviorSubject, combineLatest, map, ReplaySubject, takeWhile} from "rxjs";
import {DateTime, Info, Interval} from "luxon";
import {DayModel} from '../../../date-picker/model/day-model';
import {PickerTouchService} from "../../../date-picker/service/picker-touch.service";
import {viewType} from "../../../../common/model/view-type.model";
import {MinMaxDateModel} from "../../model/min-max-date.model";


@Component({
  selector: 'teta-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements ControlValueAccessor, OnChanges, OnDestroy {
  @Input() selectedDate: Date | string | number = new Date();
  @Input() locale: string;
  @Input() viewType: viewType;
  @Input() min: Date | string | number;
  @Input() max: Date | string | number;
  @Output() setDate: EventEmitter<Date> = new EventEmitter<Date>();
  public currentMonth: ReplaySubject<number> = new ReplaySubject<number>(1)
  public minMax: ReplaySubject<MinMaxDateModel> = new ReplaySubject<MinMaxDateModel>(1)
  public currentYear: ReplaySubject<number> = new ReplaySubject<number>(1)
  public selectedPicker: BehaviorSubject<'day' | 'month' | 'year'> = new BehaviorSubject<"day" | "month" | "year">('day')
  public calendar: DayModel[] = []
  private _alive = true;

  constructor(private _cdr: ChangeDetectorRef, private _pickerTouchService: PickerTouchService) {
    combineLatest([this.currentYear, this.currentMonth, this.minMax]).pipe(
      takeWhile(() => this._alive),
      map(([year, month, minMax]) => this.generateCalendar(DateTime.fromJSDate(new Date(this.selectedDate)), year, month, minMax))
    ).subscribe((_) => {
      this.calendar = _;
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
    this.selectedPicker.next("day")
  }

  selectYear(year: number) {
    this.setYear(year)
    this.selectedPicker.next("day")
  }

  ngOnChanges(changes: SimpleChanges): void {
    let date = new Date(this.selectedDate);
    this.currentMonth.next(new Date(date).getMonth() + 1)
    this.currentYear.next(new Date(date).getFullYear())
    this.minMax.next({min: this.min, max: this.max})
  }
  setYear(year: number){
    this.currentYear.next(year)
  }
  changeMonth(month: number, year: number) {
    if (month > 12) {
      this.currentMonth.next(1)
      this.currentYear.next(year + 1)
    } else if (month < 1) {
      this.currentMonth.next(12);
      this.currentYear.next(year - 1)
    } else {
      this.currentMonth.next(month);
    }

  }

  getMothName(month: number) {
    return Info.months('long', {locale: this.locale})[month - 1]
  }

  selectDate(date: Date) {
    this.setDate.emit(date);
  }

  generateCalendar(selectedDate: DateTime, year: number, month: number, minMax: MinMaxDateModel): DayModel[] {
    const calendarStartDay = selectedDate.set({day: 1, year, month}).startOf("week");
    const calendar = Interval.fromDateTimes(
      calendarStartDay,
      calendarStartDay.plus({day: 42}))
      .splitBy({day: 1}).map(d => d.start)
    return calendar.map((d) => {
      const matchesMinDate = DateTime.fromJSDate(new Date(minMax.min)).startOf('day').toJSDate() <= new Date(d.toJSDate()) || minMax.min === null;
      const matchesMaxDate = new Date(d.toJSDate()) <  DateTime.fromJSDate(new Date(minMax.max)).endOf('day').toJSDate() || minMax.max === null;
      return new DayModel({
        date: new Date(d.toJSDate()),
        isCurrentMonth: month === d.month,
        disabled: !matchesMinDate || !matchesMaxDate,
        selected: d.toJSDate().getFullYear() === selectedDate.toJSDate().getFullYear() && d.toJSDate().getMonth() === selectedDate.toJSDate().getMonth() && d.toJSDate().getDate() === selectedDate.toJSDate().getDate()
      })
    })

  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(val: Date | string): void {

  }


}
