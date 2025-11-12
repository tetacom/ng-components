import { applicationConfig, Preview, StoryFn } from '@storybook/angular';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoaderService } from './TranslocoHttpLoaderService';
import { provideHttpClient } from '@angular/common/http';

const themeDecorator = (story: StoryFn, context) => {
  const scheme = context.globals.scheme;
  const htmlElement: HTMLElement | null = document.querySelector('html');

  if (htmlElement) {
    htmlElement.classList.remove('baselight', 'basedark');
    htmlElement.classList.add(scheme === 'dark' ? 'basedark' : 'baselight');
  }

  return story(context.args, context);
};

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
    themeDecorator,
  ],
  tags: ['autodocs'],
};

export const globalTypes = {
  scheme: {
    name: 'Схема',
    defaultValue: 'dark',
    toolbar: {
      icon: 'moon',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      showName: true,
    },
  },
};

export default preview;
