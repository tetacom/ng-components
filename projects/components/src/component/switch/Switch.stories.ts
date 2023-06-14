import {Meta} from '@storybook/angular/types-6-0';
import {select, withKnobs} from '@storybook/addon-knobs';
import {IconModule} from '../icon/icon.module';
import {SwitchComponent} from './switch/switch.component';
import {SwitchModule} from './switch.module';
import {action} from '@storybook/addon-actions';
import {FormsModule} from '@angular/forms';

export default {
  title: 'Component/Switch',
  decorators: [withKnobs],
  component: SwitchComponent,
  moduleMetadata: {
    imports: [SwitchModule, FormsModule, IconModule],
  },
} as Meta;

export const switchSample = () => ({
  moduleMetadata: {
    imports: [SwitchModule, IconModule, FormsModule],
  },
  props: {
    model: 'item 1',
    palette: select('palette', ['primary', 'grey', 'red', 'white'], 'grey'),
    values: ['item 1', 'item 2', 'item 3'],
    viewType: select('viewType', ['circle', 'rounded', 'brick'], 'rounded'),
    log: (name, value) => {
      action(name)(value);
    },
  },
  template: `<teta-switch [viewType]="viewType" [tetaIconSprite]="'assets/icons.svg'"
                          [ngModel]="model"
                          (ngModelChange)="log('switch', $event)">
  <teta-switch-button *ngFor="let val of values" [value]="val">
    <teta-icon [name]="'settings'" class="margin-right-2"></teta-icon> {{val}}
  </teta-switch-button>
</teta-switch>`,
});
