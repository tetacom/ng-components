
import {IconComponent} from '../icon/icon/icon.component';


import {FormsModule} from '@angular/forms';





import {action} from '@storybook/addon-actions';

import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {InputComponent} from "./input/input.component";
import {TextFieldComponent} from "./text-field/text-field.component";
import {DatePickerComponent} from "../date-picker/date-picker/date-picker.component";
import {SelectComponent} from "../select/select/select.component";
import {RadioComponent} from "../radio/radio/radio.component";
import {ToggleComponent} from "../toggle/toggle/toggle.component";
import {CheckboxComponent} from "../checkbox/checkbox/checkbox.component";
import {RadioButtonComponent} from "../radio/radio-button/radio-button.component";
import {SampleInputComponent} from "./sample-input/sample-input/sample-input.component";

export default {
  title: 'Component/Input',
  decorators: [

    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  argTypes:{
    horizontal:{
      control:{type:'boolean'}
    },viewType:{
      options:['rounded', 'brick', 'circle'],
      control:{type:'select'}
    },
    label:{
      control:{type:'text'}
    },
  },
  args:{
    viewType:'rounded',
    label:'label',
    horizontal:false,
  },

  component: IconComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;


export const basicInput = (args) => ({
  moduleMetadata: {
    imports: [
    FormsModule,IconSpriteDirective,InputComponent,TextFieldComponent,DatePickerComponent,SelectComponent,RadioComponent,ToggleComponent,CheckboxComponent,RadioButtonComponent
],
  },
  props:args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="border border-text-10 padding-3" style="width: 500px;">
  <div class="form-container">
    <div class="form-row">
      <teta-input  [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <teta-text-field [leftIconName]="'user'"  [placeholder]="'textField'"></teta-text-field>
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <input class="input" [placeholder]="'input'" />
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <textarea class="textarea" [placeholder]="'textarea'"></textarea>
      </teta-input>
    </div>
  </div>
</div>`,

});
export const disabledInput = (args) => ({
  moduleMetadata: {
    imports: [
      FormsModule,IconSpriteDirective,InputComponent,TextFieldComponent,DatePickerComponent,SelectComponent,RadioComponent,ToggleComponent,CheckboxComponent,RadioButtonComponent
    ],
  },
  props:args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="border border-text-10 padding-3" style="width: 500px;">
    <div class="form-container">
    <div class="form-row">
      <teta-input  [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <teta-text-field [disabled]="true" [leftIconName]="'user'"  [placeholder]="'textField'"></teta-text-field>
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <input [disabled]="true" class="input" [placeholder]="'input'" />
      </teta-input>
    </div>
    <div class="form-row">
      <teta-input [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <textarea [disabled]="true" class="textarea" [placeholder]="'textarea'"></textarea>
      </teta-input>
    </div>
  </div>
</div>`,

});
export const invalidInput = (args) => ({
  moduleMetadata: {
    imports: [
      FormsModule,IconSpriteDirective,InputComponent,TextFieldComponent,DatePickerComponent,SelectComponent,RadioComponent,ToggleComponent,CheckboxComponent,RadioButtonComponent
    ],
  },
  props:args,
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="border border-text-10 padding-3" style="width: 500px;">
    <div class="form-container">
    <div class="form-row">
      <teta-input  [horizontal]="horizontal" [label]="label" [viewType]="viewType">
        <teta-text-field [invalid]="true" [leftIconName]="'user'"  [placeholder]="'textField'"></teta-text-field>
      </teta-input>
    </div>
  </div>
</div>`,

});
