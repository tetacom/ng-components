import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {DPickerModule} from "./d-picker.module";
import {DPickerComponent} from "./d-picker/d-picker.component";
import {FormsModule} from "@angular/forms";
import {IconModule} from "../icon/icon.module";

export default {
  title: 'Component/D-picker',
  decorators: [withKnobs],
  component: DPickerComponent,
  moduleMetadata: {
    imports: [DPickerModule, FormsModule],
  },
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [DPickerModule, IconModule, FormsModule],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-d-picker ></teta-d-picker></div>`,
});
