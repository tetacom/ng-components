import {Meta} from '@storybook/angular/types-6-0';
import {select, withKnobs} from '@storybook/addon-knobs';
import {IconFileComponent} from "./icon-file/icon-file.component";
import {IconFileModule} from "./icon-file/icon-file.module";
import {fileIconsList} from './icons-list';

export default {
  title: 'Component/Icon Files',
  decorators: [withKnobs],
  component: IconFileComponent,
  moduleMetadata: {
    imports: [IconFileModule]
  }
} as Meta;

export const icons = () => ({
  moduleMetadata: {
    imports: [IconFileModule]
  },
  props: {
    palette: select('palette', ['primary', 'grey', 'red', 'white'], 'primary'),
    icons: fileIconsList,
  },
  template: `<div [tetaIconSprite]="'assets/file-icons.svg'" style="display: grid;grid-template-columns: repeat(3, auto);">
              <div *ngFor="let icon of icons" style="display:flex; align-items: center;" class="font-body-3 margin-bottom-2">
                <teta-icon-file [name]="icon" [palette]="palette"></teta-icon-file>
                <span class="padding-left-4">{{icon}}</span>
              </div>
            </div>`,
});
