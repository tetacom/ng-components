import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { DatePickerModule } from './date-picker.module';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { action } from '@storybook/addon-actions';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Component/MonthPicker',
  decorators: [withKnobs],
  component: MonthPickerComponent,
  moduleMetadata: {
    imports: [DatePickerModule, FormsModule],
  },
} as Meta;

export const monthPicker = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule],
  },
  props: {
    date: new Date(),
    log: (name, value) => {
      action(name)(value);
    },
    getDate: (num) => new Date(num),
  },
  template: `<teta-month-picker [tetaIconSprite]="'assets/icons.svg'"
                                [ngModel]="date"
                                (ngModelChange)="log('date', $event)"></teta-month-picker>`,
});
