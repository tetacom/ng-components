import {ExpandItemComponent} from "./expand-item/expand-item.component";

import {applicationConfig, Meta} from "@storybook/angular";
import {provideHttpClient} from "@angular/common/http";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";

export default {
  title: 'Component/Expand',
  decorators: [

    applicationConfig({
      providers: [
        provideHttpClient()
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
