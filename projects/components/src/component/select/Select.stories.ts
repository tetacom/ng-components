import {
  boolean,
  optionsKnob,
  select,
  withKnobs,
} from '@storybook/addon-knobs';
import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';
import { SelectComponent } from './select/select.component';
import { SelectModule } from './select.module';
import * as faker from 'faker';
import { iconsList } from '../icon/icons-list';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Component/Select',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  component: SelectComponent,
  moduleMetadata: {
    imports: [SelectModule, FormsModule],
  },
} as Meta;

const getOptions = size => {
  const res = [];
  for (let i = 0; i < size; i++) {
    res.push({
      id: i,
      name: faker.address.city(),
    });
  }
  return res;
};

export const singleSelect = () => ({
  moduleMetadata: {
    imports: [SelectModule, IconModule, FormsModule],
  },
  props: {
    icon: 'user',
    options: getOptions(1000),
    align: select(
      'align',
      {
        left: Align.left,
        right: Align.right,
        center: Align.center,
        auto: Align.auto,
        fitWidth: Align.fitWidth,
      },
      Align.fitWidth
    ),
    verticalAlign: select(
      'verticalAlign',
      {
        bottom: VerticalAlign.bottom,
        top: VerticalAlign.top,
        center: VerticalAlign.center,
        auto: VerticalAlign.auto,
      },
      VerticalAlign.bottom
    ),
    autoClose: boolean('autoClose', true),
    virtual: boolean('virtual', false),
    autoCloseIgnore: optionsKnob(
      'autoCloseIgnore',
      {
        esc: 'esc',
        enter: 'enter',
        inside: 'inside',
        outside: 'outside',
      },
      ['inside'],
      {
        display: 'check',
      }
    ),
    selected: null,
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 200px;"
                  [options]="options"
                  [icon]="icon"
                  [align]="align"
                  [verticalAlign]="verticalAlign"
                  [ngModel]="selected"
                  (ngModelChange)="selected = $event"
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

export const multipleSelect = () => ({
  moduleMetadata: {
    imports: [SelectModule, IconModule, FormsModule],
  },
  props: {
    icon: select('icon', iconsList, null),
    options: getOptions(10),
    align: select(
      'align',
      {
        left: Align.left,
        right: Align.right,
        center: Align.center,
        auto: Align.auto,
        fitWidth: Align.fitWidth,
      },
      Align.fitWidth
    ),
    verticalAlign: select(
      'verticalAlign',
      {
        bottom: VerticalAlign.bottom,
        top: VerticalAlign.top,
        center: VerticalAlign.center,
        auto: VerticalAlign.auto,
      },
      VerticalAlign.bottom
    ),
    autoClose: boolean('autoClose', true),
    autoCloseIgnore: optionsKnob(
      'autoCloseIgnore',
      {
        esc: 'esc',
        enter: 'enter',
        inside: 'inside',
        outside: 'outside',
      },
      ['inside'],
      {
        display: 'check',
      }
    ),
    selected: null,
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 300px;"
                  [options]="options"
                  [multiple]="true"
                  [icon]="icon"
                  [align]="align"
                  [verticalAlign]="verticalAlign"
                  [ngModel]="selected"
                  (ngModelChange)="selected = $event"
                  [searchRef]="'name'"
                  [valueRef]="'id'"
                  [textRef]="'name'"
                  [autoClose]="autoClose"
                  [autoCloseIgnore]="autoCloseIgnore">
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
<!--      <ng-template tetaSelectValue let-value>-->
<!--        {{value?.name}}-->
<!--      </ng-template>-->
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});

export const multipleCustom = () => ({
  moduleMetadata: {
    imports: [SelectModule, IconModule, FormsModule],
  },
  props: {
    icon: select('icon', iconsList, null),
    options: getOptions(10),
    align: select(
      'align',
      {
        left: Align.left,
        right: Align.right,
        center: Align.center,
        auto: Align.auto,
        fitWidth: Align.fitWidth,
      },
      Align.fitWidth
    ),
    verticalAlign: select(
      'verticalAlign',
      {
        bottom: VerticalAlign.bottom,
        top: VerticalAlign.top,
        center: VerticalAlign.center,
        auto: VerticalAlign.auto,
      },
      VerticalAlign.bottom
    ),
    autoClose: boolean('autoClose', true),
    autoCloseIgnore: optionsKnob(
      'autoCloseIgnore',
      {
        esc: 'esc',
        enter: 'enter',
        inside: 'inside',
        outside: 'outside',
      },
      ['inside'],
      {
        display: 'check',
      }
    ),
    selected: null,
  },
  template: `<div class="padding-4 bg-panel-50" [tetaIconSprite]="'assets/icons.svg'">
    <teta-select  style="width: 300px;"
                  [options]="options"
                  [multiple]="true"
                  [icon]="icon"
                  [align]="align"
                  [verticalAlign]="verticalAlign"
                  [ngModel]="selected"
                  (ngModelChange)="selected = $event"
                  [searchRef]="'name'"
                  [valueRef]="'id'"
                  [textRef]="'name'"
                  [autoClose]="autoClose"
                  [autoCloseIgnore]="autoCloseIgnore">
      <ng-template tetaSelectOption let-option>
        {{option.name}}
      </ng-template>
      <ng-template tetaSelectValue let-value>
      <div class="row row_auto overflow-hidden">
        <div *ngFor="let item of value" class="color-red-50">
          {{item?.name}},
        </div>
      </div>
      </ng-template>
    </teta-select>
    <div class="margin-top-3">
      value: {{selected | json}}
    </div>
  </div>`,
});
