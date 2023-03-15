import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from "./date-picker/calendar/calendar.component";
import {DayItemComponent} from './date-picker/calendar/day-picker/day-item/day-item.component';
import {DayPickerComponent} from './date-picker/calendar/day-picker/day-picker.component';
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {DropdownModule} from "../dropdown/dropdown.module";
import {ButtonModule} from "../button/button.module";
import {IconModule} from "../icon/icon.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../input/input.module";
import {MonthPickerComponent} from './date-picker/calendar/month-picker/month-picker.component';
import {YearPickerComponent} from './date-picker/calendar/year-picker/year-picker.component';
import {ScrollToSelectedYearDirective} from './date-picker/calendar/year-picker/scroll-to-selected-year.directive';
import { ScrollIntoViewModule} from "@tetacom/ng-components";
import {MaskitoModule} from "@maskito/angular";
import {ClickOutsideModule} from "../../directive/click-outside/click-outside.module";



@NgModule({
  declarations: [
    CalendarComponent,
    DayPickerComponent,
    DatePickerComponent,
    DayItemComponent,
    MonthPickerComponent,
    ScrollToSelectedYearDirective,
    YearPickerComponent,
    ScrollToSelectedYearDirective,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule, FormsModule, MaskitoModule,
    IconModule, InputModule, ScrollIntoViewModule, ClickOutsideModule, ReactiveFormsModule,
  ],
  exports: [DatePickerComponent, CalendarComponent]
})
export class DatePickerModule {
}
