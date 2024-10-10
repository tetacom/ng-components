import { applicationConfig, Meta } from '@storybook/angular';
import { inject, isDevMode } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { IconSpriteDirective } from '../icon/icon-sprite.directive';
import { provideTransloco, Translation, TranslocoLoader, TranslocoModule } from '@ngneat/transloco';
import {PropertyGridDemoComponent} from "./property-grid-demo/property-grid-demo/property-grid-demo.component";
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
          loader: TranslocoHttpLoader,
        }),
      ],
    }),
  ],
  moduleMetadata: {
    imports: [TranslocoModule, PropertyGridDemoComponent],
  },
} as Meta;

export const simplePropertyGrid = () => ({
  moduleMetadata: {
    imports: [IconSpriteDirective, PropertyGridDemoComponent],
    entryComponents: [],
  },
  template: `<div [tetaIconSprite]="'assets/icons.svg'"
                  class="bg-panel-50 padding-3" style="display: flex; width: 900px; height: 600px;">
              <teta-property-grid-demo></teta-property-grid-demo>
            </div>`,
});
