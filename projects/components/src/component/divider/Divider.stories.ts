// eslint-disable-next-line id-blacklist



import {DividerComponent} from "./divider/divider.component";
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Divider',
  decorators: [

    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ],
    }),
  ],
  component: DividerComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const divider = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective],
  },
  template: `<div class="padding-4" style="width: 300px" [tetaIconSprite]="'assets/icons.svg'"><teta-divider [label]="'Название раздела'"></teta-divider></div>`,
});
