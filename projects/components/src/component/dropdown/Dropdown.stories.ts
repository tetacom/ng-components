// eslint-disable-next-line id-blacklist
import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';

import { applicationConfig, Meta } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {DropdownComponent} from "./dropdown/dropdown.component";
import {DropdownHeadDirective} from "./dropdown-head.directive";
import {DropdownContentDirective} from "./dropdown-content.directive";
import {ScrollableComponent} from "../../directive/scrollable/scrollable/scrollable.component";
import {DropdownDirective} from "./dropdown.directive";
import {ButtonComponent} from "../button/button/button.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {IconComponent} from "../icon/icon/icon.component";

export default {
  title: 'Component/Dropdown',
  decorators: [

    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  moduleMetadata: {
    imports: [],
  },
  argTypes:{
    align:{
      options:['Align.left',' Align.right', 'Align.center', 'Align.auto'],
      control:{type:'select'}
    },
    verticalAlign:{
      options:['VerticalAlign.bottom','VerticalAlign.top','VerticalAlign.center','VerticalAlign.auto','VerticalAlign.innerAuto','VerticalAlign.innerBottom','VerticalAlign.innerTop'],
      control:{type:'select'}
    },
    viewType:{
      options:['rounded', 'brick', 'circle'],
      control:{type:'select'}
    },
    allowNull:{
      control:{type:'boolean'}
    },
    autoClose:{
      control:{type:'boolean'}
    },
    transform:{
      control:{type:'boolean'}
    }
  },
  args:{
    viewType:'rounded',
    autoClose:true,
    transform:true,
    verticalAlign:'VerticalAlign.top',
    align:'Align.left',
    allowNull:true,
  },
} as Meta;
const alignMap = new Map<string, Align>()
  .set('Align.left', Align.left)
  .set('Align.auto', Align.auto)
  .set('Align.center', Align.center)
  .set('Align.right',Align.right)
const valignMap = new Map<string, VerticalAlign>()
  .set('VerticalAlign.bottom', VerticalAlign.bottom)
  .set('VerticalAlign.top', VerticalAlign.top)
  .set('VerticalAlign.center', VerticalAlign.center)
  .set('VerticalAlign.auto',VerticalAlign.auto)
  .set('VerticalAlign.innerAuto', VerticalAlign.innerAuto)
  .set('VerticalAlign.innerBottom', VerticalAlign.innerBottom)
  .set('VerticalAlign.innerTop', VerticalAlign.innerTop);
export const baseDropdown = args => ({
  moduleMetadata: {
    imports: [DropdownComponent,DropdownHeadDirective,DropdownContentDirective,ScrollableComponent,DropdownDirective,ButtonComponent,IconSpriteDirective,IconComponent],
  },
  props: { ...args,valignMap, alignMap},
  template: `<div class="padding-10 bg-panel-50 row"
                  style="width: 800px;"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [style.margin]="transform ? '' : '100px 100px'"
                  [tetaIconSprite]="'assets/icons.svg'">

    <teta-scrollable tetaDropdown
          class="margin-right-4"
          [viewType]="viewType"
          [open]="true"
          [align]="alignMap.get(align)"
          [verticalAlign]="alignMap.get(verticalAlign)"
          [appendToBody]="appendToBody"
          [autoClose]="autoClose">
          <button  tetaDropdownHead teta-button [viewType]="viewType" [palette]="'primary'">
        {{verticalAlign}}
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
export const disabledDropdown = args => ({
  moduleMetadata: {
    imports: [DropdownComponent,DropdownHeadDirective,DropdownContentDirective,ScrollableComponent,DropdownDirective,ButtonComponent,IconSpriteDirective,IconComponent],
  },
  props: { ...args,valignMap, alignMap},
  template: `<div class="padding-10 bg-panel-50 row"
                  style="width: 800px;"
                  [style.transform]="transform ? 'translate(100px, 100px)' : ''"
                  [style.margin]="transform ? '' : '100px 100px'"
                  [tetaIconSprite]="'assets/icons.svg'">

    <teta-scrollable tetaDropdown
          class="margin-right-4"
          [disabled]="true"
          [viewType]="viewType"
          [open]="true"
          [align]="alignMap.get(align)"
          [verticalAlign]="alignMap.get(verticalAlign)"
          [appendToBody]="appendToBody"
          [autoClose]="autoClose">
          <button  tetaDropdownHead teta-button [viewType]="viewType" [palette]="'text'">
        {{verticalAlign}}
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
