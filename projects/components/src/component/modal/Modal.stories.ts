import {ModalSamplesModule} from './modal-samples/modal-samples.module';
import {ModalFromComponentComponent} from './modal-samples/modal-from-component/modal-from-component.component';
import {ModalFromTemplateComponent} from './modal-samples/modal-from-template/modal-from-template.component';
import {AlertSampleComponent} from './modal-samples/alert-sample/alert-sample.component';
import {applicationConfig, Meta, StoryFn} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';

export default {
  title: 'Component/Modal',
  decorators: [

    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
} as Meta;

export const fromComponent: StoryFn<ModalFromComponentComponent> = () => ({
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
  component: ModalFromComponentComponent,
  template: `<div>
    <teta-modal-from-component></teta-modal-from-component>
    </div>`,
});

export const fromTemplate = () => ({
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
  component: ModalFromTemplateComponent,
  template: `<div>
    <app-modal-from-template></app-modal-from-template>
    </div>`,
});

export const alert = () => ({
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
  component: AlertSampleComponent,
  template: `<div>
    <teta-alert-sample></teta-alert-sample>
    </div>`,
});
