import { Meta } from '@storybook/angular/types-6-0';
import { withKnobs } from '@storybook/addon-knobs';
import { RadioComponent } from './radio/radio.component';
import { RadioModule } from './radio.module';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';

export default {
  title: 'Component/Radio',
  decorators: [withKnobs],
  component: RadioComponent,
  moduleMetadata: {
    imports: [RadioModule],
  },
} as Meta;

export const radioButton = () => ({
  moduleMetadata: {
    imports: [RadioModule, FormsModule, IconModule],
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-radio [(ngModel)]="aaa">
      <teta-radio-button [value]="1">1</teta-radio-button>
      <teta-radio-button [value]="2">2</teta-radio-button>
      <teta-radio-button [value]="3" [disabled]="true">4</teta-radio-button>
    </teta-radio>
  </div>`,
});
