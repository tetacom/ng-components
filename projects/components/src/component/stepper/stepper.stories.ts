import { StepperComponent } from './stepper/stepper.component';

import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';

export default {
  title: 'Component/Stepper',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {},
  args: {},
  component: StepperComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;
export const stepper = (args) => ({
  moduleMetadata: {
    imports: [],
  },
  props: args,
  template: `
    <div [tetaIconSprite]="'assets/icons.svg'" class="padding-3 bg-global-bgcard">
        <h1 style="margin-bottom: 0.5em">Степпер</h1>
        <div style="width: 420px">
          <app-stepper
            [steps]="[
              { id: 1, name: 'Настройки' },
              { id: 2, name: 'Предпросмотр' },
              { id: 3, name: 'Загрузка' }
            ]"
            [currentStepId]="2"
          ></app-stepper>
        </div>
    </div>`,
});
