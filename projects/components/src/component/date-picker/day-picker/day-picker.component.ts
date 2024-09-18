import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DayModel } from '../model/day-model';
import { DateFromToModel } from '../model/from-to.model';
import dayjs from 'dayjs';
import { viewType } from '../../../common/model/view-type.model';
import { TetaLocalisation } from '../../../locale/teta-localisation';
import { DayItemComponent } from './day-item/day-item.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'teta-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, DayItemComponent],
})
export class DayPickerComponent implements OnChanges {
  @Input() date: Date | string | number = new Date();
  @Input() calendar: DayModel[];
  @Input() viewType: viewType;
  @Input() range?: DateFromToModel;
  @Input() min: Date | string | number;
  @Input() max: Date | string | number;
  @Input() locale: TetaLocalisation;
  @Input() hoveredDate?: Date;
  @Output() hoveredDateChange?: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>();
  public dayOrder: string[];
  constructor() {}

  isInRange(day: DayModel, from: Date | number | string, to: Date | number | string) {
    const matchesMinDate = dayjs(new Date(from)).startOf('date').toDate() <= day.date;
    const matchesMaxDate = day.date < dayjs(new Date(to)).endOf('date').toDate();
    return matchesMinDate && matchesMaxDate;
  }

  isHoveredRange(day: DayModel) {
    if (!this.range?.to && this.range?.from) {
      return (
        this.isInRange(day, this.range.from, this.hoveredDate) || this.isInRange(day, this.hoveredDate, this.range.from)
      );
    }
    return false;
  }

  isActiveRange(day: DayModel) {
    if (this.range?.from && this.range?.to) {
      return this.isInRange(day, this.range.from, this.range.to);
    }
    return false;
  }

  pickDate(day: DayModel) {
    if (!day.disabled) {
      this.selectDate.emit(day.date);
    }
  }

  getRangeActiveClass(d: DayModel) {
    if (this.range && new Date(this.range?.from).getTime() !== new Date(this.range?.to).getTime()) {
      if (this.range.to) {
        return this.getClassStaticItem(d);
      } else {
        if (this.hoveredDate.getTime() === d.date.getTime()) {
          return this.getClassHoveredItem();
        } else {
          return this.getClassSelectedItem(d);
        }
      }
    }
    return '';
  }

  hover(date: Date) {
    if (date?.getTime() !== this.hoveredDate?.getTime()) {
      this.hoveredDate = date;
      this.hoveredDateChange.emit(date);
    }
  }

  getClassStaticItem(d: DayModel) {
    const from = dayjs(new Date(this.range.from)).startOf('day').toDate();
    const to = dayjs(new Date(this.range.to)).startOf('day').toDate();
    const itemDate = dayjs(new Date(d.date)).startOf('day').toDate();
    if (from.getTime() === itemDate.getTime()) {
      return 'datepicker-date_active-first';
    }
    if (to.getTime() === itemDate.getTime()) {
      return 'datepicker-date_active-second';
    }
    return '';
  }

  getClassHoveredItem() {
    if (new Date(this.range.from) > this.hoveredDate) {
      return 'datepicker-date_active-first';
    }
    if (new Date(this.range.from) < this.hoveredDate) {
      return 'datepicker-date_active-second';
    }
    return '';
  }

  getClassSelectedItem(d: DayModel) {
    if (d.selected && d.date < this.hoveredDate) {
      return 'datepicker-date_active-first';
    }
    if (d.selected && d.date > this.hoveredDate) {
      return 'datepicker-date_active-second';
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const arr = [...this.locale.daysShort];
    arr.push(arr.shift());
    this.dayOrder = arr;
  }
}
