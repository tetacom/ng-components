import {Meta} from '@storybook/angular/types-6-0';
import {boolean, date, select, withKnobs} from '@storybook/addon-knobs';
import {DatePickerModule} from "./date-picker.module";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {FormsModule} from "@angular/forms";
import {IconModule} from "../icon/icon.module";
import {MaskitoModule} from "@maskito/angular";

export default {
  title: 'Component/Datepicker',
  decorators: [withKnobs],
  component: DatePickerComponent,
  moduleMetadata: {
    imports: [DatePickerModule, FormsModule, MaskitoModule],
  },
} as Meta;

export const datepicker = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule, MaskitoModule],
  },
  props: {
    date: new Date(),
    min: date('min', new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())),
    max: date('max', new Date(new Date().getFullYear() + 3, new Date().getMonth(), new Date().getDate())),
    allowNull: boolean('allowNull', false),
    showTime: false,
    viewType: select('viewType', ['rounded', 'brick', 'circle'], 'rounded')
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker [date]="date" [min]="min" [showTime]="showTime" [max]="max" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
const rangeValue = (date) => {
  console.log(date)
}
export const dateRange = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule, MaskitoModule],
  },
  props: {
    data: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      to: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    },
    rangeValue,
    min: date('min', new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())),
    max: date('max', new Date(new Date().getFullYear() + 3, new Date().getMonth(), new Date().getDate())),
    allowNull: boolean('allowNull', true),
    showTime: false,
    viewType: select('viewType', ['rounded', 'brick', 'circle'], 'rounded')
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-range [ngModel]="data" (ngModelChange)="rangeValue($event)" [min]="min" [showTime]="showTime" [max]="max" [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`,
});
export const datepickerWithTime = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule, MaskitoModule],
  },
  props: {
    date: new Date(),
    min: date('min', new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())),
    max: date('max', new Date(new Date().getFullYear() + 3, new Date().getMonth(), new Date().getDate())),
    allowNull: boolean('allowNull', false),
    showTime: true,
    viewType: select('viewType', ['rounded', 'brick', 'circle'], 'rounded')
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker [date]="date" [min]="min" [showTime]="showTime" [max]="max" [viewType]="viewType" [allowNull]="allowNull"></teta-date-picker></div>`,
});
