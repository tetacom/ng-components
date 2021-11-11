import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ClickOutsideModule } from '../../directive/click-outside/click-outside.module';
import { IconModule } from '../icon/icon.module';
import { DaySelectComponent } from './day-select/day-select.component';
import { YearSelectComponent } from './year-select/year-select.component';
import { MonthSelectComponent } from './month-select/month-select.component';
import { PrependZeroModule } from '../../pipe/prepend-zero/prepend-zero.module';
import { ButtonModule } from '../button/button.module';
import { OnlyNumberModule } from '../../directive/only-number/only-number.module';
import { FormsModule } from '@angular/forms';
import { TimePartControlComponent } from './time-part-control/time-part-control.component';

@NgModule({
  declarations: [
    DatePickerComponent,
    MonthPickerComponent,
    DaySelectComponent,
    YearSelectComponent,
    MonthSelectComponent,
    TimePartControlComponent,
  ],
  exports: [DatePickerComponent, MonthPickerComponent],
  imports: [
    CommonModule,
    DropdownModule,
    ClickOutsideModule,
    FormsModule,
    IconModule,
    PrependZeroModule,
    ButtonModule,
    OnlyNumberModule,
  ],
})
export class DatePickerModule {}
