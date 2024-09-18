import { ToggleComponent } from './toggle/toggle.component';

import { FormsModule } from '@angular/forms';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Toggle',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    text: {
      control: { type: 'text' },
    },
  },
  args: {
    text: 'text',
  },
  component: ToggleComponent,
  moduleMetadata: {
    imports: [FormsModule],
  },
} as Meta;

export const baseToggle = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective],
  },
  props: args,
  template: `<teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [ngModel]="value"
              (ngModelChange)="setValue($event)">
              {{text}}
            </teta-toggle>
            `,
});
export const disabledToggle = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective],
  },
  props: args,
  template: `<teta-toggle [tetaIconSprite]="'assets/icons.svg'"
               [disabled]="true"
              [ngModel]="value"
              (ngModelChange)="setValue($event)">
              {{text}}
            </teta-toggle>
            `,
});
