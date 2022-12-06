module.exports = {
  stories: [
    "../projects/components/**/*.stories.mdx",
    "../projects/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../projects/chart/**/*.stories.mdx",
    "../projects/chart/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-theme-switcher",
  ],
  framework: "@storybook/angular",
  core: {
    builder: "webpack5",
  },
};
