import {Meta} from '@storybook/angular/types-6-0';
import {select, withKnobs} from '@storybook/addon-knobs';
import {IconComponent} from './icon/icon.component';
import {IconModule} from './icon.module';
import {coloredIconsList, iconsList, fileIconsList} from './icons-list';

export default {
  title: 'Component/Icon',
  decorators: [withKnobs],
  component: IconComponent,
  moduleMetadata: {
    imports: [IconModule]
  }
} as Meta;

export const icons = () => ({
  moduleMetadata: {
    imports: [IconModule]
  },
  props: {
    palette: select('palette', ['primary', 'grey', 'red', 'white'], 'primary'),
    icons: iconsList,
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon [name]="icon" [palette]="palette"></teta-icon>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});

export const coloredIcons = () => ({
  moduleMetadata: {
    imports: [IconModule]
  },
  props: {
    palette: select('palette', ['primary', 'text', 'red', 'white', 'yellow', 'green'], 'primary'),
    icons: coloredIconsList,
  },
  template: `<div [tetaIconSprite]="'assets/color-icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon [name]="icon" [palette]="palette"></teta-icon>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});
