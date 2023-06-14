import { Meta } from '@storybook/angular/types-6-0';
// eslint-disable-next-line id-blacklist
import { select, text, withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxModule } from './checkbox.module';
// @ts-ignore
import mdx from './Checkbox.mdx';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Component/Checkbox',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [withKnobs],
  component: CheckboxComponent,
  moduleMetadata: {
    imports: [CheckboxModule, FormsModule],
  },
} as Meta;

export const binary = () => ({
  moduleMetadata: {
    imports: [CheckboxModule, IconModule, FormsModule],
  },
  props: {
    type: select('type', ['binary', 'list'], 'binary'),
    allowUndefined: boolean('allowUndefined', false),
    text: text('text', 'Remember me'),
    palette: select('palette', ['primary', 'grey', 'red', 'white'], 'primary'),
    value: false,
    setValue: (value) => {
      action('log')(value);
    },
  },
  template: `
<div class="column gap-8">
<teta-checkbox [tetaIconSprite]="'assets/icons.svg'"
                            [palette]="palette"
                            [ngModel]="value"
                            (ngModelChange)="setValue($event)"
                            [binary]="true">
              {{text}}
            </teta-checkbox>

            <teta-checkbox [tetaIconSprite]="'assets/icons.svg'"
                            [palette]="palette"
                            [disabled] = "true"
                            [ngModel]="value"
                            (ngModelChange)="setValue($event)"
                            [binary]="true">
              {{text}}
            </teta-checkbox>
</div>
`,
});

export const list = () => ({
  moduleMetadata: {
    imports: [CheckboxModule, IconModule, FormsModule],
  },
  props: {
    type: select('type', ['binary', 'list'], 'binary'),
    palette: select('palette', ['primary', 'grey', 'red', 'white'], 'primary'),
    value: false,
    setValue: (value) => {
      action('log')(value);
    },
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    result: [],
    selectAll: (value: boolean, result: number[], values: number[]) => {
      result = [];
      if (value) {
        result.push(...values);
      }
      return result;
    },
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
                  (ngModelChange)="result = selectAll($event, result, values)"
                  [allowNull]="true"
                  [binary]="true">Выбрать все</teta-checkbox>
</div>
<div *ngFor="let num of values" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
  <teta-checkbox [palette]="palette" [ngModel]="result" (ngModelChange)="result = $event;setValue($event)" [value]="num">
    Option {{num}}
  </teta-checkbox>
</div>`,
});
