import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {TabsModule} from './tabs.module';
import {IconModule} from '../icon/icon.module';

export default {
  title: 'Component/Tabs',
  decorators: [withKnobs],
  moduleMetadata: {
    imports: [TabsModule, IconModule]
  },
} as Meta;

export const basicTab = () => ({
  moduleMetadata: {
    imports: [TabsModule, IconModule]
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
      <teta-tab [disabled]="true">
        <ng-template tetaTabTitle>
          Disabled
        </ng-template>
        <ng-template tetaTabContent>
          <div class="area area_code">
           Disabled
          </div>
        </ng-template>
      </teta-tab>
    </teta-tabs>
  </div>`,
});
