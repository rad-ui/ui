const path = require('path');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

const tailwindEntry = path.resolve(__dirname, '../main.tailwind.css');

const excludeRuleFromTailwind = (rule) => {
    if (!rule || typeof rule !== 'object') {
        return;
    }
    if (Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach(excludeRuleFromTailwind);
    }
    const test = rule.test;
    if (test instanceof RegExp && test.test('sample.css')) {
        const currentExclude = rule.exclude;
        if (Array.isArray(currentExclude)) {
            rule.exclude = [...currentExclude, tailwindEntry];
        } else if (currentExclude) {
            rule.exclude = [currentExclude, tailwindEntry];
        } else {
            rule.exclude = [tailwindEntry];
        }
    }
};

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],
    webpackFinal: async (config) => {
        config.module.rules.forEach(excludeRuleFromTailwind);

        config.module.rules.push({
            test: /\.css$/,
            include: [tailwindEntry],
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                tailwindcss({
                                    config: path.resolve(__dirname, '../tailwind.config.js')
                                }),
                                autoprefixer()
                            ]
                        }
                    }
                }
            ]
        });

        config.module.rules.push({
            test: /\.(mjs|js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: { browsers: 'defaults' } }],
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        '@babel/preset-typescript'
                    ]
                }
            }
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        });

        config.resolve.alias = {
            ...config.resolve.alias,
            '~': path.resolve(__dirname, '../src'),
            '~/components': path.resolve(__dirname, '../src/components')
        };
        return config;
    },
    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    }
};

module.exports = config;
