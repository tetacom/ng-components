import {withKnobs} from '@storybook/addon-knobs';
import {ExpandCardModule} from "./expand-card.module";
import {ExpandItemComponent} from "./expand-item/expand-item.component";
import {IconModule} from "../icon/icon.module";
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

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
    imports: [IconModule],
  },
} as Meta;

export const expandItem = () => ({
  moduleMetadata: {
    imports: [
      ExpandCardModule,
      IconModule
    ],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" style="width: 300px">
                <teta-expand-item>
                  <div ngProjectAs="head">Title</div>
                  <div>AAAAAAAAAAAAAAA</div>
                </teta-expand-item>
              </div>`,
});
