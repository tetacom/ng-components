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
  docs: { inlineStories: true },
  themeSwitcher: {
    themes: ["baselight", "basedark", "purplelight", "purpledark"],
    dataAttribute: "theme",
  },
};
addDecorator(moduleMetadata({ imports: [BrowserAnimationsModule] }));
