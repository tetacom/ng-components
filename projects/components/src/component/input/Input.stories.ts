import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {IconComponent} from '../icon/icon/icon.component';
import {IconModule} from '../icon/icon.module';
import {InputModule} from './input.module';
import {FormsModule} from '@angular/forms';
import {SelectModule} from '../select/select.module';
import {RadioModule} from '../radio/radio.module';
import {DatePickerModule} from '../date-picker/date-picker.module';
import {ToggleModule} from '../toggle/toggle.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {action} from '@storybook/addon-actions';
import {SampleInputModule} from './sample-input/sample-input.module';

export default {
  title: 'Component/Input',
  decorators: [withKnobs],
  component: IconComponent,
  moduleMetadata: {
    imports: [IconModule],
  },
} as Meta;

export const reactiveForm = () => ({
  moduleMetadata: {
    imports: [
      SampleInputModule,
      IconModule,
      InputModule,
      FormsModule,
      SelectModule,
      RadioModule,
      DatePickerModule,
      ToggleModule,
      CheckboxModule,
    ],
  },
  props: {
    log: (name, value) => {
      action(name)(value);
    },
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="border border-text-10 padding-3" style="width: 500px;">
              <teta-sample-input></teta-sample-input>
            </div>`,
});

export const basicInput = () => ({
  moduleMetadata: {
    imports: [
      IconModule,
      InputModule,
      FormsModule,
      SelectModule,
      RadioModule,
      DatePickerModule,
      ToggleModule,
      CheckboxModule,
    ],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="border border-text-10 padding-3" style="width: 500px;">
  <div class="form-container">
    <div class="form-row">
      <teta-input [label]="'text-field'">
        <teta-text-field [leftIconName]="'user'" [placeholder]="'placeholder'"></teta-text-field>
      </teta-input>
      <teta-input [label]="'text-field disabled'">
        <teta-text-field [leftIconName]="'user'" [disabled]="true" [placeholder]="'placeholder'"></teta-text-field>
      </teta-input>
      <teta-input [label]="'text-field invalid'">
        <teta-text-field [leftIconName]="'user'" [invalid]="true" [placeholder]="'placeholder'"></teta-text-field>
        <div ngProjectAs="message" class="color-red-50">
          Has errors
        </div>
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [label]="'input'">
        <input class="input" [placeholder]="'placeholder'" />
      </teta-input>
      <teta-input [label]="'input disabled'">
        <input class="input" disabled [placeholder]="'placeholder'" />
      </teta-input>
      <teta-input [label]="'input invalid'">
        <input class="input" [class.input_invalid]="true" [placeholder]="'placeholder'" />
        <div ngProjectAs="message" class="color-red-50">
          Has errors
        </div>
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [label]="'input required'" [required]="true">
        <input class="input" [placeholder]="'placeholder'" />
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [label]="'Select'">
        <teta-select></teta-select>
      </teta-input>
      <teta-input [label]="'Select disabled'">
        <teta-select [disabled]="true"></teta-select>
      </teta-input>
      <teta-input [label]="'Select invalid'">
        <teta-select [invalid]="true"></teta-select>
      </teta-input>
    </div>
    <teta-input [label]="'Selection'">
      <teta-radio>
        <teta-radio-button>Option 1</teta-radio-button>
        <teta-radio-button>Option 2</teta-radio-button>
        <teta-radio-button [disabled]="true">Option 3</teta-radio-button>
      </teta-radio>
    </teta-input>
    <teta-toggle>Off / On</teta-toggle>
    <teta-toggle [disabled]="true">Off / On</teta-toggle>
    <div class="form-row">
      <teta-input [label]="'Date'">
        <teta-date-picker></teta-date-picker>
      </teta-input>
      <teta-input [label]="'Date disabled'">
        <teta-date-picker [disabled]="true"></teta-date-picker>
      </teta-input>
      <teta-input [label]="'Date invalid'">
        <teta-date-picker [invalid]="true"></teta-date-picker>
      </teta-input>
    </div>
    <teta-checkbox [binary]="true">Check Me, babe</teta-checkbox>
    <teta-checkbox [binary]="true" [disabled]="true">I am disabled</teta-checkbox>
    <div class="form-row">
      <teta-input [label]="'textarea'">
        <textarea class="textarea" [placeholder]="'textarea'"></textarea>
      </teta-input>
      <teta-input [label]="'textarea disabled'">
        <textarea class="textarea" disabled [placeholder]="'textarea'"></textarea>
      </teta-input>
      <teta-input [label]="'textarea invalid'">
        <textarea class="textarea textarea_invalid" [placeholder]="'textarea'"></textarea>
      </teta-input>
    </div>
  </div>
</div>`,
});
