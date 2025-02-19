import { applicationConfig, Preview } from '@storybook/angular';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoaderService } from './TranslocoHttpLoaderService';
import { provideHttpClient } from '@angular/common/http';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideTransloco({
          config: {
            availableLangs: ['en'],
            defaultLang: 'en',
            fallbackLang: 'en',
            reRenderOnLangChange: true,
            prodMode: false,
          },
          loader: TranslocoHttpLoaderService,
        }),
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
