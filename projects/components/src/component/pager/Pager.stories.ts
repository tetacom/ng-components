import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {PagerModule} from './pager.module';
import {IconModule} from '../icon/icon.module';

export default {
  title: 'Component/Pager',
  decorators: [withKnobs],
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
