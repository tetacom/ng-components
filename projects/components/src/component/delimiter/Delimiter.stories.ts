import { Meta } from '@storybook/angular/types-6-0';
// eslint-disable-next-line id-blacklist
import { withKnobs } from '@storybook/addon-knobs';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DelimiterComponent } from './delimiter/delimiter.component';
import { DelimiterModule } from './delimiter.module';

export default {
  title: 'Component/Delimiter',
  decorators: [withKnobs],
  component: DelimiterComponent,
  moduleMetadata: {
    imports: [DelimiterModule],
  },
} as Meta;

export const vertical = () => ({
  moduleMetadata: {
    imports: [DelimiterModule, ButtonModule, IconModule],
  },
  template: `<div class="padding-4 bg-panel-50 row" style="position: absolute; top: 50%;" [tetaIconSprite]="'assets/icons.svg'">
    <button teta-button [palette]="'primary'">
      <teta-icon [name]="'settings'"></teta-icon>
    </button>
    <teta-delimiter [direction]="'vertical'" class="height-4"></teta-delimiter>
    <button teta-button [palette]="'primary'" [view]="'ghost'">
      <teta-icon [name]="'add'"></teta-icon>
    </button>
    <teta-delimiter [direction]="'vertical'" class="height-4"></teta-delimiter>
    <button teta-button [palette]="'red'" [view]="'ghost'">
      <teta-icon [name]="'delete'"></teta-icon>
    </button>
  </div>`,
});

export const horizontal = () => ({
  moduleMetadata: {
    imports: [DelimiterModule, ButtonModule, IconModule],
  },
  template: `<div class="padding-4 bg-panel-50" style="position: absolute; top: 50%;" [tetaIconSprite]="'assets/icons.svg'">
    <button teta-button [palette]="'primary'">
      <teta-icon [name]="'settings'"></teta-icon>
    </button>
    <teta-delimiter [direction]="'horizontal'"></teta-delimiter>
    <button teta-button [palette]="'primary'" [view]="'ghost'">
      <teta-icon [name]="'add'"></teta-icon>
    </button>
    <teta-delimiter [direction]="'horizontal'"></teta-delimiter>
    <button teta-button [palette]="'red'" [view]="'ghost'">
      <teta-icon [name]="'delete'"></teta-icon>
    </button>
  </div>`,
});
