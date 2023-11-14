import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {viewType} from "../../../common/model/view-type.model";
import dayjs from "dayjs";
import {MinMaxDateModel} from "../model/min-max-date.model";
import {TetaLocalisation} from "../../../locale/teta-localisation";

@Component({
  selector: 'teta-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearPickerComponent implements OnInit {
  @Input() selectedYear: number;
  @Input() viewType: viewType;
  @Input() minMax?: MinMaxDateModel;
  @Input() locale: TetaLocalisation;
  @Output() selectYear: EventEmitter<number> = new EventEmitter<number>()
  public years: { id: number, isSelected: boolean,disabled:boolean }[]

  constructor() {
  }

  pickYear(year: number,disabled:boolean) {
    if(!disabled){
      this.selectYear.emit(year)
    }
  }

  ngOnInit(): void {
    this.years = new Array(100).fill(1).map((v, i) => {
      const year = new Date().getFullYear() + (i - 50);
      return {id: year, isSelected: year === this.selectedYear, disabled: this.isDisabled(year)}
    })

  }

  isDisabled(year: number) {
    if (this.minMax) {
      const isSuitableMax=dayjs(new Date().setFullYear(year)).startOf('year').isAfter(new Date(this.minMax.max)) && this.minMax.max!==null
      const isSuitableMin=dayjs(new Date().setFullYear(year)).endOf('year').isBefore(new Date(this.minMax.min)) && this.minMax.min!==null
      return isSuitableMax||isSuitableMin
    }
    return false
  }


}
