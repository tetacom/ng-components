import { withKnobs } from '@storybook/addon-knobs';
import { MessageSampleComponent } from './message-samples/message-sample/message-sample.component';
import { MessageSamplesModule } from './message-samples/message-samples.module';
import { applicationConfig, Meta } from '@storybook/angular';
import { IconModule } from '@tetacom/ng-components';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Component/Message',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: MessageSampleComponent,
  moduleMetadata: {
    imports: [MessageSamplesModule],
  },
} as Meta;

export const messageSample = () => ({
  moduleMetadata: {
    imports: [MessageSamplesModule, IconModule],
  },
  template: `<div  [tetaIconSprite]="'assets/icons.svg'"><teta-message-sample ></teta-message-sample></div>`,
});
