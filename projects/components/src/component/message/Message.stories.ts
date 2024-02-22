
import { MessageSampleComponent } from './message-samples/message-sample/message-sample.component';

import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Message',
  decorators: [

    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: MessageSampleComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const messageSample = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective],
  },
  template: `<div  [tetaIconSprite]="'assets/icons.svg'"><teta-message-sample ></teta-message-sample></div>`,
});
