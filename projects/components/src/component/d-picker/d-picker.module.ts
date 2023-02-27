import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from "./d-picker/calendar/calendar.component";
import {DayItemComponent} from './d-picker/calendar/day-picker/day-item/day-item.component';
import {DayPickerComponent} from './d-picker/calendar/day-picker/day-picker.component';
import {DPickerComponent} from "./d-picker/d-picker.component";
import {DropdownModule} from "../dropdown/dropdown.module";
import {ButtonModule} from "../button/button.module";
import {IconModule} from "../icon/icon.module";
import {FormsModule} from "@angular/forms";
import {InputModule} from "../input/input.module";
import { DMonthPickerComponent } from './d-picker/calendar/d-month-picker/d-month-picker.component';
import { YearPickerComponent } from './d-picker/calendar/year-picker/year-picker.component';
import { ScrollToSelectedYearDirective } from './d-picker/calendar/year-picker/scroll-to-selected-year.directive';
import {ScrollIntoViewModule} from "@tetacom/ng-components";


@NgModule({
  declarations: [
    CalendarComponent,
    DayPickerComponent,
    DPickerComponent,
    DayItemComponent,
    DMonthPickerComponent,
    ScrollToSelectedYearDirective,
    YearPickerComponent,
    ScrollToSelectedYearDirective
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule, FormsModule,
    IconModule, InputModule, ScrollIntoViewModule,
  ],
  exports: [DPickerComponent, CalendarComponent]
})
export class DPickerModule {
}
