import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';

import { MaskitoModule } from '@maskito/angular';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Datepicker',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    minDate: {
      control: { type: 'date' },
    },
    maxDate: {
      control: { type: 'date' },
    },
    viewType: {
      options: ['rounded', 'brick', 'circle'],
      control: { type: 'select' },
    },
    allowNull: {
      control: { type: 'boolean' },
    },
  },
  args: {
    viewType: 'rounded',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 3),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
    allowNull: true,
  },
  component: DatePickerComponent,
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule],
  },
} as Meta;

export const baseDatepicker = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, IconSpriteDirective],
  },
  props: { ...args, date: new Date() },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker [date]="date" [minDate]="minDate" [maxDate]="maxDate" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
export const disabledDatepicker = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, IconSpriteDirective],
  },
  props: { ...args, date: new Date() },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker [disabled]="true" [date]="date" [minDate]="min" [maxDate]="max" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
export const invalidDatepicker = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, IconSpriteDirective],
  },
  props: { ...args, date: new Date() },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker [invalid]="true" [date]="date" [minDate]="min"  [maxDate]="max" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
export const datepickerWithTime = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, IconSpriteDirective],
  },
  props: { ...args, date: new Date() },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker style="width: 250px" [date]="date" [minDate]="minDate" [showTime]="true" [maxDate]="maxDate" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
