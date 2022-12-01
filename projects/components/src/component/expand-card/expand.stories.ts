import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {ExpandCardModule} from "./expand-card.module";
import {ExpandItemComponent} from "./expand-item/expand-item.component";
import {IconModule} from "../icon/icon.module";

export default {
  title: 'Component/Expand',
  decorators: [withKnobs],
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
