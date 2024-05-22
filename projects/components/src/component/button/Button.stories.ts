import { ButtonComponent } from './button/button.component';

import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { IconComponent } from '../icon/icon/icon.component';

export default {
  title: 'Component/Button',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
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
      options: ['s', 'm', 'l'],
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
            <div *ngFor="let palette of palettes;let i=index" class="column" style="grid-gap: 20px">
            <p class="font-body-3">{{types[i]}}</p>
                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette">
                  <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
                  {{text}}
                  <teta-icon *ngIf="rightIcon" [name]="'user'"></teta-icon>
                </button>
                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [square]="true">
                  <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
                </button>
                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="'outline'">
                  <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
                  {{text}}
                  <teta-icon *ngIf="rightIcon" [name]="'user'"></teta-icon>
                </button>
                <button teta-button [disabled]="disabled" [size]="size" [viewType]="types[i]" [palette]="palette" [view]="'ghost'">
                  <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
                  {{text}}
                  <teta-icon *ngIf="rightIcon" [name]="'user'"></teta-icon>
                </button>
            </div>
        </div>
</div>`,
});
