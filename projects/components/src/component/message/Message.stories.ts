import {Meta} from '@storybook/angular/types-6-0';
import {select, withKnobs} from '@storybook/addon-knobs';
import {MessageSampleComponent} from './message-samples/message-sample/message-sample.component';
import {MessageSamplesModule} from './message-samples/message-samples.module';

export default {
  title: 'Component/Message',
  decorators: [withKnobs],
  component: MessageSampleComponent,
  moduleMetadata: {
    imports: [MessageSamplesModule]
  }
} as Meta;

export const messageSample = () => ({
  moduleMetadata: {
    imports: [MessageSamplesModule]
  },
  template: `<teta-message-sample></teta-message-sample>`,
});
