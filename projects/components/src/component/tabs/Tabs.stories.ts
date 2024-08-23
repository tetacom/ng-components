import {applicationConfig, Meta} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {IconComponent} from '../icon/icon/icon.component';
import {IconSpriteDirective} from '../icon/icon-sprite.directive';
import {TabsComponent} from './tabs/tabs.component';
import {TabComponent} from './tab/tab.component';
import {TabTitleDirective} from './tab-title.directive';
import {TabContentDirective} from './tab-content.directive';

export default {
  title: 'Component/Tabs',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const basicTabs = () => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  },
  props: {},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3">
    <h1 style="margin-bottom: 0.5em">Табы</h1>
    <teta-tabs>
      <teta-tab>
        <ng-template tetaTabTitle>
          <teta-icon [name]="'calendar'"></teta-icon>Результат
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_accent">
            <div class="container">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.
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
export const verticalTabs = () => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  },
  props: {},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3">
    <h1 style="margin-bottom: 0.5em">Вертикальные табы</h1>
    <teta-tabs direction="vertical">
      <teta-tab>
        <ng-template tetaTabTitle>
          <teta-icon [name]="'calendar'"></teta-icon>Результат
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_accent">
            <div class="container">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.
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
export const smallTabs = () => ({
  moduleMetadata: {
    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  },
  props: {},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3">
    <h1 style="margin-bottom: 0.5em">Табы маленького размера</h1>
    <teta-tabs size="s">
      <teta-tab>
        <ng-template tetaTabTitle>
          <teta-icon [name]="'calendar'"></teta-icon>Результат
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_accent">
            <div class="container">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.
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
    imports: [IconComponent, IconSpriteDirective, TabsComponent, TabComponent, TabTitleDirective, TabContentDirective],
  },
  props: {},
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="padding-3">
    <h1 style="margin-bottom: 0.5em">Неактивные табы</h1>
    <teta-tabs >
      <teta-tab  [disabled]="true">
        <ng-template tetaTabTitle>
          <teta-icon [name]="'calendar'"></teta-icon>Результат
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_accent">
            <div class="container">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, consectetur cumque ea excepturi ipsum praesentium quaerat reiciendis reprehenderit suscipit tenetur. A dolor fugit hic illo labore nostrum officia quo veritatis.
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
