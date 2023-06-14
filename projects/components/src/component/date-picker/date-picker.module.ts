import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateCalendarComponent} from "./date-picker/date-calendar/date-calendar.component";
import {DayItemComponent} from './day-picker/day-item/day-item.component';
import {DayPickerComponent} from './day-picker/day-picker.component';
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {DropdownModule} from "../dropdown/dropdown.module";
import {ButtonModule} from "../button/button.module";
import {IconModule} from "../icon/icon.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "../input/input.module";
import {MonthPickerComponent} from './month-picker/month-picker.component';
import {YearPickerComponent} from './year-picker/year-picker.component';
import {ScrollToSelectedYearDirective} from './year-picker/scroll-to-selected-year.directive';
import {MaskitoModule} from "@maskito/angular";
import {ClickOutsideModule} from "../../directive/click-outside/click-outside.module";
import {DateRangeComponent} from "./date-range/date-range.component";
import {RangeCalendarComponent} from "./date-range/range-calendar/range-calendar.component";
import {ScrollIntoViewModule} from "../../directive/scroll-into-view/scroll-into-view.module";


@NgModule({
  declarations: [
    DateCalendarComponent,
    DayPickerComponent,
    DatePickerComponent,
    RangeCalendarComponent,
    DayItemComponent,
    MonthPickerComponent,
    ScrollToSelectedYearDirective,
    YearPickerComponent,
    ScrollToSelectedYearDirective,
    DateRangeComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule, FormsModule, MaskitoModule,
    IconModule, InputModule, ScrollIntoViewModule, ClickOutsideModule, ReactiveFormsModule,
  ],
  exports: [DatePickerComponent, DateCalendarComponent, RangeCalendarComponent, DateRangeComponent]
})
export class DatePickerModule {
}
