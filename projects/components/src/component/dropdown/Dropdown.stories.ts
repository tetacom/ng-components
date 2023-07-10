// eslint-disable-next-line id-blacklist
import {boolean, select, withKnobs} from '@storybook/addon-knobs';
import {ButtonModule} from '../button/button.module';
import {IconModule} from '../icon/icon.module';
import {DropdownModule} from './dropdown.module';
import {Align} from '../../common/enum/align.enum';
import {VerticalAlign} from '../../common/enum/vertical-align.enum';
import {ScrollableModule} from "../../directive/scrollable/scrollable.module";
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Dropdown',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  moduleMetadata: {
    imports: [DropdownModule]
  }
} as Meta;

export const dropdownDirective = (args) => ({
  moduleMetadata: {
    imports: [DropdownModule, ButtonModule, IconModule, ScrollableModule]
  },
  props: {
    align: select('align', [Align.left, Align.right, Align.center, Align.auto], Align.right),
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto,
      VerticalAlign.innerAuto,
      VerticalAlign.innerBottom,
      VerticalAlign.innerTop
    ],
    transform: boolean('transform', false),
    autoClose: boolean('autoClose', true),
    appendToBody: boolean('appendToBody', true)
  },
  template: `<div class="padding-10 bg-panel-50 row"
                  style="width: 500px;"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [style.margin]="transform ? '' : '100px 100px'"
                  [tetaIconSprite]="'assets/icons.svg'">
                  <div style="position: fixed; top: 0; left: 0;">Fixed</div>
                  <div style="position: fixed; top: 0; right: 0;transform: translateX(0px)">Fixed trans</div>
    <div tetaDropdown
          class="margin-right-4"
          *ngFor="let valign of verticalAlign"
          viewType="rounded"
          [align]="align"
          [verticalAlign]="valign"
          [appendToBody]="appendToBody"
          [autoClose]="autoClose">
      <button teta-button tetaDropdownHead [palette]="'primary'">
        {{alignMap.get(valign)}}
      </button>
      <teta-scrollable tetaDropdownContent class="list" style="width: 200px">
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
      </teta-scrollable>
    </div>
  </div>`
});
export const dropdownComponent = (args) => ({
  moduleMetadata: {
    imports: [DropdownModule, ButtonModule, IconModule]
  },
  props: {
    align: select('align', [Align.left, Align.right, Align.center, Align.auto], Align.right),
    verticalAlign: [
      VerticalAlign.bottom,
      VerticalAlign.top,
      VerticalAlign.center,
      VerticalAlign.auto,
      VerticalAlign.innerAuto,
      VerticalAlign.innerBottom,
      VerticalAlign.innerTop
    ],
    transform: boolean('transform', false),
    autoClose: boolean('autoClose', true),
    appendToBody: boolean('appendToBody', true)
  },
  template: `<div class="padding-10 bg-panel-50"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [tetaIconSprite]="'assets/icons.svg'">
    <teta-dropdown *ngFor="let valign of verticalAlign"
                    [align]="align"
                    [verticalAlign]="valign"
                     viewType="rounded"
                    [appendToBody]="appendToBody"
                    [autoClose]="autoClose">
      <button teta-button tetaDropdownHead [palette]="'primary'">
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
  </div>`
});
