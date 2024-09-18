import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';

import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { PagerComponent } from './pager/pager.component';

export default {
  title: 'Component/Pager',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const pagerSample = () => ({
  moduleMetadata: {
    imports: [PagerComponent, IconSpriteDirective],
  },
  template: `<teta-pager [tetaIconSprite]="'assets/icons.svg'"></teta-pager>`,
});
