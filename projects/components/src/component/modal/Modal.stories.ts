import { Meta } from '@storybook/angular/types-6-0';
import { text, withKnobs } from '@storybook/addon-knobs';
import { ModalSamplesModule } from './modal-samples/modal-samples.module';
import { ModalFromComponentComponent } from './modal-samples/modal-from-component/modal-from-component.component';
import { ModalFromTemplateComponent } from './modal-samples/modal-from-template/modal-from-template.component';
import { AlertSampleComponent } from './modal-samples/alert-sample/alert-sample.component';

export default {
  title: 'Component/Modal',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
} as Meta;

export const fromComponent = () => ({
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
  component: ModalFromComponentComponent,
  props: {
    name: text('name', 'Название'),
    description: text('description', 'Описание объекта'),
  },
});

export const fromTemplate = () => ({
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
  component: ModalFromTemplateComponent,
  props: {
    name: text('name', 'Название'),
    description: text('description', 'Описание объекта'),
  },
});

export const alert = () => ({
  moduleMetadata: {
    imports: [ModalSamplesModule],
  },
  component: AlertSampleComponent,
});
