import type {Preview} from "@storybook/angular";
import {setCompodocJson} from "@storybook/addon-docs/angular";
import docJson from "../projects/components/documentation.json";

setCompodocJson(docJson);

// export const decorators = [
//   withThemeByClassName({
//     themes: {
//       light: "baselight",
//       dark: "basedark",
//     },
//     defaultTheme: "basedark",
//   }),
// ];


const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
