import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IIdName} from "../../../common/contract/i-id-name";
import {viewType} from "../../../common/model/view-type.model";

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
  @Input() localeMoths:Map<string,string[]>
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

  ngOnInit(): void {
    this.months = this.localeMoths.get(this.locale).map((m,i) => {
      return {
        id: i,
        name: m,
        isSelected: this.selectedMonth === i
      }
    })
  }

}
