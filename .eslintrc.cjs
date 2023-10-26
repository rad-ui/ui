module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'eslint:recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'react/react-in-jsx-scope': 'off',
    'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 1}],
    'semi': [
      'error',
      'always',
    ],
  },
};
