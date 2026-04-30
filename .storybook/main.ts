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

  addons: ['@chromatic-com/storybook', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  docs: {},
};

export default config;
