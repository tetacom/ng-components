import { ButtonComponent } from './button/button.component';

import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { IconComponent } from '../icon/icon/icon.component';
import { TetaSize } from '../../common/enum/teta-size.enum';

export default {
  title: 'Component/Button',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    viewType: {
      options: ['rounded', 'brick', 'circle'],
      control: { type: 'select' },
    },
    palette: {
      options: ['primary', 'text', 'red', 'yellow', 'green'],
      control: { type: 'select' },
    },
    size: {
      options: [TetaSize.S, TetaSize.M, TetaSize.L],
      control: { type: 'select' },
    },
    view: {
      control: { type: 'select' },
      options: ['primary', 'ghost', 'outline'],
    },
    text: {
      control: { type: 'text' },
    },
  },
  args: {
    viewType: 'circle',
    palette: 'primary',
    view: 'primary',
    text: 'text text',
    size: 'm',
  },
  component: ButtonComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;
export const baseButton: StoryFn = (args) => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, IconComponent],
  },
  props: args,
  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="'assets/icons.svg'">
       <button teta-button  [disabled]="false" [view]="view" [square]="false"  [size]="size" [viewType]="viewType" [palette]="palette">
          <teta-icon [name]="'addCircle'"></teta-icon>
          {{text}}
       </button>
</div>`,
});
export const disabledButton: StoryFn = (args) => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, IconComponent],
  },
  props: args,
  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="'assets/icons.svg'">
       <button teta-button  [disabled]="true" [view]="view" [square]="false"  [size]="size" [viewType]="viewType" [palette]="palette">
          <teta-icon [name]="'addCircle'"></teta-icon>
          {{text}}
       </button>
</div>`,
});
export const squireButton = (args) => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, IconComponent],
  },
  props: args,
  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="'assets/icons.svg'">
       <button teta-button  [disabled]="false" [view]="view" [square]="true"  [size]="size" [viewType]="viewType" [palette]="palette">
          <teta-icon [name]="'addCircle'"></teta-icon>
          {{text}}
       </button>
</div>`,
});
export const allButtonTypes: StoryFn = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, IconComponent],
  },
  props: {
    palettes: ['primary', 'text', 'red', 'yellow', 'green'],
    types: ['brick', 'circle', 'rounded', 'rounded', 'rounded'],
    text: 'Push me',
    size: 'm',
    leftIcon: true,
    rightIcon: true,
    disabled: false,
  },
  template: `<div class="row bg-global-bgcard padding-3 gap-20" [tetaIconSprite]="'assets/icons.svg'">

    <div class="column padding-top-11 font-body-3" style="gap:32px">
        <p>Default</p>
        <p>Only Icon</p>
        <p>Outline</p>
        <p>Ghost</p>
    </div>
        <div class="row gap-20">
            @for(palette of palettes;let i=$index; track $index;) {
                <div class="column" style="grid-gap: 20px">
                  <p class="font-body-3">{{types[i]}}</p>
                  <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette">
                    @if(leftIcon) {
                        <teta-icon [name]="'addCircle'"></teta-icon>
                    }
                    {{text}}
                    @if(rightIcon) {
                        <teta-icon [name]="'user'"></teta-icon>
                    }
                  </button>
                  <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [square]="true">
                    @if(leftIcon) {
                        <teta-icon [name]="'addCircle'"></teta-icon>
                    }
                  </button>
                  <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="'outline'">
                    @if(leftIcon) {
                        <teta-icon [name]="'addCircle'"></teta-icon>
                    }
                    {{text}}
                    @if(rightIcon) {
                        <teta-icon [name]="'user'"></teta-icon>
                    }
                  </button>
                  <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="'ghost'">
                    @if(leftIcon) {
                        <teta-icon [name]="'addCircle'"></teta-icon>
                    }
                    {{text}}
                    @if(rightIcon) {
                        <teta-icon [name]="'user'"></teta-icon>
                    }
                  </button>
              </div>
            }
        </div>
</div>`,
});
