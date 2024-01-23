// eslint-disable-next-line id-blacklist
import {withKnobs} from '@storybook/addon-knobs';


import {DividerComponent} from "./divider/divider.component";
import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Divider',
  decorators: [
    withKnobs,
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
    imports: [],
  },
  template: `<div class="padding-4" style="width: 300px" [tetaIconSprite]="'assets/icons.svg'"><teta-divider [label]="'Название раздела'"></teta-divider></div>`,
});
