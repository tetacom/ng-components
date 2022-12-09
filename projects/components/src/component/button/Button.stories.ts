import { Meta } from '@storybook/angular/types-6-0';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { ButtonComponent } from './button/button.component';
import { ButtonModule } from './button.module';
import { IconModule } from '../icon/icon.module';

export default {
  title: 'Component/Button',
  decorators: [withKnobs],
  component: ButtonComponent,
  moduleMetadata: {
    imports: [ButtonModule],
  },
} as Meta;

export const buttons = () => ({
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
  props: {
    palettes: ['primary', 'text', 'red', 'yellow', 'green'],
    text: text('text', 'Push me'),
    leftIcon: boolean('leftIcon', true),
    rightIcon: boolean('rightIcon', true),
    disabled: boolean('disabled', false),
  },
  template: `<div class="row bg-global-bgcard padding-3" [tetaIconSprite]="'assets/icons.svg'"  style="grid-gap: 12px">
  <div *ngFor="let palette of palettes" class="column" style="grid-gap: 8px">
    <div class="font-body-3">
      Default
    </div>
    <button teta-button [disabled]="disabled" [palette]="palette">
      <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
      {{text}}
      <teta-icon *ngIf="rightIcon" [name]="'user'"></teta-icon>
    </button>
    <div class="font-body-3">
      Only Icon
    </div>
    <button teta-button [disabled]="disabled" [palette]="palette" [square]="true">
      <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
    </button>
    <div class="font-body-3">
      Outline
    </div>
    <button teta-button [disabled]="disabled" [palette]="palette" [view]="'outline'">
      <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
      {{text}}
      <teta-icon *ngIf="rightIcon" [name]="'user'"></teta-icon>
    </button>
    <div class="font-body-3">
      Ghost
    </div>
    <button teta-button [disabled]="disabled" [palette]="palette" [view]="'ghost'">
      <teta-icon *ngIf="leftIcon" [name]="'addCircle'"></teta-icon>
      {{text}}
      <teta-icon *ngIf="rightIcon" [name]="'user'"></teta-icon>
    </button>
  </div>
</div>`,
});
