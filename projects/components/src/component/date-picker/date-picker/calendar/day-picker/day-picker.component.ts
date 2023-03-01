import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Info} from "luxon";
import { viewType } from 'projects/components/src/common/model/view-type.model';
import {DayModel} from "../../../model/day-model";

@Component({
  selector: 'teta-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayPickerComponent implements OnInit {
  @Input() date: Date | string | number = new Date();
  @Input() calendar: DayModel[];
  @Input() viewType: viewType;
  @Input() min:Date | string | number;
  @Input() max:Date | string | number;

  @Input() locale: string;
  @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>()
  public daysOfWeek: string[] = [];


  constructor() {
  }

  pickDate(day: DayModel) {
    if(!day.disabled){
      this.selectDate.emit(day.date)
    }

  }

  ngOnInit(): void {
    this.daysOfWeek = [0, 1, 2, 3, 4, 5, 6].map((d) => {
      return Info.weekdays('short', {locale: this.locale})[d]
    })
  }


}
