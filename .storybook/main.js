/** @type { import('@storybook/react-webpack5').StorybookConfig } */

import path from "path"

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  webpackFinal: async (config) => {

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '../src'),
      '~/components': path.resolve(__dirname, '../src/components'),

    };
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  }
};
export default config;
