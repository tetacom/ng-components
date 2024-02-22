
import {PropertyGridModule} from './property-grid.module';

import {PropertyGridDemoModule} from "./property-grid-demo/property-grid-demo.module";
import {applicationConfig, Meta} from "@storybook/angular";
import { importProvidersFrom, inject, isDevMode } from '@angular/core';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import {IconComponent} from "../icon/icon/icon.component";
import {IconSpriteDirective} from "../icon/icon-sprite.directive";
import { provideTransloco, Translation, TranslocoLoader, TranslocoModule } from '@ngneat/transloco';
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export default {

  title: 'Component/PropertyGrid',
  decorators: [

    applicationConfig({
      providers: [
        provideHttpClient(),
        provideTransloco({
          config: {
            availableLangs: ['en', 'ru'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
          },
          loader: TranslocoHttpLoader
        })

      ],
    }),
  ],
  moduleMetadata: {
    imports: [PropertyGridModule, PropertyGridDemoModule, TranslocoModule],
  },
} as Meta;

export const simplePropertyGrid = () => ({
  moduleMetadata: {
    imports: [PropertyGridModule, PropertyGridDemoModule,IconSpriteDirective],
    entryComponents: [],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"
                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-property-grid-demo></teta-property-grid-demo>
            </div>`,
});
