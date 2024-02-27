
import { IconComponent } from './icon/icon.component';

import {
  coloredIconsList,
  fileIconsList,
  iconsList,
  lithotypeIconsList,
} from './icons-list';
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {IconSpriteDirective} from "./icon-sprite.directive";

export default {
  title: 'Component/Icon',
  decorators: [

    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: IconComponent,
  argTypes:{
    palette:{
      options:['primary', 'grey', 'red', 'white','green'],
      control:{type:'select'}
    },
  },
  args:{
    palette:'primary'
  },
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const icons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective],
  },
  props: {
    ...args,
    icons: iconsList,
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon [name]="icon" [palette]="palette"></teta-icon>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});

export const coloredIcons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective],
  },
  props: {
    ...args,
    icons: coloredIconsList,
  },
  template: `<div [tetaIconSprite]="'assets/color-icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon [name]="icon" [palette]="palette"></teta-icon>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});
export const fileIcons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective],
  },
  props: {
    ...args,
    icons: fileIconsList,
  },
  template: `<div [tetaIconSprite]="'assets/file-icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon [name]="icon" [palette]="palette"></teta-icon>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});

export const lithotypeIcons = (args) => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective],
  },
  props: {
    ...args,
    icons: lithotypeIconsList,
  },
  template: `<div [tetaIconSprite]="'assets/lithotype-icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon [name]="icon" [palette]="palette"></teta-icon>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});
