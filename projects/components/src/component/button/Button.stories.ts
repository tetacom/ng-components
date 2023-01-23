import {Meta} from '@storybook/angular/types-6-0';
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs';
import {ButtonComponent} from './button/button.component';
import {ButtonModule} from './button.module';
import {IconModule} from '../icon/icon.module';

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
    palettes: ['primary', 'text', 'red'],
    types: ['brick', 'circle', 'rounded'],
    text: text('text', 'Push me'),
    size: select('size', ['m', 'l'], 'm'),
    leftIcon: boolean('leftIcon', true),
    rightIcon: boolean('rightIcon', true),
    disabled: boolean('disabled', false)
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
