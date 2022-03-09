import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { NumericFilterComponent } from './numeric-filter/numeric-filter.component';
import { StringFilterComponent } from './string-filter/string-filter.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { FilterHostComponent } from './filter-host/filter-host.component';
import { SelectModule } from '../select/select.module';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { BooleanFilterComponent } from './boolean-filter/boolean-filter.component';
import { RadioModule } from '../radio/radio.module';
import { InputModule } from '../input/input.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import {OnlyNumberModule} from '../../directive/only-number/only-number.module';

@NgModule({
  declarations: [
    FilterPanelComponent,
    NumericFilterComponent,
    StringFilterComponent,
    ListFilterComponent,
    DateFilterComponent,
    FilterHostComponent,
    BooleanFilterComponent,
  ],
  exports: [
    FilterPanelComponent,
    NumericFilterComponent,
    StringFilterComponent,
    ListFilterComponent,
    DateFilterComponent,
    FilterHostComponent,
    BooleanFilterComponent,
  ],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    DatePickerModule,
    RadioModule,
    InputModule,
    CheckboxModule,
    OnlyNumberModule,
  ],
})
export class FilterModule {}
