import {CheckboxComponent} from './checkbox/checkbox.component';

import {FormsModule} from '@angular/forms';
import {applicationConfig, Meta} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {provideHttpClient} from "@angular/common/http";
import {IconSpriteDirective} from '../icon/icon-sprite.directive';

export default {
  title: 'Component/Checkbox',
  decorators: [

    applicationConfig({
      providers: [
        provideHttpClient()
      ],
    }),
  ],
  argTypes: {
    text: {
      control: {type: 'text'}
    },
    labelPosition: {
      options: ['left', 'right'],
      control: {type: 'select'}
    }
  },
  args: {
    text: 'text text',
    labelPosition: 'left'
  },
  component: CheckboxComponent,
  moduleMetadata: {
    imports: [FormsModule, CommonModule],
  },
} as Meta;

export const defaultCheckbox = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, CommonModule, IconSpriteDirective],
  },
  props: args,
  template: `
<div class="column gap-8">
<teta-checkbox [tetaIconSprite]="'assets/icons.svg'" [labelPosition]="labelPosition"
                            [palette]="palette"
                            [ngModel]="value"
                            (ngModelChange)="setValue($event)"
                            [allowNull]="false"
                            [binary]="true">
              {{text}}
            </teta-checkbox>
</div>
`,
});
export const disabledCheckbox = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, CommonModule, IconSpriteDirective],
  },
  props: args,
  template: `
<div class="column gap-8">
<teta-checkbox [tetaIconSprite]="'assets/icons.svg'" [labelPosition]="labelPosition"
                            [palette]="palette"
                            [ngModel]="value"
                            [disabled]="true"
                            (ngModelChange)="setValue($event)"
                            [allowNull]="false"
                            [binary]="true">
              {{text}}
            </teta-checkbox>
</div>
`,
});
export const checkboxWithNull = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, CommonModule, IconSpriteDirective],
  },
  props: args,
  template: `
<div class="column gap-8">
<teta-checkbox [tetaIconSprite]="'assets/icons.svg'" [labelPosition]="labelPosition"
                            [palette]="palette"
                            [ngModel]="value"
                            (ngModelChange)="setValue($event)"
                            [allowNull]="true"
                            [binary]="true">
              {{text}}
            </teta-checkbox>
</div>
`,
});
export const list = (args) => ({
  moduleMetadata: {
    imports: [FormsModule],
  },
  props: {
    ...args,
    selectAll: (value: boolean, result: number[], values: number[]) => {
      result = [];
      if (value) {
        result.push(...values);
      }
      return result;
    },
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allSelected: (result: number[], values: number[]) => {
      if (!result || result?.length < 1) {
        return false;
      }
      if (values.every((_) => result.indexOf(_) >= 0)) {
        return true;
      }
      return undefined;
    },
  },
  template: `
<div style="display:flex; align-items: center;" class="font-body-3 margin-bottom-4" [tetaIconSprite]="'assets/icons.svg'">
  <teta-checkbox  [ngModel]="allSelected(result, values)"
                  [palette]="palette"
                  [labelPosition]="labelPosition"
                  (ngModelChange)="result = selectAll($event, result, values)"
                  [allowNull]="true"
                  [binary]="true">Выбрать все</teta-checkbox>
</div>
@for(num of values; track num;) {
  <div style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
    <teta-checkbox [labelPosition]="labelPosition" [palette]="palette" [ngModel]="result" (ngModelChange)="result = $event;setValue($event)" [value]="num">
      {{text+num}}
    </teta-checkbox>
  </div>
}`,
});
