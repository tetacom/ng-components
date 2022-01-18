import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyGridComponent} from './property-grid/property-grid.component';
import {NumericItemDefaultComponent} from './default/numeric-item-default/numeric-item-default.component';
import {DateItemDefaultComponent} from './default/date-item-default/date-item-default.component';
import {ListItemDefaultComponent} from './default/list-item-default/list-item-default.component';
import {StringItemDefaultComponent} from './default/string-item-default/string-item-default.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumberPipeModule} from '../../pipe/number-pipe/number-pipe.module';
import {DatePickerModule} from '../date-picker/date-picker.module';
import {SelectModule} from '../select/select.module';
import {PropertyGridGroupComponent} from './property-grid/property-grid-group/property-grid-group.component';
import {PropertyGridItemComponent} from './property-grid/property-grid-item/property-grid-item.component';
import {OnlyNumberModule} from '../../directive/only-number/only-number.module';
import {InputModule} from '../input/input.module';
import {ToggleModule} from '../toggle/toggle.module';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';
import {HintModule} from '../../directive/hint/hint.module';

@NgModule({
  declarations: [
    PropertyGridComponent,
    NumericItemDefaultComponent,
    DateItemDefaultComponent,
    ListItemDefaultComponent,
    StringItemDefaultComponent,
    PropertyGridGroupComponent,
    PropertyGridItemComponent,
  ],
  exports: [PropertyGridComponent],
  imports: [
    CommonModule,
    FormsModule,
    NumberPipeModule,
    DatePickerModule,
    SelectModule,
    OnlyNumberModule,
    InputModule,
    ToggleModule,
    ReactiveFormsModule,
    TranslocoModule,
    HintModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {scope: 'errors', alias: 'errors'},
      multi: true,
    },
  ],
})
export class PropertyGridModule {
}
