import { SwitchComponent } from './switch/switch.component';

import { FormsModule } from '@angular/forms';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { SwitchButtonComponent } from './switch-button/switch-button.component';
import { IconComponent } from '../icon/icon/icon.component';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Switch',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    backdrop: {
      control: { type: 'boolean' },
    },
    palette: {
      options: ['primary', 'text', 'red', 'yellow', 'green'],
      control: { type: 'select' },
    },
    viewType: {
      options: ['rounded', 'brick', 'circle'],
      control: { type: 'select' },
    },
  },
  args: {
    backdrop: false,
    palette: 'primary',
    viewType: 'rounded',
  },
  component: SwitchComponent,
  moduleMetadata: {
    imports: [FormsModule],
  },
} as Meta;

export const switchSample = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, SwitchButtonComponent, SwitchComponent, IconComponent, IconSpriteDirective],
  },
  props: {
    ...args,
    model: 'item 1',
    values: ['item 1', 'item 2', 'item 3'],
  },
  template: `<teta-switch  [viewType]="viewType"  [tetaIconSprite]="'assets/icons.svg'"
                          [ngModel]="model">
  @for(val of values; track val;) {
    <teta-switch-button [value]="val">
      <teta-icon [name]="'settings'" class="margin-right-2"></teta-icon> {{val}}
    </teta-switch-button>
  }
</teta-switch>`,
});
