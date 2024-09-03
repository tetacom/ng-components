// eslint-disable-next-line id-blacklist
import { FileUploadAreaComponent } from './file-upload-area/file-upload-area.component';

import { applicationConfig, Meta } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';

export default {
  title: 'Component/File',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  component: FileUploadAreaComponent,
  moduleMetadata: {
    imports: [],
  },
} as Meta;

export const area = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'" class="font-body-3 padding-3">
    <teta-file-upload-area   style="height: 250px; width: 300px;">
      <div class="column column_auto font-body-3">
        <div class="row align-center justify-content-around">
          <svg class="icon__image fill-text-30" style="width: 40px">
            <use [attr.xlink:href]="'#pdf'"></use>
          </svg>
        </div>
        <div class="text-align-center">
          Перетащите файлы в формате .xls, .las или .csv сюда или <span class="color-primary-30">загрузите</span>
        </div>
      </div>
    </teta-file-upload-area>
  </div>`,
});
