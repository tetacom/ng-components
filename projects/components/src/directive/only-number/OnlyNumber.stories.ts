import {withKnobs} from '@storybook/addon-knobs';
import {OnlyNumberModule} from './only-number.module';
import {FormsModule} from '@angular/forms';
import {action} from '@storybook/addon-actions';
import {Meta} from "@storybook/angular";

export default {
  title: 'Directive/OnlyNumber',
  decorators: [withKnobs],
} as Meta;

export const onlyNumber = () => ({
  moduleMetadata: {
    imports: [OnlyNumberModule, FormsModule],
  },
  props: {
    data: 123,
    log: (name, value) => {
      action(name)(value);
      console.log(name, value);
    },
  },
  template: `<div class="bg-panel-50 padding-10 margin-10">
                On blur
                <input tetaOnlyNumber
                        class="input"
                        [ngModel]="data"
                        (ngModelChange)="data=$event;log('tetaOnlyNumber', $event)"
                        [ngModelOptions]="{updateOn: 'blur'}"/>
                <div>{{data}}</div>
              </div>
              <div class="bg-panel-50 padding-10 margin-10">
                Standart
                <input tetaOnlyNumber
                        class="input"
                        [ngModel]="data"
                        (ngModelChange)="data=$event;log('tetaOnlyNumber', $event)"/>
                <div>{{data}}</div>
              </div>
              <input class="input"/>`,
});
