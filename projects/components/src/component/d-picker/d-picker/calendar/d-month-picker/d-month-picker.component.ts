import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Info} from "luxon";
import {IIdName} from "../../../../../common/contract/i-id-name";
import {viewType} from "../../../../../common/model/view-type.model";

@Component({
  selector: 'teta-d-month-picker',
  templateUrl: './d-month-picker.component.html',
  styleUrls: ['./d-month-picker.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DMonthPickerComponent implements OnInit {
  @Input() locale: string;
  @Input() selectedMonth: number = 1;
  @Input() viewType: viewType;
  @Input() currentYear:number;
  @Output() selectMonth: EventEmitter<number> = new EventEmitter<number>()
  @Output() changeYear: EventEmitter<number> = new EventEmitter<number>()
  public months: IIdName<any>[] = [];

  constructor() {
  }

  pickMonth(monthId: number) {
    this.selectMonth.emit(monthId)
  }
  pickYear(year:number){
    this.changeYear.emit(year)
  }
  ngOnInit(): void {
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
      return {id: m, name: Info.months('short', {locale: this.locale})[m - 1],isSelected:this.selectedMonth===m}
    })
  }

}
