import {Meta} from '@storybook/angular/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';
import {IconModule} from './icon.module';
import {fileIconsList} from './icons-list';
import {IconFileComponent} from "./icon-file/icon-file.component";

export default {
  title: 'Component/FileIcon',
  decorators: [withKnobs],
  component: IconFileComponent,
  moduleMetadata: {
    imports: [IconModule]
  }
} as Meta;

export const fileIcons = () => ({
  moduleMetadata: {
    imports: [IconModule]
  },
  props: {
    icons: fileIconsList,
  },
  template: `<div [tetaIconSprite]="'assets/file-icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon-file [extension]="icon"></teta-icon-file>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});
