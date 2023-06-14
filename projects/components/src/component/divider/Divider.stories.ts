import {Meta} from '@storybook/angular/types-6-0';
// eslint-disable-next-line id-blacklist
import {withKnobs} from '@storybook/addon-knobs';
import {IconModule} from '../icon/icon.module';
import {DividerModule} from './divider.module';
import {DividerComponent} from "./divider/divider.component";

export default {
  title: 'Component/Divider',
  decorators: [withKnobs],
  component: DividerComponent,
  moduleMetadata: {
    imports: [DividerModule],
  },
} as Meta;

export const divider = () => ({
  moduleMetadata: {
    imports: [DividerModule, IconModule],
  },
  template: `<div class="padding-4" style="width: 300px" [tetaIconSprite]="'assets/icons.svg'"><teta-divider [label]="'Название раздела'"></teta-divider></div>`,
});
