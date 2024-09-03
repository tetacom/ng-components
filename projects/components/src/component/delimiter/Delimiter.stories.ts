// eslint-disable-next-line id-blacklist
import { DelimiterComponent } from './delimiter/delimiter.component';

import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { IconComponent } from '../icon/icon/icon.component';
import { ButtonComponent } from '../button/button/button.component';

export default {
  title: 'Component/Delimiter',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: DelimiterComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const vertical = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, IconComponent, ButtonComponent],
  },
  template: `<div class="padding-4 bg-panel-50 row align-center gap-4" style="position: absolute; top: 50%;" [tetaIconSprite]="'assets/icons.svg'">
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
    imports: [IconSpriteDirective, IconComponent, ButtonComponent],
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
