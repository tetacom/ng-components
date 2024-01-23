import {withKnobs} from '@storybook/addon-knobs';


import {applicationConfig, Meta} from "@storybook/angular";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

export default {
  title: 'Component/Pager',
  decorators: [
    withKnobs,
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
    imports: []
  },
  template: `<teta-pager [tetaIconSprite]="'assets/icons.svg'"></teta-pager>`,
});
