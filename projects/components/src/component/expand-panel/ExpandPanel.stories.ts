import { withKnobs } from '@storybook/addon-knobs';
import { ExpandPanelComponent } from './expand-panel/expand-panel.component';

import {applicationConfig, Meta} from '@storybook/angular';
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {ExpandPanelHeadDirective} from "./expand-panel-head.directive";
import {ExpandPanelContentDirective} from "./expand-panel-content.directive";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Expand Panel',
  decorators: [withKnobs,  applicationConfig({
    providers: [
      importProvidersFrom(HttpClientModule)
    ],
  })],
  component: ExpandPanelComponent,

  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const panel = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective,ExpandPanelHeadDirective,ExpandPanelContentDirective],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="column bg-global-bgcard font-body-3 padding-3" style="width: fit-content;height: 500px">
    <teta-expand-panel  class="column" [placeholder]="'Фильтр'" >
    <ng-template tetaExpandPanelHead >Панель</ng-template>
    <ng-template tetaExpandPanelContent >Содержимое</ng-template>
</teta-expand-panel>
  </div>`,
});
