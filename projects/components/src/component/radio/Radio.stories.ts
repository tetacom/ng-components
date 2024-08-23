import {RadioComponent} from './radio/radio.component';

import {FormsModule} from '@angular/forms';

import {applicationConfig, Meta} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';

import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {RadioButtonComponent} from "./radio-button/radio-button.component";

export default {
  title: 'Component/Radio',
  decorators: [

    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: RadioComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const baseRadioButton = () => ({
  moduleMetadata: {
    imports: [FormsModule, RadioButtonComponent, IconSpriteDirective],
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-radio  [ngModel]="2">
      <teta-radio-button [value]="1">1</teta-radio-button>
      <teta-radio-button [value]="2">2</teta-radio-button>
    </teta-radio>
  </div>`,
});
export const disabledRadioButton = () => ({
  moduleMetadata: {
    imports: [FormsModule, RadioButtonComponent, IconSpriteDirective],
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-radio  [ngModel]="3">
      <teta-radio-button [value]="3" [disabled]="true">3</teta-radio-button>
      <teta-radio-button [disabled]="true">4</teta-radio-button>
    </teta-radio>
  </div>`,
});

