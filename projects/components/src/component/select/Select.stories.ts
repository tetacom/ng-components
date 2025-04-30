import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';
import { SelectComponent } from './select/select.component';

import * as faker from 'faker';

import { FormsModule } from '@angular/forms';
import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { SelectOptionDirective } from './select-option.directive';
import { SelectValueDirective } from './select-value.directive';

export default {
  title: 'Component/Select',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  argTypes: {
    align: {
      options: ['Align.left', ' Align.right', 'Align.center', 'Align.auto'],
      control: { type: 'select' },
    },
    verticalAlign: {
      options: [
        'VerticalAlign.bottom',
        'VerticalAlign.top',
        'VerticalAlign.center',
        'VerticalAlign.auto',
        'VerticalAlign.innerAuto',
        'VerticalAlign.innerBottom',
        'VerticalAlign.innerTop',
      ],
      control: { type: 'select' },
    },
    viewType: {
      options: ['rounded', 'brick', 'circle'],
      control: { type: 'select' },
    },
    allowNull: {
      control: { type: 'boolean' },
    },
    virtual: {
      control: { type: 'boolean' },
    },
    autoClose: {
      control: { type: 'boolean' },
    },
    autoCloseIgnore: {
      options: ['esc', 'enter', 'inside', 'outside'],
      control: { type: 'multi-select' },
    },
  },
  args: {
    viewType: 'rounded',
    verticalAlign: 'VerticalAlign.auto',
    align: 'Align.minWidth',
    allowNull: true,
    autoClose: true,
    virtual: false,
    autoCloseIgnore: ['esc'],
  },
  component: SelectComponent,
  moduleMetadata: {
    imports: [FormsModule],
  },
} as Meta;

const getOptions = (size) => {
  const res = [];
  for (let i = 0; i < size; i++) {
    res.push({
      id: i,
      name: faker.address.city(),
      disabled: i % 3 === 0,
    });
  }
  return res;
};
const alignMap = new Map<string, Align>()
  .set('Align.minWidth', Align.minWidth)
  .set('Align.left', Align.left)
  .set('Align.auto', Align.auto)
  .set('Align.center', Align.center)
  .set('Align.right', Align.right);
const valignMap = new Map<string, VerticalAlign>()
  .set('VerticalAlign.bottom', VerticalAlign.bottom)
  .set('VerticalAlign.top', VerticalAlign.top)
  .set('VerticalAlign.center', VerticalAlign.center)
  .set('VerticalAlign.auto', VerticalAlign.auto)
  .set('VerticalAlign.innerAuto', VerticalAlign.innerAuto)
  .set('VerticalAlign.innerBottom', VerticalAlign.innerBottom)
  .set('VerticalAlign.innerTop', VerticalAlign.innerTop);
export const singleSelect = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective, SelectComponent, SelectOptionDirective, SelectValueDirective],
  },
  props: {
    ...args,
    valignMap,
    alignMap,
    icon: 'user',
    options: getOptions(1000),
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 200px;"
    [viewType]="viewType"
    [allowNull]="allowNull"
                  [options]="options"
                  [icon]="icon"
                  [align]="alignMap.get(align)"
                  [verticalAlign]="valignMap.get(verticalAlign)"

                  [textRef]="'name'"
                  [virtual]="true"
                  [valueRef]="'id'"
                  [autoClose]="autoClose"
                  [autoCloseIgnore]="autoCloseIgnore"
                  [disabled]="false">
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
      <ng-template tetaSelectValue let-value>
        {{value?.name}}
      </ng-template>
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});

export const singleSelectWithSearch = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective, SelectComponent, SelectOptionDirective, SelectValueDirective],
  },
  props: {
    ...args,
    valignMap,
    alignMap,
    icon: 'user',
    options: getOptions(1000),
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 200px;"
    [viewType]="viewType"
    [allowNull]="allowNull"
                  [options]="options"
                  [icon]="icon"
                  [align]="alignMap.get(align)"
                  [verticalAlign]="valignMap.get(verticalAlign)"
                  [searchRef]="'name'"
                  [textRef]="'name'"
                  [virtual]="virtual"
                  [valueRef]="'id'"
                  [autoClose]="autoClose"
                  [autoCloseIgnore]="autoCloseIgnore"
                  [disabled]="false">
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
      <ng-template tetaSelectValue let-value>
        {{value?.name}}
      </ng-template>
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});

export const disabledSelect = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective, SelectComponent, SelectOptionDirective, SelectValueDirective],
  },
  props: {
    ...args,
    valignMap,
    alignMap,
    icon: 'user',
    options: getOptions(1000),
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 200px;"
    [viewType]="viewType"
    [allowNull]="allowNull"
                  [options]="options"
                  [icon]="icon"
                  [align]="alignMap.get(align)"
                  [verticalAlign]="valignMap.get(verticalAlign)"
                  [searchRef]="'name'"
                  [textRef]="'name'"
                  [virtual]="virtual"
                  [valueRef]="'id'"
                  [autoClose]="autoClose"
                  [autoCloseIgnore]="autoCloseIgnore"
                  [disabled]="true">
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
      <ng-template tetaSelectValue let-value>
        {{value?.name}}
      </ng-template>
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});

export const invalidSelect = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective, SelectComponent, SelectOptionDirective, SelectValueDirective],
  },
  props: {
    ...args,
    valignMap,
    alignMap,
    icon: 'user',
    options: getOptions(1000),
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 200px;"
    [viewType]="viewType"
    [allowNull]="allowNull"
                  [options]="options"
                  [icon]="icon"
                  [align]="alignMap.get(align)"
                  [verticalAlign]="valignMap.get(verticalAlign)"
    [invalid]="true"
                  [textRef]="'name'"
                  [virtual]="virtual"
                  [valueRef]="'id'"
                  [autoClose]="autoClose"
                  [autoCloseIgnore]="autoCloseIgnore"
                  [disabled]="false">
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
      <ng-template tetaSelectValue let-value>
        {{value?.name}}
      </ng-template>
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});

export const multipleSelect = (args) => ({
  moduleMetadata: {
    imports: [FormsModule, IconSpriteDirective, SelectComponent, SelectOptionDirective, SelectValueDirective],
  },
  props: {
    ...args,
    valignMap,
    alignMap,
    selected: [],
    icon: 'user',
    options: getOptions(1000),
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 300px;"
                  [options]="options"
                  [multiple]="true"
                  [icon]="icon"
                  [ngModel]="selected"
                  [align]="align"
                  [verticalAlign]="verticalAlign"
                  [searchRef]="'name'"
                  [valueRef]="'id'"

                  [textRef]="'name'"
  >
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});
