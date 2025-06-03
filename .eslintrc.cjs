module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'standard',
        'plugin:jsx-a11y/recommended'
    ],
    overrides: [
        {
            // For TypeScript files
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
                // Use relative path and normalize for Windows
                project: true
            },
            plugins: ['@typescript-eslint'],
            extends: [
                'plugin:@typescript-eslint/recommended'
            ],
            rules: {
                // Turn off base rule and use TypeScript version
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': ['warn', {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }],
                // Allow type imports
                '@typescript-eslint/consistent-type-imports': ['warn', {
                    prefer: 'type-imports'
                }]
            }
        },
        {
            // For story files (including TypeScript stories)
            files: ['**/*.stories.js', '**/*.stories.jsx', '**/*.stories.ts', '**/*.stories.tsx'],
            rules: {
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': 'off', // Add this for TS story files
                '@typescript-eslint/no-explicit-any': 'off', // Allow any in story files
                'react/no-unescaped-entities': 'off',
                eqeqeq: 'off',
                'jsx-a11y/role-supports-aria-props': 'off',
                'jsx-a11y/role-has-required-aria-props': 'off'
            }
        },
        {
            // For test files (including TypeScript tests)
            files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
            rules: {
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': 'off', // Add this for TS test files
                'react/no-unescaped-entities': 'off'
            }
        }
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'jsx-a11y'
    ],
    settings: {
        react: {
            version: '18.2.0'
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        indent: ['warn', 4],
        'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
        'no-trailing-spaces': 'warn',
        'no-mixed-spaces-and-tabs': 'warn',
        'no-multi-spaces': 'warn',
        'no-unused-vars': 'warn',
        'no-undef': 'off',
        'import/no-absolute-path': 'off',
        eqeqeq: 'warn',
        'array-callback-return': 'warn',
        'react/no-unescaped-entities': 1,
        'no-unexpected-multiline': 'warn',
        'no-var': 'warn',
        'prefer-const': 'warn',
        'space-before-blocks': 'warn',
        'space-before-function-paren': ['warn', 'never'],
        'react/jsx-first-prop-new-line': [1, 'multiline'],
        'space-in-parens': 'warn',
        'spaced-comment': 'warn',
        'arrow-spacing': 'warn',
        'comma-style': 'warn',
        'func-call-spacing': 'warn',
        'comma-spacing': ['warn', { before: false, after: true }],
        quotes: ['warn', 'single'],
        'react/prop-types': 'off',
        'prefer-rest-params': 'off',
        'no-func-assign': 'off',
        'no-invalid-this': 'off',
        'react/no-unknown-property': 'off',
        camelcase: 'off',
        'react/jsx-key': 'off',
        'require-jsdoc': 'off',
        'guard-for-in': 'off',
        'no-empty-pattern': 'off',
        'max-len': 'off',
        semi: ['warn', 'always'],
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/anchor-is-valid': 'warn',
        'jsx-a11y/accessible-emoji': 'warn',
        'jsx-a11y/anchor-has-content': 'warn',
        'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-role': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/heading-has-content': 'warn',
        'jsx-a11y/html-has-lang': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/img-redundant-alt': 'warn',
        'jsx-a11y/interactive-supports-focus': 'warn',
        'jsx-a11y/label-has-associated-control': 'warn',
        'jsx-a11y/media-has-caption': 'warn',
        'jsx-a11y/mouse-events-have-key-events': 'warn',
        'jsx-a11y/no-access-key': 'warn',
        'jsx-a11y/no-autofocus': 'off', // Turning this off as it's commonly used in modals
        'jsx-a11y/no-distracting-elements': 'warn',
        'jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
        'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
        'jsx-a11y/no-noninteractive-tabindex': 'warn',
        'jsx-a11y/no-redundant-roles': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'jsx-a11y/scope': 'warn',
        'jsx-a11y/tabindex-no-positive': 'warn'
    }
};