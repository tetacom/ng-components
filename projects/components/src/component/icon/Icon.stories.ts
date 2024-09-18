import { IconComponent } from './icon/icon.component';

import { coloredIconsList, fileIconsList, iconsList, lithotypeIconsList } from './icons-list';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient} from '@angular/common/http';
import { IconSpriteDirective } from './icon-sprite.directive';
import { TetaSize } from '@tetacom/ng-components';

export default {
  title: 'Component/Icon',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: IconComponent,
  argTypes: {
    palette: {
      options: ['primary', 'grey', 'red', 'white', 'green'],
      control: { type: 'select' },
    },
    size: {
      options: [TetaSize.XS, TetaSize.S, TetaSize.M, TetaSize.L, TetaSize.XL],
      control: { type: 'select' },
    },
    filter: {
      control: { type: 'text' },
    },
  },
  args: {
    palette: 'primary',
    size: TetaSize.L,
    filter: '',
  },
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const icons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  props: {
    ...args,
    icons: iconsList.filter((iconName) => iconName.toLowerCase().includes(args.filter.toLowerCase())),
  },
  template: `
            <div [tetaIconSprite]="'assets/icons.svg'">
                <h1 style="margin-bottom: 1em">Обычые иконки без заливки</h1>
                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">
                    @for(icon of icons; track icon) {
                      <div class="font-body-3" style="display: flex; align-items: center;">
                        <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>
                        <span class="padding-left-4">{{icon}}</span>
                      </div>
                    }
                </div>
            </div>`,
});

export const coloredIcons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  props: {
    ...args,
    icons: coloredIconsList.filter((iconName) => iconName.toLowerCase().includes(args.filter.toLowerCase())),
  },
  template: `
            <div [tetaIconSprite]="'assets/color-icons.svg'">
                <h1 style="margin-bottom: 1em">Цветные иконки</h1>
                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">
                  @for(icon of icons; track icon) {
                    <div style="display: flex; align-items: center;" class="font-body-3">
                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>
                      <span class="padding-left-4">{{icon}}</span>
                    </div>
                  }
                </div>
            </div>`,
});
export const fileIcons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  props: {
    ...args,
    icons: fileIconsList.filter((iconName) => iconName.toLowerCase().includes(args.filter.toLowerCase())),
  },
  template: `
            <div [tetaIconSprite]="'assets/file-icons.svg'">
                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>
                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">
                  @for(icon of icons; track icon) {
                    <div style="display: flex; align-items: center;" class="font-body-3">
                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>
                      <span class="padding-left-4">{{icon}}</span>
                    </div>
                  }
                </div>
            </div>`,
});

export const lithotypeIcons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective],
  },
  props: {
    ...args,
    icons: lithotypeIconsList.filter((iconName) => iconName.toLowerCase().includes(args.filter.toLowerCase())),
  },
  template: `
            <div [tetaIconSprite]="'assets/lithotype-icons.svg'">
                <h1 style="margin-bottom: 1em">Иконки с типами файлов</h1>
                <div style="display: grid;  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">
                  @for(icon of icons; track icon) {
                    <div style="display: flex; align-items: center;" class="font-body-3">
                      <teta-icon [name]="icon" [palette]="palette" [size]="size"></teta-icon>
                      <span class="padding-left-4">{{icon}}</span>
                    </div>
                  }
                </div>
            </div>`,
});
