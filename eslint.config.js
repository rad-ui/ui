import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: [ '**/*.{js,jsx,ts,tsx,cjs}' ],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: typescriptParser,
      parserOptions: {
        // ecmaFeatures: {
        //   jsx: true,
        // },
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',

      // 'react/react-in-jsx-scope': 'off',
      // indent: ['off', 4], // TODO
      // 'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
      // 'no-trailing-spaces': 'warn',
      // 'no-mixed-spaces-and-tabs': 'warn',
      // 'no-multi-spaces': 'warn',
      'no-undef': 'off',
      // eqeqeq: 'warn',
      // 'array-callback-return': 'warn',
      // // 'react/no-unescaped-entities': 1,
      // 'no-unexpected-multiline': 'warn',
      // 'no-var': 'warn',
      'prefer-const': 'warn',
      // 'space-before-blocks': 'warn',
      // 'space-before-function-paren': ['warn', 'never'],
      // // 'react/jsx-first-prop-new-line': [1, 'multiline'],
      // 'space-in-parens': 'warn',
      // 'spaced-comment': 'warn',
      // 'arrow-spacing': 'warn',
      // 'comma-style': 'warn',
      // 'func-call-spacing': 'warn',
      // 'comma-spacing': ['warn', { before: false, after: true }],
      // quotes: ['off', 'single'], // TODO
      // // 'react/prop-types': 'off',
      // 'prefer-rest-params': 'off',
      // 'no-func-assign': 'off',
      // 'no-invalid-this': 'off',
      // // 'react/no-unknown-property': 'off',
      // camelcase: 'off',
      // // 'react/jsx-key': 'off',
      // 'require-jsdoc': 'off',
      // 'guard-for-in': 'off',
      // 'no-empty-pattern': 'off',

      // ignore long strings
      // 'max-len': 'off',
      // semi: ['off', 'always'], // TODO
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
      'jsx-a11y/no-autofocus': 'warn',
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
  }
);
