// eslint-disable-next-line id-blacklist

import { DividerComponent } from './divider/divider.component';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';

import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Divider',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: DividerComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const divider = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective],
  },
  template: `<div class="padding-4" style="width: 300px" [tetaIconSprite]="'assets/icons.svg'"><teta-divider [label]="'Название раздела'"></teta-divider></div>`,
});
