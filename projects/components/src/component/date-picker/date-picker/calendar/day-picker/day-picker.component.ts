import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {viewType} from 'projects/components/src/common/model/view-type.model';
import {DayModel} from "../../../model/day-model";

@Component({
  selector: 'teta-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPickerComponent {
  @Input() date: Date | string | number = new Date();
  @Input() calendar: DayModel[];
  @Input() viewType: viewType;
  @Input() min: Date | string | number;
  @Input() max: Date | string | number;
  @Input() locale: string;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>()
  public daysOfWeek = new Map().set('ru', ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']).set('en', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])


  constructor() {
  }

  pickDate(day: DayModel) {
    if (!day.disabled) {
      this.selectDate.emit(day.date)
    }

  }


}
