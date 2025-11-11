import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../projects/chart/**/*.mdx',
    '../projects/chart/**/*.stories.@(js|jsx|ts|tsx)',
    '../projects/components/**/*.mdx',
    '../projects/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../projects/three/**/*.mdx',
    '../projects/three/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  docs: {},
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
