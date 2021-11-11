import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../compodoc/documentation.json";
import {addDecorator, moduleMetadata} from '@storybook/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}
addDecorator(moduleMetadata({imports: [BrowserAnimationsModule]}));
