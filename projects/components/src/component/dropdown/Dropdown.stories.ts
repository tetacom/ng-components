// eslint-disable-next-line id-blacklist
import { boolean, select, withKnobs } from '@storybook/addon-knobs';



import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';

import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Component/Dropdown',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  moduleMetadata: {
    imports: [],
  },
} as Meta;

const alignMap = new Map<VerticalAlign, string>()
  .set(VerticalAlign.bottom, 'bottom')
  .set(VerticalAlign.top, 'top')
  .set(VerticalAlign.center, 'center')
  .set(VerticalAlign.auto, 'auto')
  .set(VerticalAlign.innerAuto, 'innerAuto')
  .set(VerticalAlign.innerBottom, 'innerBottom')
  .set(VerticalAlign.innerTop, 'innerTop');
export const dropdownDirective = args => ({
  moduleMetadata: {
    imports: [],
  },
  props: {
    alignMap: alignMap,
    align: select(
      'align',
      [Align.left, Align.right, Align.center, Align.auto],
      Align.right
    ),
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto,
      VerticalAlign.innerAuto,
      VerticalAlign.innerBottom,
      VerticalAlign.innerTop,
    ],
    transform: boolean('transform', false),
    autoClose: boolean('autoClose', true),
    appendToBody: boolean('appendToBody', true),
  },
  template: `<div class="padding-10 bg-panel-50 row"
                  style="width: 800px;"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [style.margin]="transform ? '' : '100px 100px'"
                  [tetaIconSprite]="'assets/icons.svg'">
                  <div style="position: fixed; top: 0; left: 0;">Fixed</div>
                  <div style="position: fixed; top: 0; right: 0;transform: translateX(0px)">Fixed trans</div>
    <teta-scrollable tetaDropdown
          class="margin-right-4"
          *ngFor="let valign of verticalAlign"
          viewType="rounded"
          [open]="true"
          [align]="align"
          [verticalAlign]="valign"
          [appendToBody]="appendToBody"
          [autoClose]="autoClose">
          <button  tetaDropdownHead teta-button [palette]="'primary'" style="width: 80px">
        {{alignMap.get(valign)}}
      </button>
      <div tetaDropdownContent class="list">
        <ng-container *ngFor="let i of [1,2,3]">
          <div class="list-item">
            <teta-icon [name]="'user'" [palette]="'text'" class="margin-right-2"></teta-icon>Jerome Bell
          </div>
          <div class="list-item">
            <teta-icon [name]="'calendar'" [palette]="'text'" class="margin-right-2"></teta-icon>Courtney Henry
          </div>
          <div class="list-item">
            <teta-icon [name]="'eye'" [palette]="'text'" class="margin-right-2"></teta-icon>Wade Warren
          </div>
          <div class="list-item">
            <teta-icon [name]="'folder'" [palette]="'text'" class="margin-right-2"></teta-icon>Ralph Edwards
          </div>
          <div class="list-item">
            <teta-icon [name]="'map'" [palette]="'text'" class="margin-right-2"></teta-icon>Marvin McKinney
          </div>
        </ng-container>
      </div>
    </teta-scrollable>
  </div>`,
});
export const dropdownComponent = args => ({
  moduleMetadata: {
    imports: [],
  },
  props: {
    align: select(
      'align',
      [Align.left, Align.right, Align.center, Align.auto],
      Align.right
    ),
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto,
      VerticalAlign.innerAuto,
      VerticalAlign.innerBottom,
      VerticalAlign.innerTop,
    ],
    transform: boolean('transform', false),
    autoClose: boolean('autoClose', true),
    appendToBody: boolean('appendToBody', true),
  },
  template: `<div class="padding-10 bg-panel-50"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [tetaIconSprite]="'assets/icons.svg'">
    <teta-dropdown  *ngFor="let valign of verticalAlign"
                    [align]="align"
                    [verticalAlign]="valign"
                     viewType="rounded"
                    [appendToBody]="appendToBody"
                    [autoClose]="autoClose">
      <button teta-button tetaDropdownHead  [palette]="'primary'">
        Click to open
      </button>
      <div tetaDropdownContent class="list overflow-auto" style="width: 200px">
        <div class="list-item">
          <teta-icon [name]="'user'" [palette]="'text'" class="margin-right-2"></teta-icon>Jerome Bell
        </div>
        <div class="list-item">
          <teta-icon [name]="'calendar'" [palette]="'text'" class="margin-right-2"></teta-icon>Courtney Henry
        </div>
        <div class="list-item">
          <teta-icon [name]="'eye'" [palette]="'text'" class="margin-right-2"></teta-icon>Wade Warren
        </div>
        <div class="list-item">
          <teta-icon [name]="'folder'" [palette]="'text'" class="margin-right-2"></teta-icon>Ralph Edwards
        </div>
        <div class="list-item">
          <teta-icon [name]="'map'" [palette]="'text'" class="margin-right-2"></teta-icon>Marvin McKinney
        </div>
      </div>
    </teta-dropdown>
  </div>`,
});
