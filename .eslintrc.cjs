module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-typescript',
    'airbnb-typescript-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      {
        json: 'always',
        svg: 'always',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'react/function-component-definition': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.ts', '.tsx', '.jsx'] }
    ],
    'react/jsx-props-no-spreading': 'off',
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'no-nested-ternary': 'error',
    'no-throw-literal': 'error',
    'no-unneeded-ternary': 'error',
    'no-trailing-spaces': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-multi-spaces': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'off',
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
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'prefer-rest-params': 'off',
    'no-func-assign': 'off',
    'no-invalid-this': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-key': 'off',
    'require-jsdoc': 'off',
    'guard-for-in': 'off',
    'no-empty-pattern': 'off',
    'import/no-extraneous-dependencies': 'off',
    // TODO: Enable it when we can annotate all the `any` types
    '@typescript-eslint/no-explicit-any': 'off',

    // ignore long strings
    'max-len': 'off',
    semi: ['error', 'never']
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  ignorePatterns: [
    'tailwind.config.js',
    'styles',
    'src/examples',
    'scripts',
    'rollup-tokens.config.js'
  ]
}
