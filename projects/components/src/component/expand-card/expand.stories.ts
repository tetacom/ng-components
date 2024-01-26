import {withKnobs} from '@storybook/addon-knobs';

import {ExpandItemComponent} from "./expand-item/expand-item.component";

import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Expand',
  decorators: [
    withKnobs,
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  component: ExpandItemComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const expandItem = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" style="width: 300px">
                <teta-expand-item>
                  <div ngProjectAs="head">Title</div>
                  <div>AAAAAAAAAAAAAAA</div>
                </teta-expand-item>
              </div>`,
});
