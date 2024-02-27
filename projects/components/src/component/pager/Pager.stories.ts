


import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import {PagerComponent} from "./pager/pager.component";

export default {
  title: 'Component/Pager',
  decorators: [

    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  moduleMetadata: {
    imports: []
  }
} as Meta;

export const pagerSample = () => ({
  moduleMetadata: {
    imports: [PagerComponent,IconSpriteDirective]
  },
  template: `<teta-pager [tetaIconSprite]="'assets/icons.svg'"></teta-pager>`,
});
