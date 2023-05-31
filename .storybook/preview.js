import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../compodoc/documentation.json";
import { addDecorator, moduleMetadata } from "@storybook/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { addons } from "@storybook/addons";

addons.setConfig({
  enableShortcuts: false,
});

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'basedark',
    target: 'html',
    list: [
      { name: 'basedark', class: 'basedark', color: '#f0f0f0' },
      { name: 'baselight', class: 'baselight', color: '#f0f0f0' }
    ],
  },
  docs: { inlineStories: true }
};
addDecorator(moduleMetadata({ imports: [BrowserAnimationsModule] }));
