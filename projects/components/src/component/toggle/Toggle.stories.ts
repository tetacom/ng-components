import { Meta } from '@storybook/angular/types-6-0';
import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IconModule } from '../icon/icon.module';
import { ToggleComponent } from './toggle/toggle.component';
import { ToggleModule } from './toggle.module';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Component/Toggle',
  decorators: [withKnobs],
  component: ToggleComponent,
  moduleMetadata: {
    imports: [ToggleModule, FormsModule],
  },
} as Meta;

export const sample = () => ({
  moduleMetadata: {
    imports: [ToggleModule, IconModule, FormsModule],
  },
  props: {
    text: text('text', 'Remember me'),
    value: false,
    setValue: (value) => {
      action('log')(value);
    },
  },
  template: `<teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [ngModel]="value"
              (ngModelChange)="setValue($event)">
              {{text}}
            </teta-toggle>
            <teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [disabled]="true"
              [ngModel]="1">
              disabled true
            </teta-toggle>
            <teta-toggle [tetaIconSprite]="'assets/icons.svg'"
              [disabled]="true"
              [ngModel]="0">
              disabled false
            </teta-toggle>`,
});
