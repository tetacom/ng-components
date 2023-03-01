import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {DatePickerModule} from "./date-picker.module";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {FormsModule} from "@angular/forms";
import {IconModule} from "../icon/icon.module";

export default {
  title: 'Component/Datepicker',
  decorators: [withKnobs],
  component: DatePickerComponent,
  moduleMetadata: {
    imports: [DatePickerModule, FormsModule],
  },
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [DatePickerModule, IconModule, FormsModule],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-picker></teta-date-picker></div>`,
});
