import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {viewType} from "../../../../../common/model/view-type.model";

@Component({
  selector: 'teta-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearPickerComponent implements OnInit {
  @Input() selectedYear: number;
  @Input() viewType:viewType;
  @Input() locale:string;
  @Output() selectYear:EventEmitter<number>=new EventEmitter<number>()

  public yearPickerDictionary:Map<string,string>=new Map<string, string>().set('ru','Выберете год').set('en','Select year')
  public alive=true;
  public years: { id: number, isSelected: boolean }[]

  constructor() {
  }
  pickYear(year:number){
    this.selectYear.emit(year)
  }
  ngOnInit(): void {
    this.years = new Array(100).fill(1).map((v,i) => {
      const year=new Date().getFullYear() + (i - 50);
      return {id:year, isSelected: year === this.selectedYear}
    })

  }


}
