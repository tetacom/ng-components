import type {StorybookConfig} from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../projects/chart/**/*.mdx",
    "../projects/chart/**/*.stories.@(js|jsx|ts|tsx)",
    "../projects/components/**/*.mdx",
    "../projects/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-knobs",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
