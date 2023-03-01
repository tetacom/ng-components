import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Info} from "luxon";
import {IIdName} from "../../../../../common/contract/i-id-name";
import {viewType} from "../../../../../common/model/view-type.model";

@Component({
  selector: 'teta-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthPickerComponent implements OnInit {
  @Input() locale: string;
  @Input() selectedMonth: number = 1;
  @Input() viewType: viewType;
  @Input() currentYear: number;
  @Output() selectMonth: EventEmitter<number> = new EventEmitter<number>()
  @Output() changeYear: EventEmitter<number> = new EventEmitter<number>()
  public months: IIdName<any>[] = [];

  constructor() {
  }

  pickMonth(monthId: number) {
    this.selectMonth.emit(monthId)
  }

  pickYear(year: number) {
    this.changeYear.emit(year)
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  ngOnInit(): void {
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
      return {
        id: m,
        name: this.capitalizeFirstLetter(Info.months('long', {locale: this.locale})[m - 1]),
        isSelected: this.selectedMonth === m
      }
    })
  }

}
