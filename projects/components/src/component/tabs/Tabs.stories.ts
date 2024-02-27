


import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {TabsComponent} from "./tabs/tabs.component";
import {TabComponent} from "./tab/tab.component";
import {TabTitleDirective} from "./tab-title.directive";
import {TabContentDirective} from "./tab-content.directive";

export default {
  title: 'Component/Tabs',
  decorators: [

    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  moduleMetadata: {
    imports: []
  },
} as Meta;

export const basicTab = () => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective,TabsComponent,TabComponent,TabTitleDirective,TabContentDirective]
  },
  props: {},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3" style="width 100px; height 800px;">
    <teta-tabs>
      <teta-tab>
        <ng-template tetaTabTitle>
          <teta-icon [name]="'calendar'" class="margin-right-2"></teta-icon>Результат
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_accent">
            <div class="container">
             1111
            </div>
          </div>
        </ng-template>
      </teta-tab>
      <teta-tab>
        <ng-template tetaTabTitle>
          Код
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_code">
           CODE
          </div>
        </ng-template>
      </teta-tab>
    </teta-tabs>
  </div>`,
});
export const disabledTab = () => ({
  moduleMetadata: {
    imports: [IconComponent,IconSpriteDirective,TabsComponent,TabComponent,TabTitleDirective,TabContentDirective]
  },
  props: {},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3" style="width 100px; height 800px;">
    <teta-tabs >
      <teta-tab  [disabled]="true">
        <ng-template tetaTabTitle>
          <teta-icon [name]="'calendar'" class="margin-right-2"></teta-icon>Результат
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_accent">
            <div class="container">
             1111
            </div>
          </div>
        </ng-template>
      </teta-tab>
      <teta-tab [disabled]="true">
        <ng-template tetaTabTitle>
          Код
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_code">
           CODE
          </div>
        </ng-template>
      </teta-tab>
    </teta-tabs>
  </div>`,
});
