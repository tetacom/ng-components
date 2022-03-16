import {Meta} from '@storybook/angular/types-6-0';
import {date, select, withKnobs} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {DatePickerModule} from './date-picker.module';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {IconModule} from '../icon/icon.module';
import {FormsModule} from '@angular/forms';

export default {
  title: 'Component/DatePicker',
  decorators: [withKnobs],
  component: DatePickerComponent,
  moduleMetadata: {
    imports: [DatePickerModule, FormsModule],
  },
} as Meta;

export const datePicker = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule],
  },
  props: {
    date: new Date(),
    log: (name, value) => {
      action(name)(value);
      console.log(name, value);
    },
    getDate: (num) => new Date(num),
  },
  template: `<div (click)="log('click', date)">{{date}}</div>
              <teta-date-picker [tetaIconSprite]="'assets/icons.svg'"
                                [ngModel]="date"
                                (ngModelChange)="date = $event; log('ngModelChange', $event)"></teta-date-picker>`,
});

export const dateTimePicker = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule],
  },
  props: {
    date: null,
    log: (name, value) => {
      action(name)(value);
    },
    getDate: (num) => new Date(num),
  },
  template: `<div>{{date}}</div>
              <teta-date-picker [tetaIconSprite]="'assets/icons.svg'"
                                [showTime]="true"
                                [ngModel]="date"
                                (ngModelChange)="date = $event;log('date', $event)"></teta-date-picker>`,
});
