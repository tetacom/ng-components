import {withKnobs} from '@storybook/addon-knobs';
import {PagerModule} from './pager.module';
import {IconModule} from '../icon/icon.module';
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
    imports: [PagerModule]
  }
} as Meta;

export const pagerSample = () => ({
  moduleMetadata: {
    imports: [PagerModule, IconModule]
  },
  template: `<teta-pager [tetaIconSprite]="'assets/icons.svg'"></teta-pager>`,
});
