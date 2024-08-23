import {FormsModule} from '@angular/forms';

import {MaskitoModule} from '@maskito/angular';
import {applicationConfig, Meta} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {DateRangeComponent} from "./date-range/date-range.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Date_Range',
  decorators: [

    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    minDate: {
      control: {type: 'date'}
    },
    maxDate: {
      control: {type: 'date'}
    },
    viewType: {
      options: ['rounded', 'brick', 'circle'],
      control: {type: 'select'}
    },
    allowNull: {
      control: {type: 'boolean'}
    }
  },
  args: {
    viewType: 'rounded',
    minDate: new Date(
      new Date().getFullYear() - 3,
      new Date().getMonth(),
      new Date().getDate()
    ),
    maxDate: new Date(
      new Date().getFullYear() + 3,
      new Date().getMonth(),
      new Date().getDate()
    ),
    allowNull: true,
  },
  component: DateRangeComponent,
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule],
  },
} as Meta;

export const baseDateRange = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, DateRangeComponent, IconSpriteDirective],
  },
  props: {...args, data: {from: new Date(), to: new Date()}},
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-range [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`,
});
export const disabledDateRange = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, DateRangeComponent, IconSpriteDirective],
  },
  props: {...args, data: {from: new Date(), to: new Date()}},
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-range [disabled]="true" [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`,
});
export const invalidDateRange = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, MaskitoModule, DateRangeComponent, IconSpriteDirective],
  },
  props: {...args, data: {from: new Date(), to: new Date()}},
  template: `<div [tetaIconSprite]="'assets/icons.svg'"><teta-date-range  [invalid]="true" [ngModel]="data" [maxDate]="maxDate" [minDate]="minDate"  [showTime]="showTime"  [viewType]="viewType" [allowNull]="allowNull"></teta-date-range></div>`,
});
