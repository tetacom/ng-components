import { boolean, date, select, withKnobs } from '@storybook/addon-knobs';

import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';

import { MaskitoModule } from '@maskito/angular';
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Component/Datepicker',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: DatePickerComponent,
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule],
  },
} as Meta;

export const datepicker = () => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule],
  },
  props: {
    date: new Date(),
    min: date(
      'min',
      new Date(
        new Date().getFullYear() - 3,
        new Date().getMonth(),
        new Date().getDate()
      )
    ),
    max: date(
      'max',
      new Date(
        new Date().getFullYear() + 3,
        new Date().getMonth(),
        new Date().getDate()
      )
    ),
    allowNull: boolean('allowNull', false),
    showTime: false,
    viewType: select('viewType', ['rounded', 'brick', 'circle'], 'rounded'),
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker [date]="date" [minDate]="min" [showTime]="showTime" [maxDate]="max" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
const rangeValue = date => {
  console.log(date);
};
export const dateRange = () => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule],
  },
  props: {
    data: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    },
    rangeValue,
    minDate: date(
      'min',
      new Date(
        new Date().getFullYear() - 3,
        new Date().getMonth(),
        new Date().getDate()
      )
    ),
    maxDate: date(
      'max',
      new Date(
        new Date().getFullYear() + 3,
        new Date().getMonth(),
        new Date().getDate()
      )
    ),
    allowNull: boolean('allowNull', true),
    showTime: false,
    viewType: select('viewType', ['rounded', 'brick', 'circle'], 'rounded'),
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-range [ngModel]="data" (ngModelChange)="rangeValue($event)"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`,
});
export const datepickerWithTime = () => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule],
  },
  props: {
    date: new Date(),
    min: date(
      'min',
      new Date(
        new Date().getFullYear() - 3,
        new Date().getMonth(),
        new Date().getDate()
      )
    ),
    max: date(
      'max',
      new Date(
        new Date().getFullYear() + 3,
        new Date().getMonth(),
        new Date().getDate()
      )
    ),
    allowNull: boolean('allowNull', false),
    showTime: true,
    viewType: select('viewType', ['rounded', 'brick', 'circle'], 'rounded'),
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker style="width: 250px" [date]="date" [minDate]="minDate" [showTime]="showTime" [maxDate]="maxDate" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
