import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { ToggleComponent } from './toggle/toggle.component';

import { FormsModule } from '@angular/forms';
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Component/Toggle',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: ToggleComponent,
  moduleMetadata: {
    imports: [FormsModule],
  },
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [FormsModule],
  },
  props: {
    text: text('text', 'Remember me'),
    value: false,
    setValue: value => {
      action('log')(value);
    },
  },
  template: `<teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [ngModel]="value"
              (ngModelChange)="setValue($event)">
              {{text}}
            </teta-toggle>
            <teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [disabled]="true"
              [ngModel]="1">
              disabled true
            </teta-toggle>
            <teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [disabled]="true"
              [ngModel]="0">
              disabled false
            </teta-toggle>`,
});
